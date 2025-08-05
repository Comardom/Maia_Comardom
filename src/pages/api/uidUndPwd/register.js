import connectDB from '../../../../backend/db.js';
import User from '../../../../backend/models/User.js';

export async function POST({ request }) {
    await connectDB();
    const { uid, email, passwordHash } = await request.json();

    if (!uid || !email || !passwordHash) {
        return new Response(JSON.stringify({ error: '缺少字段' }), { status: 400 });
    }

    const existingUser = await User.findOne({
        $or: [{ uid }, { email }]
    });

    if (existingUser) {
        return new Response(JSON.stringify({ error: 'UID 或邮箱已存在' }), { status: 409 });
    }

    try {
        await User.create({ uid, email, passwordHash });
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error('注册失败:', err);
        return new Response(JSON.stringify({ error: '服务器错误' }), { status: 500 });
    }
}
