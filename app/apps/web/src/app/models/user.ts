import type { Model } from "mongoose";
import mongoose, { Schema } from "mongoose";

export interface UserInterface {
    id: number;
    nickname: string;
    nom: string;
    prenom: string;
    decks: number[];
    contacts: number[];
    email: string;
    passwrd: string;
}

type UserModel = Model<UserInterface>;

const UserSchema = new Schema<UserInterface, UserModel>({
    id: Number,
    nickname: String,
    nom: String,
    prenom: String,
    decks: [Number],
    contacts: [Number],
    email: String,
    passwrd: String,
},{_id:false});//TODO active _id et disabled id

const User = mongoose.model('User',UserSchema);

export default User;