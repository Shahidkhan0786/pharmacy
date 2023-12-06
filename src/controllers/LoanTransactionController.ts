import express from "express";
// import { Loan } from "../models/Loan";
import { Loan } from "../models/loan";
import Joi from "joi";
import { ValidationError } from "sequelize";
const { Op } = require("sequelize");
import { paging, enumKeys } from "../helpers/helper";
import { LoanTaker } from "../models/loanTaker";
import { LoanTransaction } from "../models/loanTransaction";
import { sequelize } from "../config/connection";
const cloudinary = require("cloudinary").v2;
export class LoanTransactionController {
  private static instance: LoanTransactionController | null = null;

  private constructor() {}

  static init(): LoanTransactionController {
    if (this.instance == null) {
      this.instance = new LoanTransactionController();
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

    if (
      qp.transaction_amount &&
      qp.transaction_amount != "" &&
      qp.transaction_amount != null
    ) {
      where["transaction_amount"] = {
        [Op.eq]: qp.transaction_amount,
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

    if (
      qp.transaction_date &&
      qp.transaction_date != "" &&
      qp.transaction_date != null
    ) {
      where["transaction_date"] = {
        [Op.eq]: qp.transaction_date,
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

    const data = await LoanTransaction.findAndCountAll({
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
      description: Joi.string().optional(),
      transaction_date: Joi.optional(),
      transaction_amount: Joi.required(),
      payment_source: Joi.required(),
      status: Joi.required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error instanceof ValidationError) {
      return res.Error(error.details[0].message);
    }

    const catData = {
      loan_taker_id: req.body.loan_taker_id,
      description: req.body.description ?? null,
      transaction_amount: req.body.transaction_amount ?? 0,
      transaction_date: req.body.transaction_date ?? "",
      payment_source: req.body.payment_source ?? "",
      status: req.body.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const loanTakerId = Number(req.body.loan_taker_id);
    const transactionAmount = req.body.transaction_amount;
    const transaction = await sequelize.transaction();
    try {
      const instance = await LoanTransaction.create(catData);
      const loanTaker = await LoanTaker.findOne({
        where: { id: loanTakerId },
      });

      if (loanTaker) {
        let paidLoanAmount = loanTaker.paid_amount;
        let remainingLoanAmount = loanTaker.remaining_amount;
        paidLoanAmount = Number(paidLoanAmount) + Number(transactionAmount);

        // Calculate the remaining loan amount after the update
        remainingLoanAmount = remainingLoanAmount - transactionAmount;

        // Update the loan amount in the database
        await LoanTaker.update(
          {
            paid_amount: paidLoanAmount,
            remaining_amount: remainingLoanAmount,
          },
          { where: { id: loanTakerId } }
        );
      } else {
        return res.Error("Pass Correct Loan Taker id");
      }
      await transaction.commit();
      return res.Success("Added Successfully", instance);
    } catch (e: any) {
      //   console.log("Error", e);
      await transaction.rollback();
      return res.Error("Error in adding record");
      //   (global as any).log.error(e);
    }
  }

  public async update(req: express.Request, res: express.Response) {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      loan_taker_id: Joi.number().required(),
      description: Joi.string().optional(),
      transaction_date: Joi.optional(),
      transaction_amount: Joi.optional(),
      payment_source: Joi.optional(),
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
      transaction_amount: req.body.transaction_amount ?? "",
      transaction_date: req.body.transaction_date ?? "",
      payment_source: req.body.payment_source ?? "",
      status: req.body.status,
      updatedAt: new Date(),
    };
    try {
      const instance = await LoanTransaction.update(LoanData, {
        where: { id: req.body.id },
      });
      if (!instance) {
        return res.Error("Error in updating record please fill correct data");
      }
      const res_data = await LoanTransaction.findByPk(req.body.id);
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

    const result = await LoanTransaction.findOne({
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

    const data: any = await LoanTransaction.update(
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
      let data = await LoanTransaction.destroy({
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
