import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        if(process.env.MONGO)
            mongoose.connect(process.env.MONGO);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;