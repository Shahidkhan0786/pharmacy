import { UserTypeEnum } from './../constants/enum';
import express, { NextFunction } from 'express';
import { Middleware, callback } from './middleware';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

export class AdminAuthMiddleware extends Middleware {

    constructor(app: express.Application) {
        super(app);
    }
    
     handle(req: express.Request, res: express.Response, next: callback) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.sendStatus(401);
        }

        jwt.verify(token, process.env.JWT_SECRET as string, async (err: any, user: any) => {
            if (err) {
                return res.Error('You are not Authorized');
            }
            const userr = await User.findByPk(user.id,{
                attributes: ['id','firstName','email', 'role']
            })
            req.user = userr;
            // console.log("userrrr",userr)
            console.log('role ============>',userr.role);
            if (userr.role === UserTypeEnum.Admin) {
                next();
            } else {
                return res.Error('You are not Authorized as Admin')
            }
        });
    }
}