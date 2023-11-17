import express from 'express';
import { User } from '../models/user';
import Joi from "joi";
import { ValidationError } from 'sequelize';
const cloudinary = require('cloudinary').v2;
export class UserController {
    private static instance: UserController | null = null;

    private constructor() {

    }

    static init(): UserController {
        if (this.instance == null) {
            this.instance = new UserController()
        }

        return this.instance
    }

    async list(req:express.Request,res:express.Response){
        // console.log( Date.now())
        // console.log( new Date(Date.now()).toLocaleTimeString())
        // console.log( process.env.TZ)

        let data = await User.findAll();
        res.status(200).json({
            status: true,
            message: "ok",
            data
        })
    }

    async store(req:express.Request , res:express.Response){
        const result = await User.create({
            firstName:'shahid',
            lastName:'khan',
            email:'shahid@gmail.com',
            password:"12345",
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        res.json({
            status: "ok",
            result
        })
    }

    // del user 
    async del(req:express.Request,res:express.Response ){
       
       

        try{        
            let data = await User.destroy({
                where: {
                 id : Number(req.query.id)
                }
              });
        }
        catch(err){
            res.Error("error in deleting user");
        }
      
        res.Success("Successfullt deleted")
    }
    


}