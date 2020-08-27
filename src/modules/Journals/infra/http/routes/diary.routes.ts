import { Router } from "express";

import DiaryController from "../controllers/DiaryController";

const diaryController = new DiaryController();

const diaryRoute = Router();

diaryRoute.get("/create", diaryController.index);

export default diaryRoute;