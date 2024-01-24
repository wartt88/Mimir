import mongoose, {Model, Schema} from 'mongoose';

export interface UserInterface {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    decks?: number[];
    following?: string[];
    followers?: string[];
    bio?: string;
    profilePicture?: string;
}

type UserModel = Model<UserInterface>;

const userSchema = new Schema<UserInterface, UserModel>({
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
        }
    },
    {
        timestamps: true,
    });

const User = mongoose.models.User || mongoose.model<UserInterface, UserModel>("User", userSchema);

export default User;