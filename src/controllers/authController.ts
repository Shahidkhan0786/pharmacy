import express, { NextFunction } from "express";
import { Controller } from "./controller";
import { User } from "../models/user";
import Joi, { required, ValidationError } from "joi";
import crypto from "node:crypto";
import { json } from "body-parser";
import cloudinary from "cloudinary";
import { cookietoken, sendmail } from "../helpers/helper";
import { Op } from "sequelize";
import moment from "moment";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Profile } from "../models/profile";

export class AuthController extends Controller {
  private static instance: AuthController | null = null;

  private constructor() {
    super();
  }

  static init(): AuthController {
    if (this.instance == null) {
      this.instance = new AuthController();
    }

    return this.instance;
  }

  //    signup method

  async signUp(req: express.Request, res: express.Response) {
    // console.log(req.body)
    const schema = Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string().optional().allow(""),
      email: Joi.string().email().required(),
      password: Joi.string(),
    });

    let result: any;
    const { error, value } = schema.validate(req.body);
    if (error instanceof ValidationError) {
      return res.Error(error.details[0].message);
    }

    //check user is exists or not
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (user != null) {
      return res.Error("User already exixts");
    }
    // if(req.file){
    //     result = await cloudinary.v2.uploader.upload(req.file.path, {
    //         folder: 'users',
    //         width: 150,
    //         height: 150,
    //         crop: 'fill',
    //     });
    // }
    const { firstName, lastName, email, password } = req.body;
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // if (newUser && req.file) {
    //   await Profile.create({
    //     userId: newUser.id,
    //     photo_id: result.public_id,
    //     photo_secure_url: result.secure_url,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   });
    // }

    if (newUser) {
      await Profile.create({
        userId: newUser.id,
        // photo_id: result.public_id,
        // photo_secure_url: result.secure_url,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    newUser.password = undefined;
    // cookietoken(newUser, res);

    cookietoken(newUser, res);
  }

  // sign
  async Signin(req: express.Request, res: express.Response) {
    console.log("signinn");
    console.log(req.body);
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error instanceof ValidationError) {
      return res.Error(error.details[0].message);
    }

    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.Error("Please provide email password");
    }
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.Error("Please provide correct cradentials");
    }
    const isMatch = await user.validPassword(password);
    if (!isMatch) {
      // return next(new customerror("Invalid email or password" ,400));
      return res.Error("Please provide correct email and password");
    }
    cookietoken(user, res);
  }

  // logout
  async logout(req: express.Request, res: express.Response) {
    res.cookie("token", "null", {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.Success("Logout successfully");
  }

  // Forgot password

  async ForgotPassword(req: express.Request, res: express.Response) {
    const { email } = req.body;
    if (!email) {
      // return next(new customerror("Please provide email", 400));
      return res.Error("Please provide email");
    }
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.Error("Invalid email");
    }
    const token = await user.getForgotpasswordToken();
    // console.log("outt tokeeennn",token)
    user.ForgotpasswordToken = token;
    await user.save();
    // const url:string = `${req.protocol}://${req.get("host")}/api/public/auth/token/validate/${token}`;
    const url: string = `http://localhost:4200/reset-password/${token}`;
    // http://localhost:4200/user/reset

    // const url =  token;
    // const message = `copy paste this link to reset your password \n\n ${url}`;
    const html = `<p>click on me</p><a href=${url}>click me</a>`;
    const message = `copy this token\n\n ${token}`;
    // const html = `<p>copy paste this token in reset form</p><h2>copy me</h2> <h1>${token}</h1>`;
    try {
      await sendmail({
        subject: "Reset Password",
        text: message,
        email,
        html,
      }); //send mail
      res.status(200).json({
        success: true,
        data: { message: "Token sent to email" },
      });
    } catch (err) {
      console.log(err);
      user.ForgotpasswordToken = undefined;
      user.ForgotpasswordExpires = undefined;
      await user.save();
      return res.Error(`Email could not be sent ${err}`);
    }
  }

  // reset password
  async resetpassword(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    // console.log(req.params);
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
      return res.Error("Please provide password and confirm password");
    }
    if (password !== confirmPassword) {
      return res.Error("Password and confirm password do not match");
    }
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      where: {
        [Op.and]: [{ ForgotpasswordToken: req.params.token }],
      },
    });
    console.log("Userrrr", user);
    if (
      !user ||
      (user && moment(user.ForgotpasswordExpires).isBefore(moment()))
    ) {
      return res.Error("Invalid token");
    }
    user.password = password;
    user.ForgotpasswordToken = undefined;
    user.ForgotpasswordExpires = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      data: { message: "Password reset successfully" },
    });
  }

  async validatetoken(req: express.Request, res: express.Response) {
    const { token } = req.params;
    if (!token) {
      return res.Error("Please provide a token");
    }
    const user = await User.findOne({ where: { ForgotpasswordToken: token } });
    if (!user) {
      return res.Error("invalid token");
    }

    return res.Success("varified");
  }

  // check is token is validate or not

  async isUserIsValid(req: express.Request, res: express.Response) {
    const token =
      req.cookies.token ||
      (typeof req.headers["authorization"] === "string"
        ? req.headers["authorization"].replace("Bearer ", "")
        : "");
    if (!token) {
      return res.Error("You are not a valid user");
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      const user = await User.findByPk(decode.id);
      if (!user) return res.Error("You are not a valid user");
      // req.user = user;
      return res.Success("You are a valid user", user);
    } catch (err) {
      return res.Error("invalid");
    }
  }
}
