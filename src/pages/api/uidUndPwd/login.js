import connectDB from '../../../../backend/db.js';
import User from '../../../../backend/models/User.js';

export async function POST({ request }) {
    await connectDB();

    const { identifier, passwordHash } = await request.json();

    // ✅ 基本字段验证
    if (!identifier || !passwordHash) {
        return new Response(
            JSON.stringify({ success: false, error: '缺少字段：用户名或密码未提供' }),
            { status: 400 }
        );
    }

    try {
        // ✅ 支持用 UID 或邮箱 登录
        const user = await User.findOne({
            $or: [{ uid: identifier }, { email: identifier }]
        });

        if (!user || user.passwordHash !== passwordHash) {
            return new Response(
                JSON.stringify({ success: false, error: '用户名或密码错误' }),
                { status: 401 }
            );
        }

        // ✅ 可扩展：例如返回 UID 或登录 token
        return new Response(
            JSON.stringify({ success: true, uid: user.uid }),
            { status: 200 }
        );

    } catch (err) {
        console.error('登录异常:', err);
        return new Response(
            JSON.stringify({ success: false, error: '服务器错误，请稍后再试' }),
            { status: 500 }
        );
    }
}
