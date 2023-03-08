import { Document, Model } from "mongoose";

export interface IUSER {
    userName: string;
    password: string;
    wins: number
}

export interface IUSERDocument extends IUSER, Document {
    toJSON(): IUSERDocument;
}

export interface IUSERModel extends Model<IUSERDocument> {
    createNew({ userName, password }: { userName: string, password: string }): Promise<IUSER>;
    findUser(userName: string, password: string): Promise<IUSER>;
}