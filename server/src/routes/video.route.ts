import express from "express";
import videoData from "../controllers/video.controller";

const router = express.Router();

router.get("/", videoData);

export default router;
