import express from "express";
import { getAllCategories } from "../controllers/category.controller";

const categoryRoutes = express.Router();

categoryRoutes.route("/").get(getAllCategories);
