import { model } from "mongoose";
import { CustomDocumentBuild } from "../mongodb/documentDefaults";
import { IUSERDocument, IUSERModel, IUSER, } from "./interfaces/user";
export const docUSER = {
    userName: { type: String, default: "" },
    password: { type: String, default: "" },
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
const USER: IUSERModel = model<IUSERDocument, IUSERModel>("Users", schema);
export default USER;
export { IUSER, IUSERModel };