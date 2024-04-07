import type { Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import type { UserShare } from "./share.ts";

export interface UserInterface {
  _id: Types.ObjectId;
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
  tmpToken?: string;
  checkEmail: boolean;
}

type UserModel = Model<UserInterface>;

const userSchema = new Schema<UserInterface, UserModel>(
  {
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
          canEdit: Boolean,
        },
        { _id: false }
      ),
    ],
    tmpToken: {
      type: String,
      required: false,
    },
    checkEmail: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    _id: true,
  }
);

const User =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Disabling this rule because we need to check the user model before initialize it
  mongoose.models.User ||
  mongoose.model<UserInterface, UserModel>("User", userSchema);

export default User;
