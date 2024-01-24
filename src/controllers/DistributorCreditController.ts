import express from "express";
// import { Loan } from "../models/Loan";
import { Loan } from "../models/loan";
import { Distributor } from "../models/distributor";
import { DistributorCredit } from "../models/DistributorCredit";
import { DistributorDebit } from "../models/DistributorDebit";
import Joi from "joi";
import { ValidationError } from "sequelize";
const { Op } = require("sequelize");
import { paging, enumKeys } from "../helpers/helper";
import { LoanTaker } from "../models/loanTaker";
import { LoanTransaction } from "../models/loanTransaction";
import { sequelize } from "../config/connection";

export class DistributorCreditController {
  private static instance: DistributorCreditController | null = null;

  private constructor() {}

  static init(): DistributorCreditController {
    if (this.instance == null) {
      this.instance = new DistributorCreditController();
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
    where["distributor_id"] = req.query.id;
    if (
      qp.credit_amount &&
      qp.credit_amount != "" &&
      qp.credit_amount != null
    ) {
      where["credit_amount"] = {
        [Op.eq]: qp.credit_amount,
      };
    }

    if (
      qp.payment_source &&
      qp.payment_source != "" &&
      qp.payment_source != null
    ) {
      where["payment_source"] = {
        [Op.eq]: qp.payment_source,
      };
    }

    if (qp.credit_date && qp.credit_date != "" && qp.credit_date != null) {
      where["credit_date"] = {
        [Op.eq]: qp.credit_date,
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

    const data = await DistributorCredit.findAndCountAll({
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
      distributor_id: Joi.number().required(),
      description: Joi.string().optional(),
      credit_date: Joi.optional(),
      credit_amount: Joi.required(),
      payment_source: Joi.required(),
      status: Joi.required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error instanceof ValidationError) {
      return res.Error(error.details[0].message);
    }

    const catData = {
      distributor_id: req.body.distributor_id,
      description: req.body.description ?? null,
      credit_amount: req.body.credit_amount ?? 0,
      credit_date: req.body.credit_date ?? "",
      payment_source: req.body.payment_source ?? "",
      status: req.body.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const distributor_id = Number(req.body.distributor_id);
    const creditAmount = req.body.credit_amount;
    const credit = await sequelize.transaction();
    try {
      const instance = await DistributorCredit.create(catData);
      const loanTaker = await Distributor.findOne({
        where: { id: distributor_id },
      });

      if (loanTaker) {
        let paidLoanAmount = loanTaker.paid_amount;
        let remainingLoanAmount = loanTaker.remaining_amount;
        paidLoanAmount = Number(paidLoanAmount) + Number(creditAmount);
        // Calculate the remaining loan amount after the update
        remainingLoanAmount =
          Number(remainingLoanAmount) - Number(creditAmount);

        // Update the loan amount in the database
        await Distributor.update(
          {
            paid_amount: paidLoanAmount,
            remaining_amount: remainingLoanAmount,
          },
          { where: { id: distributor_id } }
        );
      } else {
        return res.Error("Pass Correct Loan Taker id");
      }
      await credit.commit();
      return res.Success("Added Successfully", instance);
    } catch (e: any) {
      console.log("Error", e);
      await credit.rollback();
      return res.Error("Error in adding record");
      //   (global as any).log.error(e);
    }
  }

  public async update(req: express.Request, res: express.Response) {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      distributor_id: Joi.number().required(),
      description: Joi.string().optional(),
      credit_date: Joi.optional(),
      credit_amount: Joi.optional(),
      payment_source: Joi.optional(),
      status: Joi.optional(),
    });

    const { error, value } = schema.validate(req.body);
    if (error instanceof ValidationError) {
      res.Error(error.details[0].message);
      return;
    }

    const Loanr: any = await DistributorCredit.findByPk(req.body.id);

    if (!Loanr) {
      res.Error("No Record Found");
      return;
    }

    const LoanData = {
      distributor_id: req.body.distributor_id,
      credit_amount: req.body.credit_amount ?? "",
      credit_date: req.body.credit_date ?? "",
      payment_source: req.body.payment_source ?? "",
      status: req.body.status,
      updatedAt: new Date(),
    };
    try {
      const instance = await DistributorCredit.update(LoanData, {
        where: { id: req.body.id },
      });
      if (!instance) {
        return res.Error("Error in updating record please fill correct data");
      }
      const res_data = await DistributorCredit.findByPk(req.body.id);
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

    const result = await DistributorCredit.findOne({
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

    const data: any = await DistributorCredit.update(
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
      let data = await DistributorCredit.destroy({
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
