import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true }, // ✅ 添加这一行
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
