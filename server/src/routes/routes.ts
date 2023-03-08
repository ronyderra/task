import express from "express";
import addUser from "../controller/addUser"
import findUser from "../controller/findUser"
import leaderBoard from "../controller/leaderBoard"
import addWin from "../controller/leaderBoard"

const router = express.Router();
router.post("/addUser", addUser);
router.get("/findUser", findUser);
router.get("/leaderBoard", leaderBoard);
router.patch("/addWin", addWin);

export default router;