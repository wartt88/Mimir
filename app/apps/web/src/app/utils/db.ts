import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect("mongodb+srv://delioos:svw7Mykz5IHXaVlU@cluster0.zs5vivf.mongodb.net/?retryWrites=true&w=majority");
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;