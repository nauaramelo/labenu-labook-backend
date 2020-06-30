import express from "express";
import { CommentController } from "../controller/CommentController";

export const commentRouter = express.Router();

commentRouter.post("/commentpost", new CommentController().commentPost)

