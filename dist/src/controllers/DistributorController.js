"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributorController = void 0;
const distributor_1 = require("../models/distributor");
const joi_1 = __importDefault(require("joi"));
const sequelize_1 = require("sequelize");
const { Op } = require("sequelize");
const helper_1 = require("../helpers/helper");
const cloudinary = require("cloudinary").v2;
class DistributorController {
    constructor() { }
    static init() {
        if (this.instance == null) {
            this.instance = new DistributorController();
        }
        return this.instance;
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let qp = req.query;
            let perPage = Number(qp.perPage) > 0 ? Number(qp.perPage) : 10;
            let pageNo = Number(qp.page) > 0 ? Number(qp.page) - 1 : 0;
            let order = [];
            if (req.query.orderBy && req.query.order) {
                order.push([req.query.orderBy, req.query.order]);
            }
            const where = {};
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
            if ((qp === null || qp === void 0 ? void 0 : qp.perPage) && (qp === null || qp === void 0 ? void 0 : qp.page)) {
                pagination = {
                    offset: perPage * pageNo,
                    limit: perPage,
                };
            }
            const data = yield distributor_1.Distributor.findAndCountAll(Object.assign({ where,
                order, distinct: true }, pagination)).catch((e) => {
                console.log(e);
            });
            if (qp.hasOwnProperty("page")) {
                return res.Success("list", (0, helper_1.paging)(data, pageNo, perPage));
            }
            else {
                return res.Success("list", data);
            }
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                name: joi_1.default.string().required(),
                description: joi_1.default.string().required(),
                companyName: joi_1.default.string().required(),
                phoneNo: joi_1.default.string().required(),
                status: joi_1.default.required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error instanceof sequelize_1.ValidationError) {
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
                const instance = yield distributor_1.Distributor.create(catData);
                //   await transaction.commit();
                return res.Success("Added Successfully", instance);
            }
            catch (e) {
                //   await transaction.rollback();
                console.log("Error", e);
                global.log.error(e);
                res.Error("error in creating distributor");
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                id: joi_1.default.number().required(),
                name: joi_1.default.string().required(),
                description: joi_1.default.string().required(),
                companyName: joi_1.default.string().required(),
                phoneNo: joi_1.default.string().required(),
                status: joi_1.default.required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error instanceof sequelize_1.ValidationError) {
                res.Error(error.details[0].message);
                return;
            }
            const distributor = yield distributor_1.Distributor.findByPk(req.body.id);
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
                const instance = yield distributor_1.Distributor.update(distributorData, {
                    where: { id: req.body.id },
                });
                if (!instance) {
                    return res.Error("Error in updating record please fill correct data");
                }
                const res_data = yield distributor_1.Distributor.findByPk(req.body.id);
                return res.Success("updated successfully", res_data);
            }
            catch (e) {
                console.log("Error in updating distributor", e);
                global.log.error(e);
                return res.Error("Error in updating record please fill correct data");
            }
        });
    }
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // (global as any).log.info("Update Status");
            const schema = joi_1.default.object().keys({
                status: joi_1.default.string().required(),
                id: joi_1.default.number().required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error instanceof sequelize_1.ValidationError) {
                res.Error(error.details[0].message);
                return;
            }
            const data = yield distributor_1.Distributor.update({ status: req.body.status }, { where: { id: req.body.id } });
            if (data == null) {
                res.Error("record not Found");
                return;
            }
            return res.Success("status updated successfully");
        });
    }
    // del user
    del(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield distributor_1.Distributor.destroy({
                    where: {
                        id: Number(req.body.id),
                    },
                });
            }
            catch (err) {
                console.log(err);
                res.Error("error in deleting distributor");
            }
            res.Success("Successfullt deleted");
        });
    }
}
DistributorController.instance = null;
exports.DistributorController = DistributorController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzdHJpYnV0b3JDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXJzL0Rpc3RyaWJ1dG9yQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFFQSx1REFBb0Q7QUFDcEQsOENBQXNCO0FBQ3RCLHlDQUE0QztBQUM1QyxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3BDLDhDQUFxRDtBQUVyRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzVDLE1BQWEscUJBQXFCO0lBR2hDLGdCQUF1QixDQUFDO0lBRXhCLE1BQU0sQ0FBQyxJQUFJO1FBQ1QsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztTQUM3QztRQUVELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUssSUFBSSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3BELElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDbkIsSUFBSSxPQUFPLEdBQVEsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNwRSxJQUFJLE1BQU0sR0FBUSxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRSxJQUFJLEtBQUssR0FBZSxFQUFFLENBQUM7WUFD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