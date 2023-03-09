import USER from "../models/user"
const addWin = async (req: any, res: any) => {
    try {
        if (!req.query || !req.query.userName) {
            res.status(404).send("Missing Data")
            return;
        }
        console.log(req.query);

        const found = await USER.addWin(req.query.userName)
        res.status(200).send(found)
    } catch (e: any) {
        res.status(500).json({ message: e.toString() });
    }
}
export default addWin