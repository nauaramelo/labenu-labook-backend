import express from "express";
import { RefreshAccessController } from "../controller/RefreshAccessController";

export const refreshRouter = express.Router();

refreshRouter.post("/token", new RefreshAccessController().refreshAccessToken)

