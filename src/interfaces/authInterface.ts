import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    _id: string;
    email: string;
    password: string;
    name:string;
    bio?:string;
    skills?:string[];
    location?:string;
    role:string
    matchPassword: (enteredPassword: string) => Promise<boolean>;
  }