import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/authInterface";

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    bio: { type: String },
    skills: [{ type: String }],
    location: { type: String },
    role: {
      type: String,
      enum: ['learner', 'mentor'],
      default: 'learner',
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
