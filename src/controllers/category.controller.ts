import { Request, Response } from "express";
import Category from "../models/category-model";
import { ICategory } from "../types";
import { AuthRequest } from "../middleware";

export const getAllCategories = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;

    const categories = await Category.find({
      user: user,
    });
    return res.send(categories);
  } catch (error) {
    res.send({ error: "Something went wrong" });
    console.log("error in getAllCategories", error);
  }
};

export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { color, icon, isEditable, name }: ICategory = req.body;

    const { user } = req;

    const category = await Category.create({
      color,
      icon,
      isEditable,
      name,
      user,
    });

    res.send(category);
  } catch (error) {
    console.log("error in createCategory", error);
    res.send({ error: "Something went wrong" });
    throw error;
  }
};
