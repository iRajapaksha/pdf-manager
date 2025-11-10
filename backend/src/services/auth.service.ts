import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { generateToken } from "../utils/jwt";

export const registerUser = async (username: string, email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashed });
  return generateToken({ id: user._id, email: user.email });
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  return generateToken({ id: user._id, email: user.email });
};
