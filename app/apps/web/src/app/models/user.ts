import type { Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

export interface UserInterface {
    id: Types.ObjectId;
    nickname: string;
    nom: string;
    prenom: string;
    decks: number[];
    contact: number[];
}

type UserModel = Model<UserInterface>;

const UserSchema = new Schema<UserInterface, UserModel>({
    nickname: String,
    nom: String,
    prenom: String,
    decks: [Number],
    contact: [Number]
});

const User = mongoose.model('User',UserSchema);

export default User;