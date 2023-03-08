import USER from "../models/user"
const getActive = async (req: any, res: any) => {
    try {
        if (!req.body || !req.body.userNames || !Array.isArray(req.body.userNames)) {
            res.status(404).send("Missing Data")
        }
        const user = await USER.getActive(req.body.userNames)
        res.status(200).send(user)
    } catch (e: any) {
        res.status(500).json({ message: e.toString() });
    }
}
export default getActive