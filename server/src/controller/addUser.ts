import USER from "../models/user"
import { userNameReg, PassReg } from "../helpers/index"


export const addUser = async (req: any, res: any) => {
    try {
        if (!req.body || !req.body.userName || !req.body.password) {
            res.status(404).send("Missing Data")
        }
        const { userName, password } = req.body
        const found = await USER.findUser(userName, password)
        if (found) {
            res.status(500).send("User Exist")
        } else if (userNameReg.test(userName) || PassReg.test(password)) {
            res.status(500).send("Bad Credentials")
        }
        USER.createNew(userName, password)
    } catch (e: any) {
        res.status(500).json({ message: e.toString() });
    }
}