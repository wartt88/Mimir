import type {ObjectId} from 'mongodb';
import type {Model} from 'mongoose';
import mongoose, {Schema} from 'mongoose';
import type {UserShare} from "./share.ts";

export interface UserInterface {
    _id: ObjectId;
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    decks?: string[];
    following?: string[];
    followers?: string[];
    bio?: string;
    profilePicture?: string;
    sharedDecks: {
        deck_id: string;
        canEdit: boolean;
    }[];
}

type UserModel = Model<UserInterface>;

const userSchema = new Schema<UserInterface, UserModel>({
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
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
            type: Array,
            required: false,
        },
        followers: {
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
        },
        sharedDecks: [
            new Schema<UserShare>(
                {
                    deck_id: String,
                    canEdit: Boolean
                }, {_id: false}
            )
        ]
    },
    {
        timestamps: true,
    });

const User = mongoose.models.User || mongoose.model<UserInterface, UserModel>("User", userSchema);

export default User;