import USER from "../models/user"
const findUser = async (req: any, res: any) => {
    try {
        if (!req.query || !req.query.userName) {
            res.status(404).send("Missing Data")
            return;
        }
        const user = await USER.findUser(req.query.userName)
        user ? res.status(200).send(user) : res.status(400).send("Not Found")
    } catch (e: any) {
        res.status(500).json({ message: e.toString() });
    }
}
export default findUser