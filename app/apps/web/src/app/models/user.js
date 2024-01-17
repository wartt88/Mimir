import mongoose, { Schema } from 'mongoose';

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
    contacts: {
        type: Array,
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