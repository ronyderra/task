import express from "express";
import addUser from "../controller/addUser"
import findUser from "../controller/findUser"
import login from "../controller/login"
import leaderBoard from "../controller/leaderBoard"
import addWin from "../controller/addWin"
import getActive from "../controller/getActive"

const router = express.Router();
router.post("/addUser", addUser);
router.get("/findUser", findUser);
router.get("/login", login);
router.get("/leaderBoard", leaderBoard);
router.post("/getActive", getActive);
router.patch("/addWin", addWin);

export default router;