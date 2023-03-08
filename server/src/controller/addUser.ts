import USER from "../models/user"
import { userNameReg, PassReg } from "../helpers/index"

const addUser = async (req: any, res: any) => {
    try {
        if (!req.body || !req.body.userName || !req.body.password) {
            res.status(404).send("Missing Data")
        }
        const { userName, password } = req.body
        const found = await USER.findUser(userName, password)
        if (found) {
            res.status(500).send("User Exist")
            return;
        } else if (!userNameReg.test(userName) || !PassReg.test(password)) {
            res.status(500).send("Bad Credentials")
            return;
        }
        const user = USER.createNew({ userName, password })
        res.status(200).send(user)
    } catch (e: any) {
        res.status(500).json({ message: e.toString() });
    }
}

export default addUser