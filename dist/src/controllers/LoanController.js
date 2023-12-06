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
const loanTaker_1 = require("../models/loanTaker");
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
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                loan_taker_id: joi_1.default.number().required(),
                loan_type: joi_1.default.string().required().valid("cash", "items"),
                amount: joi_1.default.number().required().integer().min(1),
                bill_no: joi_1.default.number().optional().integer(),
                description: joi_1.default.string().optional(),
                return_date: joi_1.default.optional(),
                installment_count: joi_1.default.optional(),
                installment_amount: joi_1.default.optional(),
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
                installment_amount: (_b = req.body.installment_amount) !== null && _b !== void 0 ? _b : 0,
                installment_count: (_c = req.body.installment_count) !== null && _c !== void 0 ? _c : 0,
                return_date: (_d = req.body.return_date) !== null && _d !== void 0 ? _d : null,
                bill_no: (_e = req.body.bill_no) !== null && _e !== void 0 ? _e : null,
                date: req.body.date,
                status: req.body.status,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const loanTakerId = Number(req.body.loan_taker_id);
            const additionalAmount = req.body.amount;
            try {
                const instance = yield loan_1.Loan.create(catData);
                const loanTaker = yield loanTaker_1.LoanTaker.findOne({
                    where: { id: loanTakerId },
                });
                if (loanTaker) {
                    let currentLoanAmount = loanTaker.loan_amount;
                    let remainingLoanAmount = loanTaker.remaining_amount;
                    currentLoanAmount += additionalAmount;
                    // Calculate the remaining loan amount after the update
                    remainingLoanAmount = remainingLoanAmount + additionalAmount;
                    // Update the loan amount in the database
                    yield loanTaker_1.LoanTaker.update({
                        loan_amount: currentLoanAmount,
                        remaining_amount: remainingLoanAmount,
                    }, { where: { id: loanTakerId } });
                }
                else {
                    return res.Error("Pass Correct Loan Taker id");
                }
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
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                id: joi_1.default.number().required(),
                loan_taker_id: joi_1.default.number().required(),
                loan_type: joi_1.default.string().optional().valid("cash", "items"),
                amount: joi_1.default.number().optional().integer().min(1),
                bill_no: joi_1.default.number().optional().integer(),
                description: joi_1.default.string().optional(),
                status: joi_1.default.optional(),
                return_date: joi_1.default.optional(),
                installment_count: joi_1.default.optional(),
                installment_amount: joi_1.default.optional(),
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
                return_date: (_c = req.body.return_date) !== null && _c !== void 0 ? _c : null,
                installment_count: (_d = req.body.installment_count) !== null && _d !== void 0 ? _d : 0,
                installment_amount: (_e = req.body.installment_amount) !== null && _e !== void 0 ? _e : 0,
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
    detail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                id: joi_1.default.number().required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error instanceof sequelize_1.ValidationError) {
                res.Error(error.details[0].message);
                return;
            }
            const result = yield loan_1.Loan.findOne({
                where: { id: Number(req.body.id) },
            });
            // console.log(review);
            if (result === null) {
                res.Error("data not found");
                return;
            }
            res.Success("Detail", result);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hbkNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvTG9hbkNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQXlDO0FBQ3pDLHlDQUFzQztBQUN0Qyw4Q0FBc0I7QUFDdEIseUNBQTRDO0FBQzVDLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEMsOENBQXFEO0FBQ3JELG1EQUFnRDtBQUVoRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzVDLE1BQWEsY0FBYztJQUd6QixnQkFBdUIsQ0FBQztJQUV4QixNQUFNLENBQUMsSUFBSTtRQUNULElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1NBQ3RDO1FBRUQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFSyxJQUFJLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDcEQsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNuQixJQUFJLE9BQU8sR0FBUSxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3BFLElBQUksTUFBTSxHQUFRLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLElBQUksS0FBSyxHQUFlLEVBQUUs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