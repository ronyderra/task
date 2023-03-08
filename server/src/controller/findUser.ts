import USER from "../models/user"
import { userNameReg, PassReg } from "../helpers/index"


export const findUser = async (req: any, res: any) => {
    try {
        if (!req.body || !req.body.userName || !req.body.password) {
            res.status(404).send("Missing Data")
        }
        const { userName, password } = req.body
        const found = await USER.findUser(userName, password)
        found ? res.status(200).send(found) : res.status(400).send("Not Found")
    } catch (e: any) {
        res.status(500).json({ message: e.toString() });
    }
}