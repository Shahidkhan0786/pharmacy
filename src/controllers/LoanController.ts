import express from "express";
// import { Loan } from "../models/Loan";
import { Loan } from "../models/loan";
import Joi from "joi";
import { ValidationError } from "sequelize";
const { Op } = require("sequelize");
import { paging, enumKeys } from "../helpers/helper";

const cloudinary = require("cloudinary").v2;
export class LoanController {
  private static instance: LoanController | null = null;

  private constructor() {}

  static init(): LoanController {
    if (this.instance == null) {
      this.instance = new LoanController();
    }

    return this.instance;
  }

  async list(req: express.Request, res: express.Response) {
    let qp = req.query;
    let perPage: any = Number(qp.perPage) > 0 ? Number(qp.perPage) : 10;
    let pageNo: any = Number(qp.page) > 0 ? Number(qp.page) - 1 : 0;
    let order: Array<any> = [];
    if (req.query.orderBy && req.query.order) {
      order.push([req.query.orderBy as string, req.query.order as string]);
    }

    const where: any = {};

    if (qp.keyword) {
      where["name"] = { [Op.like]: "%" + qp.keyword + "%" };
    }


    if (qp.status && qp.status != "" && qp.status != null) {
      where["status"] = {
        [Op.eq]: qp.status,
      };
    }

    if(qp.loan_type && qp.loan_type != "" && qp.loan_type!= null) {
       where["loan_type"] = {
        [Op.eq]: qp.loan_type,
       };
    }

    if (qp.date && qp.date != "" && qp.date != null) {
      where["date"] = {
        [Op.eq]: qp.date,
      };
    }

    let pagination = {};

    if (qp?.perPage && qp?.page) {
      pagination = {
        offset: perPage * pageNo,
        limit: perPage,
      };
    }

    const data = await Loan.findAndCountAll({
      where,
      order,
      distinct: true,
      ...pagination,
    }).catch((e) => {
      console.log(e);
    });

    if (qp.hasOwnProperty("page")) {
      return res.Success("list", paging(data, pageNo, perPage));
    } else {
      return res.Success("list", data);
    }
  }

  public async save(req: express.Request, res: express.Response) {
    const schema = Joi.object().keys({
      loan_taker_id: Joi.number().required(),
      loan_type: Joi.string().required().valid("cash", "items"),
      amount: Joi.number().required().integer().min(1),
      bill_no: Joi.number().optional().integer(),
      description: Joi.string().optional(),
      date: Joi.string().required(),
      status: Joi.required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error instanceof ValidationError) {
      return res.Error(error.details[0].message);
    }

    const catData = {
      loan_taker_id: req.body.loan_taker_id,
      loan_type: req.body.loan_type,
      amount: req.body.amount,
      description: req.body.description ?? null,
      bill_no: req.body.bill_no ?? null, // Make bill_no optional using conditional assignment
      date: req.body.date,
      status: req.body.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

   
    try {
      const instance = await Loan.create(catData);
      return res.Success("Added Successfully", instance);
    } catch (e: any) {
      console.log("Error", e);
      return res.Error("Error in adding record");
    //   (global as any).log.error(e);
    }
  }

  public async update(req: express.Request, res: express.Response) {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      loan_taker_id: Joi.number().required(),
      loan_type: Joi.string().optional().valid("cash", "items"),
      amount: Joi.number().optional().integer().min(1),
      bill_no: Joi.number().optional().integer(),
      description: Joi.string().optional(),
      status: Joi.optional(),
    });

    const { error, value } = schema.validate(req.body);
    if (error instanceof ValidationError) {
      res.Error(error.details[0].message);
      return;
    }

    const Loanr: any = await Loan.findByPk(req.body.id);

    if (!Loanr) {
      res.Error("No Record Found");
      return;
    }

    const LoanData = {
      loan_taker_id: req.body.loan_taker_id,
      loan_type: req.body.loan_type,
      amount: req.body.amount,
      description: req.body.description ?? null,
      bill_no: req.body.bill_no ?? null, // Make bill_no optional using conditional assignment
      status: req.body.status,
      updatedAt: new Date(),
    };
    try {
      const instance = await Loan.update(LoanData, {
        where: { id: req.body.id },
      });
      if (!instance) {
        return res.Error("Error in updating record please fill correct data");
      }
      const res_data = await Loan.findByPk(req.body.id);
      return res.Success("updated successfully", res_data);
    } catch (e: any) {
      return res.Error("Error in updating record please fill correct data");
      console.log("Error in updating Loan", e);
      (global as any).log.error(e);
    }
  }

  async updateStatus(req: express.Request, res: express.Response) {
    // (global as any).log.info("Update Status");

    const schema = Joi.object().keys({
      status: Joi.string().required(),
      id: Joi.number().required(),
    });
    const { error, value } = schema.validate(req.body);

    if (error instanceof ValidationError) {
      res.Error(error.details[0].message);
      return;
    }

    const data: any = await Loan.update(
      { status: req.body.status },
      { where: { id: req.body.id } }
    );

    if (data == null) {
      res.Error("record not Found");
      return;
    }
    return res.Success("status updated successfully");
  }
  // del user
  async del(req: express.Request, res: express.Response) {
    try {
      let data = await Loan.destroy({
        where: {
          id: Number(req.body.id),
        },
      });
    } catch (err) {
      console.log(err);
      res.Error("error in deleting Loan");
    }

    res.Success("Successfullt deleted");
  }
}
