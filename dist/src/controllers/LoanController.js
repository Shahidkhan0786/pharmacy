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
exports.LoanController = void 0;
// import { Loan } from "../models/Loan";
const loan_1 = require("../models/loan");
const joi_1 = __importDefault(require("joi"));
const sequelize_1 = require("sequelize");
const { Op } = require("sequelize");
const helper_1 = require("../helpers/helper");
const cloudinary = require("cloudinary").v2;
class LoanController {
    constructor() { }
    static init() {
        if (this.instance == null) {
            this.instance = new LoanController();
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
            if (qp.status && qp.status != "" && qp.status != null) {
                where["status"] = {
                    [Op.eq]: qp.status,
                };
            }
            if (qp.loan_type && qp.loan_type != "" && qp.loan_type != null) {
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
            if ((qp === null || qp === void 0 ? void 0 : qp.perPage) && (qp === null || qp === void 0 ? void 0 : qp.page)) {
                pagination = {
                    offset: perPage * pageNo,
                    limit: perPage,
                };
            }
            const data = yield loan_1.Loan.findAndCountAll(Object.assign({ where,
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                loan_taker_id: joi_1.default.number().required(),
                loan_type: joi_1.default.string().required().valid("cash", "items"),
                amount: joi_1.default.number().required().integer().min(1),
                bill_no: joi_1.default.number().optional().integer(),
                description: joi_1.default.string().optional(),
                date: joi_1.default.string().required(),
                status: joi_1.default.required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error instanceof sequelize_1.ValidationError) {
                return res.Error(error.details[0].message);
            }
            const catData = {
                loan_taker_id: req.body.loan_taker_id,
                loan_type: req.body.loan_type,
                amount: req.body.amount,
                description: (_a = req.body.description) !== null && _a !== void 0 ? _a : null,
                bill_no: (_b = req.body.bill_no) !== null && _b !== void 0 ? _b : null,
                date: req.body.date,
                status: req.body.status,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            try {
                const instance = yield loan_1.Loan.create(catData);
                return res.Success("Added Successfully", instance);
            }
            catch (e) {
                console.log("Error", e);
                return res.Error("Error in adding record");
                //   (global as any).log.error(e);
            }
        });
    }
    update(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                id: joi_1.default.number().required(),
                loan_taker_id: joi_1.default.number().required(),
                loan_type: joi_1.default.string().optional().valid("cash", "items"),
                amount: joi_1.default.number().optional().integer().min(1),
                bill_no: joi_1.default.number().optional().integer(),
                description: joi_1.default.string().optional(),
                status: joi_1.default.optional(),
            });
            const { error, value } = schema.validate(req.body);
            if (error instanceof sequelize_1.ValidationError) {
                res.Error(error.details[0].message);
                return;
            }
            const Loanr = yield loan_1.Loan.findByPk(req.body.id);
            if (!Loanr) {
                res.Error("No Record Found");
                return;
            }
            const LoanData = {
                loan_taker_id: req.body.loan_taker_id,
                loan_type: req.body.loan_type,
                amount: req.body.amount,
                description: (_a = req.body.description) !== null && _a !== void 0 ? _a : null,
                bill_no: (_b = req.body.bill_no) !== null && _b !== void 0 ? _b : null,
                status: req.body.status,
                updatedAt: new Date(),
            };
            try {
                const instance = yield loan_1.Loan.update(LoanData, {
                    where: { id: req.body.id },
                });
                if (!instance) {
                    return res.Error("Error in updating record please fill correct data");
                }
                const res_data = yield loan_1.Loan.findByPk(req.body.id);
                return res.Success("updated successfully", res_data);
            }
            catch (e) {
                return res.Error("Error in updating record please fill correct data");
                console.log("Error in updating Loan", e);
                global.log.error(e);
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
            const data = yield loan_1.Loan.update({ status: req.body.status }, { where: { id: req.body.id } });
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
                let data = yield loan_1.Loan.destroy({
                    where: {
                        id: Number(req.body.id),
                    },
                });
            }
            catch (err) {
                console.log(err);
                res.Error("error in deleting Loan");
            }
            res.Success("Successfullt deleted");
        });
    }
}
LoanController.instance = null;
exports.LoanController = LoanController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hbkNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvTG9hbkNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQXlDO0FBQ3pDLHlDQUFzQztBQUN0Qyw4Q0FBc0I7QUFDdEIseUNBQTRDO0FBQzVDLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEMsOENBQXFEO0FBRXJELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDNUMsTUFBYSxjQUFjO0lBR3pCLGdCQUF1QixDQUFDO0lBRXhCLE1BQU0sQ0FBQyxJQUFJO1FBQ1QsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7U0FDdEM7UUFFRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVLLElBQUksQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUNwRCxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ25CLElBQUksT0FBTyxHQUFRLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDcEUsSUFBSSxNQUFNLEdBQVEsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxLQUFLLEdBQWUsRUFBRSxDQUFDO1lBQzNCLElB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