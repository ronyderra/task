import { model } from "mongoose";
import { CustomDocumentBuild } from "../mongodb/documentDefaults";
import { IUSERDocument, IUSERModel, IUSER, } from "./interfaces/user";
export const docUSER = {
    userName: { type: String, default: "" },
    password: { type: String, default: "" },
    inLobby: { type: Boolean, default: false },
    wins: { type: Number, default: 0 },
}
export const schema = CustomDocumentBuild(docUSER, "Users");

schema.statics.findUser = async function findUser(userName: string) {
    try {
        const query = this.findOne({ userName });
        return query.exec().then((doc: any) => doc);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}
schema.statics.login = async function login(userName: string, password: string) {
    try {
        const query = this.findOneAndUpdate({ userName, password }, { inLobby: true }, { returnOriginal: false });
        return query.exec().then((doc: any) => doc);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}
schema.statics.leaderBoard = async function leaderBoard() {
    try {
        const query = this.find({}, { userName: 1, wins: 1, _id: 0 }).sort({ wins: -1 }).limit(10)
        return query.exec().then((doc: any) => doc);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}
schema.statics.addWin = async function addWin(userName: string) {
    try {
        const query = this.updateOne({ userName }, { $inc: { wins: 1 } })
        return query.exec().then((doc: any) => doc);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}
schema.statics.getActive = async function getActive(userNames: []) {
    try {
        const query = this.aggregate([
            { $match: { name: { $nin: userNames }, active: true } },
            { $sort: { updatedAt: 1 } },
            { $limit: 1 },
            { $project: { _id: 0, userName: 1 } }
        ])
        return query.exec().then((doc: any) => doc[0]);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}
const USER: IUSERModel = model<IUSERDocument, IUSERModel>("Users", schema);
export default USER;
export { IUSER, IUSERModel };