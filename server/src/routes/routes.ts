import express from "express";
import addUser from "../controller/addUser"
import findUser from "../controller/findUser"
import login from "../controller/login"
import leaderBoard from "../controller/leaderBoard"
import addWin from "../controller/addWin"
import checkWinner from "../controller/checkWinner"
import getActive from "../controller/getActive"
import { verifyJwt } from "../helpers/index"

const router = express.Router();
router.post("/addUser", addUser);
router.get("/findUser", findUser);
router.get("/login", login);
router.get("/leaderBoard", leaderBoard);
router.post("/getActive", getActive);
router.post("/checkWinner", checkWinner);//on production add verifyJwt
router.patch("/addWin", addWin);//on production add verifyJwt

export default router;