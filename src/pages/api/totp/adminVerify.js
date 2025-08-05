import { authenticator } from 'otplib'
import fs from 'fs'
import path from 'path'

// 用于 SvelteKit API route
export const prerender = false

//  登录接口
export async function POST({ request }) {
    let username = ''
    let token = ''

    // 解析 JSON 请求体
    try {
        const body = await request.json()
        username = body.username
        token = body.token
    } catch {
        return new Response(JSON.stringify({ success: false, error: 'Invalid JSON' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    if (!username || !token) {
        return new Response(JSON.stringify({ success: false, error: 'Missing username or token' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    // 📂 读取多用户密钥文件
    let secrets
    try {
        const filePath = path.resolve('./private/totp-secrets.json')
        secrets = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    } catch {
        return new Response(JSON.stringify({ success: false, error: 'Cannot read secrets' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    const secret = secrets[username]
    if (!secret) {
        return new Response(JSON.stringify({ success: false, error: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    // 🔐 校验 TOTP Token
    const isValid = authenticator.check(token, secret)
    if (!isValid) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid token' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    // ✅ 验证成功，设置管理员 Cookie
    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': `admin=verified; HttpOnly; Secure; Path=/; Max-Age=3600; SameSite=Strict`
        }
    })
}

// 🔍 检查管理员身份接口
export async function GET({ request }) {
    const cookieHeader = request.headers.get('cookie') || ''
    const cookies = Object.fromEntries(
        cookieHeader.split(';').map(c => {
            const [key, value] = c.trim().split('=')
            return [key, value]
        })
    )

    const isAdmin = cookies.admin === 'verified'

    return new Response(JSON.stringify({ isAdmin }), {
        headers: { 'Content-Type': 'application/json' }
    })
}
