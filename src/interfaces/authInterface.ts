import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    _id: string;
    email: string;
    password: string;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
  }