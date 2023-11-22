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
exports.LoanTakerController = void 0;
const loanTaker_1 = require("../models/loanTaker");
const joi_1 = __importDefault(require("joi"));
const sequelize_1 = require("sequelize");
const { Op } = require("sequelize");
const helper_1 = require("../helpers/helper");
const loan_1 = require("../models/loan");
const cloudinary = require("cloudinary").v2;
class LoanTakerController {
    constructor() { }
    static init() {
        if (this.instance == null) {
            this.instance = new LoanTakerController();
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
            if (qp.cnic && qp.cnic != "" && qp.cnic != null) {
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
            if ((qp === null || qp === void 0 ? void 0 : qp.perPage) && (qp === null || qp === void 0 ? void 0 : qp.page)) {
                pagination = {
                    offset: perPage * pageNo,
                    limit: perPage,
                };
            }
            const data = yield loanTaker_1.LoanTaker.findAndCountAll(Object.assign({ where,
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
    // fetch loan list by loan taker id
    loanList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                id: joi_1.default.number().required()
            });
            const { error, value } = schema.validate(req.body);
            if (error instanceof sequelize_1.ValidationError) {
                res.Error(error.details[0].message);
                return;
            }
            let qp = req.query;
            let perPage = Number(qp.perPage) > 0 ? Number(qp.perPage) : 10;
            let pageNo = Number(qp.page) > 0 ? Number(qp.page) - 1 : 0;
            let order = [];
            if (req.query.orderBy && req.query.order) {
                order.push([req.query.orderBy, req.query.order]);
            }
            const where = {};
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
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                name: joi_1.default.string().required(),
                phone_number: joi_1.default.string().required(),
                cnic: joi_1.default.string().required(),
                description: joi_1.default.string().required(),
                status: joi_1.default.required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error instanceof sequelize_1.ValidationError) {
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
                const instance = yield loanTaker_1.LoanTaker.create(catData);
                //   await transaction.commit();
                return res.Success("Added Successfully", instance);
            }
            catch (e) {
                //   await transaction.rollback();
                console.log("Error", e);
                return res.Error("Error in adding record", e);
                global.log.error(e);
                res.Error("error in creating LoanTaker");
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                id: joi_1.default.number().required(),
                name: joi_1.default.string().required(),
                description: joi_1.default.string().required(),
                phone_number: joi_1.default.string().required(),
                cinc: joi_1.default.string().required(),
                status: joi_1.default.required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error instanceof sequelize_1.ValidationError) {
                res.Error(error.details[0].message);
                return;
            }
            const LoanTakerr = yield loanTaker_1.LoanTaker.findByPk(req.body.id);
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
                const instance = yield loanTaker_1.LoanTaker.update(LoanTakerData, {
                    where: { id: req.body.id },
                });
                if (!instance) {
                    return res.Error("Error in updating record please fill correct data");
                }
                const res_data = yield loanTaker_1.LoanTaker.findByPk(req.body.id);
                return res.Success("updated successfully", res_data);
            }
            catch (e) {
                return res.Error("Error in updating record please fill correct data");
                console.log("Error in updating LoanTaker", e);
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
            const data = yield loanTaker_1.LoanTaker.update({ status: req.body.status }, { where: { id: req.body.id } });
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
                let data = yield loanTaker_1.LoanTaker.destroy({
                    where: {
                        id: Number(req.body.id),
                    },
                });
            }
            catch (err) {
                console.log(err);
                res.Error("error in deleting LoanTaker");
            }
            res.Success("Successfullt deleted");
        });
    }
}
LoanTakerController.instance = null;
exports.LoanTakerController = LoanTakerController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hblRha2VyQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9Mb2FuVGFrZXJDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1EQUFnRDtBQUNoRCw4Q0FBc0I7QUFDdEIseUNBQTRDO0FBQzVDLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEMsOENBQXFEO0FBQ3JELHlDQUFzQztBQUV0QyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzVDLE1BQWEsbUJBQW1CO0lBRzlCLGdCQUF1QixDQUFDO0lBRXhCLE1BQU0sQ0FBQyxJQUFJO1FBQ1QsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztTQUMzQztRQUVELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUssSUFBSSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3BELElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDbkIsSUFBSSxPQUFPLEdBQVEsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNwRSxJQUFJLE1BQU0sR0FBUSxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRSxJQUFJLEtBQUssR0FBZSxFQUFF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