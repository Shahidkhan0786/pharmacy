// import { Razorpay } from 'razorpay-typescript';
// import { Controller } from './controller';
// import express from 'express';
// import { IRazorPaymentId } from 'razorpay-typescript/dist/resources/payments';
// import {ProductPhoto} from '../models/productPhotos'
// import cloudinary from "cloudinary"
// interface UploadedFiles {
//   [fieldname: string]: Express.Multer.File[];
// }
// export class TestController  {
//     private static instance: TestController | null = null;

//     private constructor(){

//     }

//     static init():TestController
//     {
//         if(this.instance == null){
//             this.instance = new TestController();
//             return this.instance;
//         }

//         return this.instance;
//     }

//     async Checkout(req: express.Request, res: express.Response){
//         console.log(req.body)
//         // var instance = new Razorpay({
//         //     key_id: 'YOUR_KEY_ID',
//         //     key_secret: 'YOUR_KEY_SECRET',
//         //   });
//         const instance: Razorpay = new Razorpay({
//             authKey: {
//                 key_id: process.env.RAZORPAY_KEYID,
//                 key_secret: process.env.RAZORPAY_SECRETKEY, 
//             }
//           });
//         //   const paymentDetails: IRazorPaymentId = await instance.payments.fetch(paymentId);
//         const options = {
//             amount: (req.body.amount*100),
//             currency: "INR",
//             // description: "Test Payment",
//           };
        
//           try {
//             const payment = await instance.orders.create(options);
//             return res.json(payment);
//           } catch (error) {
//             console.error(error);
//             return res.status(500).send("Error in processing payment");
//           }
        
//     }

//     //product photo list 
//     async listt(req: express.Request, res: express.Response){
//       const data = await ProductPhoto.findAll();
//       res.json({
//         data
//       });
//     }

//     // product photo save 
    
//     async productPhoto(req: express.Request , res: express.Response){
//       const uploadedFiles = req.files as UploadedFiles;
//       if (!uploadedFiles) {
//           res.Error("image must be required")
//       }
//       const file =  Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];
//       if (req.files) {
//           for (let i = 0; i < file.length; i++) {
//              console.log("inn fileee" , file[i]);
//               const result = await cloudinary.v2.uploader.upload(file[i].path, {
//                   folder: 'products',
//                   width: 150,
//                   height: 150,
//                   crop: 'fill',
//               });
//               req.body.product_id='4'
//               req.body.photo_id =result.public_id;
//               req.body.secure_url =result.secure_url;
//               try {
//                 const newProduct = await ProductPhoto.create(req.body);
//             } catch (error) {
//                 res.Error("error in added product photo")
//             }

//           }
//       }
      
//       res.Success("product image added successfully")
     
//     }

// }