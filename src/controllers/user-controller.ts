import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user-model";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { IUser } from "../types";

const getUserToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign({ _id }, "express", {
    expiresIn: "7d",
  });
  return authenticatedUserToken;
};

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

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUser = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(409).send({ message: "User dosen't exist" });
    }

    const isPasswordIdenticlal = await bcrypt.compare(
      password,
      (
        await existingUser
      ).password
    );

    if (isPasswordIdenticlal) {
      const token = getUserToken((await existingUser)._id);
      return res.send({
        token,
        user: { email: existingUser.email, name: existingUser.name },
      });
    } else {
      return res.status(400).send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log(error);
  }
};
