import express from "express";
const router = express.Router();
import addUser from "../controller/addUser"
import findUser from "../controller/findUser"

router.post("/addUser", addUser);
router.get("/findUser", findUser);


export default router;