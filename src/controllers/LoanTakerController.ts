import express from "express";
import { LoanTaker } from "../models/loanTaker";
import Joi from "joi";
import { ValidationError } from "sequelize";
const { Op } = require("sequelize");
import { paging, enumKeys } from "../helpers/helper";
import { Loan } from "../models/loan";

const cloudinary = require("cloudinary").v2;
export class LoanTakerController {
  private static instance: LoanTakerController | null = null;

  private constructor() {}

  static init(): LoanTakerController {
    if (this.instance == null) {
      this.instance = new LoanTakerController();
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

    if(qp.cnic && qp.cnic != "" && qp.cnic!= null) {
       where["cnic"] = {
        [Op.eq]: qp.cnic,
       };
    }

    if (qp.phone_number && qp.phone_number != "" && qp.phone_number != null) {
      where["phone_number"] = {
        [Op.eq]: qp.phone_number,
      };
    }

    let pagination = {};

    if (qp?.perPage && qp?.page) {
      pagination = {
        offset: perPage * pageNo,
        limit: perPage,
      };
    }

    const data = await LoanTaker.findAndCountAll({
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

  // fetch loan list by loan taker id
  async loanList(req: express.Request, res: express.Response) {
    const schema = Joi.object().keys({
      id: Joi.number().required()
    });

    const { error, value } = schema.validate(req.body);
    if (error instanceof ValidationError) {
      res.Error(error.details[0].message);
      return;
    }

    let qp = req.query;
    let perPage: any = Number(qp.perPage) > 0 ? Number(qp.perPage) : 10;
    let pageNo: any = Number(qp.page) > 0 ? Number(qp.page) - 1 : 0;
    let order: Array<any> = [];
    if (req.query.orderBy && req.query.order) {
      order.push([req.query.orderBy as string, req.query.order as string]);
    }

    const where: any = {};
    where["loan_taker_id"] = {
      [Op.eq]: req.body.id,
    };

    // if (qp.keyword) {
    //   where["name"] = { [Op.like]: "%" + qp.keyword + "%" };
    // }


    // if (qp.status && qp.status != "" && qp.status != null) {
    //   where["status"] = {
    //     [Op.eq]: qp.status,
    //   };
    // }

    // if(qp.cnic && qp.cnic != "" && qp.cnic!= null) {
    //    where["cnic"] = {
    //     [Op.eq]: qp.cnic,
    //    };
    // }

    // if (qp.phone_number && qp.phone_number != "" && qp.phone_number != null) {
    //   where["phone_number"] = {
    //     [Op.eq]: qp.phone_number,
    //   };
    // }

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
      name: Joi.string().required(),
      phone_number: Joi.string().required(),
      cnic: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error instanceof ValidationError) {
      return res.Error(error.details[0].message);
    }

    const catData = {
      name: req.body.name,
      phone_number: req.body.phone_number,
      cnic: req.body.cnic,
      description: req.body.description,
      status: req.body.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // const transaction = await sequelize.transaction();
    try {
      const instance = await LoanTaker.create(catData);
      //   await transaction.commit();
      return res.Success("Added Successfully", instance);
    } catch (e: any) {
      //   await transaction.rollback();
      console.log("Error", e);
      return res.Error("Error in adding record",e);
      (global as any).log.error(e);
      res.Error("error in creating LoanTaker");
    }
  }

  public async update(req: express.Request, res: express.Response) {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      phone_number: Joi.string().required(),
      cinc: Joi.string().required(),
      status: Joi.required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error instanceof ValidationError) {
      res.Error(error.details[0].message);
      return;
    }

    const LoanTakerr: any = await LoanTaker.findByPk(req.body.id);

    if (!LoanTakerr) {
      res.Error("No Record Found");
      return;
    }

    const LoanTakerData = {
      name: req.body.name,
      phone_number: req.body.phone_number,
      description: req.body.description,
      cnic: req.body.cnic,
      status: req.body.status,
      updatedAt: new Date(),
    };
    try {
      const instance = await LoanTaker.update(LoanTakerData, {
        where: { id: req.body.id },
      });
      if (!instance) {
        return res.Error("Error in updating record please fill correct data");
      }
      const res_data = await LoanTaker.findByPk(req.body.id);
      return res.Success("updated successfully", res_data);
    } catch (e: any) {
      return res.Error("Error in updating record please fill correct data");
      console.log("Error in updating LoanTaker", e);
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

    const data: any = await LoanTaker.update(
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
      let data = await LoanTaker.destroy({
        where: {
          id: Number(req.body.id),
        },
      });
    } catch (err) {
      console.log(err);
      res.Error("error in deleting LoanTaker");
    }

    res.Success("Successfullt deleted");
  }
}
