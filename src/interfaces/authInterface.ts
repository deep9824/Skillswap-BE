import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    _id: string;
    email: string;
    password: string;
    name:string;
    bio?:string;
    skills?:string[];
    location?:string;
    isMentor?:boolean
    matchPassword: (enteredPassword: string) => Promise<boolean>;
  }