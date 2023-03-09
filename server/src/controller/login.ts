import USER from "../models/user"
import jwt from 'jsonwebtoken';
const login = async (req: any, res: any) => {
    try {
        if (!req.query || !req.query.userName || !req.query.password) {
            res.status(404).send("Missing Data")
            return;
        }
        const { userName, password } = req.query
        const user = await USER.login(userName, password)
        if (user) {
            const user = { userName, password };
            const secretKey = 'secret';
            const token = jwt.sign(user, secretKey, { expiresIn: '24h' });
            res.cookie('jwt', token, { httpOnly: true, secure: false, sameSite: 'strict' })
            res.status(200).send(user)
            return;
        }
        res.status(400).send("Not Found")
    } catch (e: any) {
        res.status(500).json({ message: e.toString() });
    }
}
export default login