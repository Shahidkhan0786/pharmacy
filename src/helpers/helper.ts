import multer from "multer";
import express from "express";
import path from "path";
import { User } from "../models/user";
// import nodemailer from "nodemailer";
import * as nodemailer from "nodemailer";
import { NextFunction } from "express-serve-static-core";

export class Helper {}

export function enumKeys(data: any): Array<string> {
  const arrayobjects: Array<string> = [];
  for (const [propertyKey, propertyValue] of Object.entries(data)) {
    arrayobjects.push(propertyValue!.toString());
  }
  return arrayobjects;
}

export const paging = (results: any, page: number, perPage: number) => {
  const { count: totalItems, rows: data } = results;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / perPage);
  return { totalItems, data, totalPages, currentPage, perPage };
};

// multer config start
export function uploads() {
  const storagePath = path.resolve("./", "storage", "users");
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, storagePath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix =
        Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  });

  return multer({ storage: storage });
}

//upload multiple images
export function uploadFiles(): multer.Multer {
  const storagePath = path.resolve("./", "storage", "products");
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, storagePath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix =
        Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  });

  return multer({ storage: storage });
}

// cookie helper function

export function cookietoken(user: User, res: express.Response) {
  const token = user.getJwtToken();
  const options = {
    expiresIn: new Date(
      Date.now() + process.env.COOKIE_TIMEOUT || 2 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  user.password = undefined;
  user.ForgotpasswordExpires = undefined;
  user.ForgotpasswordToken = undefined;
  res.status(200).cookie("token", token, options).json({
    success: true,
    token: token,
    data: user,
  });
}

// send mail helper

export async function sendmail(options: any) {
  // console.log(process.env);
  // create reusable transporter object using the default SMTP transport
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const message = {
    from: ` ${process.env.MAIL_FROM_NAME}  <${process.env.MAIL_FROM_ADDRESS}>`, // sender address
    // from: `"My App Name" <${process.env.MAIL_FROM_ADDRESS}>`
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.text, // plain text body
    html: options.html, // html body
  };
  //     // send mail with defined transport object
  let info = await transport.sendMail(message);
}
