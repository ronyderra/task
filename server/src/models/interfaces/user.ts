import { Document, Model } from "mongoose";
export interface IUSER {
    userName: string;
    password: string;
    inLobby: boolean;
    wins: number;
}
export interface IBOARD {
    userName: string;
    wins: number
}
export interface IUSERDocument extends IUSER, Document {
    toJSON(): IUSERDocument;
}
export interface IUSERModel extends Model<IUSERDocument> {
    createNew({ userName, password, inLobby }: { userName: string, password: string, inLobby: boolean }): Promise<IUSER>;
    findUser(userName: string): Promise<IUSER>;
    getLobby(): Promise<IUSER[]>;
    updateInLoby(userName: string, val: boolean): Promise<any>;
    login(userName: string, password: string): Promise<IUSER | undefined>;
    leaderBoard(): Promise<IBOARD[]>;
    addWin(userName: string): Promise<IUSER>;
    getActive(userNames: string[] | []): Promise<IUSER>;
}