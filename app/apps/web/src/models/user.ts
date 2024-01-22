import mongoose, { Schema } from 'mongoose';

export interface UserInterface {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    decks?: number[];
    following?: number;
    followers?: number;
    bio?: string;
    profilePicture?: string;

}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    decks: {
        type: Array,
        required: false,
    },
    following: {
        type: Number,
        required: false,
    },
    followers: {
        type: Number,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    profilePicture: {
        data: Buffer,
        type: String, 
        required: false,
    }
    


},
{
    timestamps: true,
});

const User = mongoose.models.User || mongoose.model("User", userSchema); 

export default User;