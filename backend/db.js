import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Maia', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ 成功连接到本地 MongoDB');
  } catch (error) {
    console.error('❌ 连接失败:', error);
  }
};

export default connectDB;
