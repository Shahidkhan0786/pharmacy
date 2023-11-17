"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvVGVzdENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtEQUFrRDtBQUNsRCw2Q0FBNkM7QUFDN0MsaUNBQWlDO0FBQ2pDLGlGQUFpRjtBQUNqRix1REFBdUQ7QUFDdkQsc0NBQXNDO0FBQ3RDLDRCQUE0QjtBQUM1QixnREFBZ0Q7QUFDaEQsSUFBSTtBQUNKLGlDQUFpQztBQUNqQyw2REFBNkQ7QUFFN0QsNkJBQTZCO0FBRTdCLFFBQVE7QUFFUixtQ0FBbUM7QUFDbkMsUUFBUTtBQUNSLHFDQUFxQztBQUNyQyxvREFBb0Q7QUFDcEQsb0NBQW9DO0FBQ3BDLFlBQVk7QUFFWixnQ0FBZ0M7QUFDaEMsUUFBUTtBQUVSLG1FQUFtRTtBQUNuRSxnQ0FBZ0M7QUFDaEMsMkNBQTJDO0FBQzNDLHdDQUF3QztBQUN4QyxnREFBZ0Q7QUFDaEQsbUJBQW1CO0FBQ25CLG9EQUFvRDtBQUNwRCx5QkFBeUI7QUFDekIsc0RBQXNEO0FBQ3RELCtEQUErRDtBQUMvRCxnQkFBZ0I7QUFDaEIsZ0JBQWdCO0FBQ2hCLGlHQUFpRztBQUNqRyw0QkFBNEI7QUFDNUIsNkNBQTZDO0FBQzdDLCtCQUErQjtBQUMvQiw4Q0FBOEM7QUFDOUMsZUFBZTtBQUVmLGtCQUFrQjtBQUNsQixxRUFBcUU7QUFDckUsd0NBQXdDO0FBQ3hDLDhCQUE4QjtBQUM5QixvQ0FBb0M7QUFDcEMsMEVBQTBFO0FBQzFFLGNBQWM7QUFFZCxRQUFRO0FBRVIsNEJBQTRCO0FBQzVCLGdFQUFnRTtBQUNoRSxtREFBbUQ7QUFDbkQsbUJBQW1CO0FBQ25CLGVBQWU7QUFDZixZQUFZO0FBQ1osUUFBUTtBQUVSLDZCQUE2QjtBQUU3Qix3RUFBd0U7QUFDeEUsMERBQTBEO0FBQzFELDhCQUE4QjtBQUM5QixnREFBZ0Q7QUFDaEQsVUFBVTtBQUNWLHNGQUFzRjtBQUN0Rix5QkFBeUI7QUFDekIsb0RBQW9EO0FBQ3BELG9EQUFvRDtBQUNwRCxtRkFBbUY7QUFDbkYsd0NBQXdDO0FBQ3hDLGdDQUFnQztBQUNoQyxpQ0FBaUM7QUFDakMsa0NBQWtDO0FBQ2xDLG9CQUFvQjtBQUNwQix3Q0FBd0M7QUFDeEMscURBQXFEO0FBQ3JELHdEQUF3RDtBQUN4RCxzQkFBc0I7QUFDdEIsMEVBQTBFO0FBQzFFLGdDQUFnQztBQUNoQyw0REFBNEQ7QUFDNUQsZ0JBQWdCO0FBRWhCLGNBQWM7QUFDZCxVQUFVO0FBRVYsd0RBQXdEO0FBRXhELFFBQVE7QUFFUixJQUFJIn0=