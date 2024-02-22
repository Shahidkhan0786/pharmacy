import express from "express";
// import { Loan } from "../models/Loan";
import { Loan } from "../models/loan";
import { DistributorLoan } from "../models/DistributorLoan";
import { DistributorDebit } from "../models/DistributorDebit";
import Joi from "joi";
import { ValidationError } from "sequelize";
const { Op } = require("sequelize");
import { paging, enumKeys } from "../helpers/helper";
import { LoanTaker } from "../models/loanTaker";
import { Distributor } from "../models/distributor";
import { DailyClosing as DC } from "../models/DailyClosing";

const cloudinary = require("cloudinary").v2;

export class DailyClosing {
  private static instance: DailyClosing | null = null;

  private constructor() {}

  static init(): DailyClosing {
    if (this.instance == null) {
      this.instance = new DailyClosing();
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
    // where["distributor_id"] = req.query.id;
    // if (qp.keyword) {
    //   where["name"] = { [Op.like]: "%" + qp.keyword + "%" };
    // }

    if (qp.status && qp.status != "" && qp.status != null) {
      where["status"] = {
        [Op.eq]: qp.status,
      };
    }

    // if (qp.loan_type && qp.loan_type != "" && qp.loan_type != null) {
    //   where["loan_type"] = {
    //     [Op.eq]: qp.loan_type,
    //   };
    // }

    if (qp.date && qp.date != "" && qp.date != null) {
      where["date"] = {
        [Op.eq]: qp.date,
      };
    }

    // if (qp.amount && qp.amount != "" && qp.amount != null) {
    //   where["amount"] = {
    //     [Op.eq]: qp.amount,
    //   };
    // }

    // if (qp.bill_no && qp.bill_no != "" && qp.bill_no != null) {
    //   where["bill_no"] = {
    //     [Op.eq]: qp.bill_no,
    //   };
    // }

    let pagination = {};

    if (qp?.perPage && qp?.page) {
      pagination = {
        offset: perPage * pageNo,
        limit: perPage,
      };
    }

    const data = await DC.findAndCountAll({
      include: { model: Loan },
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
      closing_date: Joi.date().required(),
      total_sales: Joi.number().required(),
      previous_day_closing_sale: Joi.number().required(),
      loan: Joi.number().required(),
      loan_return: Joi.number().required(),
      debited_amount: Joi.number().required(),
      credited_amount: Joi.number().required(),
      grand_total: Joi.number().required(),
      status: Joi.required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error instanceof ValidationError) {
      return res.Error(error.details[0].message);
    }
    console.log(req.body.date);
    const catData = {
      closing_date: req.body.closing_date,
      total_sales: req.body.total_sales,
      description: req.body.description,
      previous_day_closing_sale: req.body.previous_day_closing_sale,
      loan: req.body.loan,
      loan_return: req.body.loan_return, // Make bill_no optional using conditional assignment
      debited_amount: req.body.debited_amount,
      credited_amount: req.body.credited_amount,
      grand_total: req.body.grand_total,
      status: req.body.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // const distributorId = Number(req.body.distributor_id);
    // const additionalAmount = req.body.amount;
    try {
      const instance = await DC.create(catData);

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
      distributor_id: Joi.number().required(),
      // loan_type: Joi.string().optional().valid("cash", "items"),
      amount: Joi.number().optional().integer().min(1),
      bill_no: Joi.number().optional().integer(),
      description: Joi.string().optional(),
      payment_source: Joi.optional(),
      status: Joi.optional(),
      return_date: Joi.optional(),
      installment_count: Joi.optional(),
      installment_amount: Joi.optional(),
    });

    const { error, value } = schema.validate(req.body);
    if (error instanceof ValidationError) {
      res.Error(error.details[0].message);
      return;
    }

    const debit: any = await Loan.findByPk(req.body.id);

    if (!debit) {
      res.Error("No Record Found");
      return;
    }

    const debitData = {
      distributor_id: req.body.distributor_id,
      amount: req.body.amount,
      description: req.body.description ?? null,
      bill_no: req.body.bill_no ?? null, // Make bill_no optional using conditional assignment
      status: req.body.status,
      payment_source: req.body.payment_source ?? "",
      updatedAt: new Date(),
      return_date: req.body.return_date ?? null,
      installment_count: req.body.installment_count ?? 0,
      installment_amount: req.body.installment_amount ?? 0,
    };
    try {
      const instance = await DistributorDebit.update(debitData, {
        where: { id: req.body.id },
      });
      if (!instance) {
        return res.Error("Error in updating record please fill correct data");
      }
      const res_data = await DistributorDebit.findByPk(req.body.id);
      return res.Success("updated successfully", res_data);
    } catch (e: any) {
      return res.Error("Error in updating record please fill correct data");
      console.log("Error in updating Loan", e);
      (global as any).log.error(e);
    }
  }

  public async detail(req: express.Request, res: express.Response) {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
    });
    const { error, value } = schema.validate(req.body);

    if (error instanceof ValidationError) {
      res.Error(error.details[0].message);
      return;
    }

    const result = await DistributorDebit.findOne({
      where: { id: Number(req.body.id) },
    });
    // console.log(review);

    if (result === null) {
      res.Error("data not found");
      return;
    }

    res.Success("Detail", result);
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

    const data: any = await DistributorDebit.update(
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
      let data = await DistributorDebit.destroy({
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
