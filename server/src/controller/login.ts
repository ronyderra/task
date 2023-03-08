import USER from "../models/user"
const login = async (req: any, res: any) => {
    try {
        if (!req.query || !req.query.userName || !req.query.password) {
            res.status(404).send("Missing Data")
            return;
        }
        console.log(!req.query || !req.query.userName || !req.query.password);

        console.log(req.query.userName, req.query.password);

        const user = await USER.login(req.query.userName, req.query.password)
        user ? res.status(200).send(user) : res.status(400).send("Not Found")
    } catch (e: any) {
        res.status(500).json({ message: e.toString() });
    }
}
export default login