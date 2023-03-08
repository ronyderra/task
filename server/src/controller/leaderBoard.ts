import USER from "../models/user"
const leaderBoard = async (req: any, res: any) => {
    try {
        const leaderBoard = await USER.leaderBoard()
        res.status(200).send(leaderBoard)
        return;
    } catch (e: any) {
        res.status(500).json({ message: e.toString() });
    }
}
export default leaderBoard