export const userNameReg = /^[a-zA-Z]{2,10}$/;
export const PassReg = /^[0-9]{1,10}$/;

import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

export const verifyJwt = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('No JWT found');
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send('Invalid JWT');
    }
};