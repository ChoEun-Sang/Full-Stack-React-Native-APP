import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user-model";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ name, email, password: hashedPassword });

    return res.status(201).send({ message: "User created successfuly" });
  } catch (error) {
    console.log(error);
  }
};
