import USER from "../models/user"
const addWin = async (req: any, res: any) => {
    try {
        if (!req.body || !req.body.userName) {
            res.status(404).send("Missing Data")
        }
        const found = await USER.addWin(req.body.userName)
        res.status(200).send(found)
    } catch (e: any) {
        res.status(500).json({ message: e.toString() });
    }
}
export default addWin