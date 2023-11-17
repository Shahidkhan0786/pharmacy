import express from "express";
import { User } from "../models/user";
import { Distributor } from "../models/distributor";
import Joi from "joi";
import { ValidationError } from "sequelize";
const { Op } = require("sequelize");
import { paging, enumKeys } from "../helpers/helper";

const cloudinary = require("cloudinary").v2;
export class DistributorController {
  private static instance: DistributorController | null = null;

  private constructor() {}

  static init(): DistributorController {
    if (this.instance == null) {
      this.instance = new DistributorController();
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

    if (qp.cname) {
      where["companyName"] = { [Op.like]: "%" + qp.cname + "%" };
    }

    if (qp.status && qp.status != "" && qp.status != null) {
      where["status"] = {
        [Op.eq]: qp.status,
      };
    }

    let pagination = {};

    if (qp?.perPage && qp?.page) {
      pagination = {
        offset: perPage * pageNo,
        limit: perPage,
      };
    }

    const data = await Distributor.findAndCountAll({
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
      description: Joi.string().required(),
      companyName: Joi.string().required(),
      phoneNo: Joi.string().required(),
      status: Joi.required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error instanceof ValidationError) {
      res.Error(error.details[0].message);
      return;
    }

    const catData = {
      name: req.body.name,
      companyName: req.body.companyName,
      description: req.body.description,
      phoneNo: req.body.phoneNo,
      status: req.body.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // const checkCat: Categories = await Distributor.findOne({
    //   where: { name: req.body.name },
    // });

    // if (checkCat != null) {
    //   res.Error("Category name already taken");
    //   return;
    // }

    // const transaction = await sequelize.transaction();
    try {
      const instance = await Distributor.create(catData);
      //   await transaction.commit();
      return res.Success("Added Successfully", instance);
    } catch (e: any) {
      //   await transaction.rollback();
      console.log("Error", e);
      (global as any).log.error(e);
      res.Error("error in creating distributor");
    }
  }

  public async update(req: express.Request, res: express.Response) {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      companyName: Joi.string().required(),
      phoneNo: Joi.string().required(),
      status: Joi.required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error instanceof ValidationError) {
      res.Error(error.details[0].message);
      return;
    }

    const distributor = await Distributor.findByPk(req.body.id);

    if (!distributor) {
      res.Error("No Record Found");
      return;
    }

    const distributorData = {
      name: req.body.name,
      companyName: req.body.companyName,
      description: req.body.description,
      phoneNo: req.body.phoneNo,
      status: req.body.status,
      updatedAt: new Date(),
    };
    try {
      const instance = await Distributor.update(distributorData, {
        where: { id: req.body.id },
      });
      if (!instance) {
        return res.Error("Error in updating record please fill correct data");
      }
      const res_data = await Distributor.findByPk(req.body.id);
      return res.Success("updated successfully", res_data);
    } catch (e: any) {
      console.log("Error in updating distributor", e);
      (global as any).log.error(e);
      return res.Error("Error in updating record please fill correct data");
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

    const data: any = await Distributor.update(
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
      let data = await Distributor.destroy({
        where: {
          id: Number(req.body.id),
        },
      });
    } catch (err) {
      console.log(err);
      res.Error("error in deleting distributor");
    }

    res.Success("Successfullt deleted");
  }
}
