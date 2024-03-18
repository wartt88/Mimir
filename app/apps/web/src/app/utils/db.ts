import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO);
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;