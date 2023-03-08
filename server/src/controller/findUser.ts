import USER from "../models/user"

const findUser = async (req: any, res: any) => {
    try {
        if (!req.query || !req.query.userName || !req.query.password) {
            res.status(404).send("Missing Data")
        }
        const { userName, password } = req.query
        const found = await USER.findUser(userName, password)
        found ? res.status(200).send(found) : res.status(400).send("Not Found")
    } catch (e: any) {
        res.status(500).json({ message: e.toString() });
    }
}
export default findUser