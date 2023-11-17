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
exports.LoanTakerController = LoanTakerController;
LoanTakerController.instance = null;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hblRha2VyQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9Mb2FuVGFrZXJDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1EQUFnRDtBQUNoRCw4Q0FBc0I7QUFDdEIseUNBQTRDO0FBQzVDLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEMsOENBQXFEO0FBRXJELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDNUMsTUFBYSxtQkFBbUI7SUFHOUIsZ0JBQXVCLENBQUM7SUFFeEIsTUFBTSxDQUFDLElBQUk7UUFDVCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1NBQzNDO1FBRUQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFSyxJQUFJLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDcEQsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNuQixJQUFJLE9BQU8sR0FBUSxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3BFLElBQUksTUFBTSxHQUFRLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLElBQUksS0FBSyxHQUFlLEVBQUUsQ0FBQztZQUMzQixJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUN4QyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFpQixFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBZSxDQUFDLENBQUMsQ0FBQzthQUN0RTtZQUVELE1BQU0sS0FBSyxHQUFRLEVBQUUsQ0FBQztZQUV0QixJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUM7YUFDdkQ7WUFHRCxJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7Z0JBQ3JELEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRztvQkFDaEIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU07aUJBQ25CLENBQUM7YUFDSDtZQUVELElBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFHLElBQUksRUFBRTtnQkFDNUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHO29CQUNmLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJO2lCQUNoQixDQUFDO2FBQ0o7WUFFRCxJQUFJLEVBQUUsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLFlBQVksSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUU7Z0JBQ3ZFLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRztvQkFDdEIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFlBQVk7aUJBQ3pCLENBQUM7YUFDSDtZQUVELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUVwQixJQUFJLENBQUEsRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFFLE9BQU8sTUFBSSxFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLENBQUUsSUFBSSxDQUFBLEVBQUU7Z0JBQzNCLFVBQVUsR0FBRztvQkFDWCxNQUFNLEVBQUUsT0FBTyxHQUFHLE1BQU07b0JBQ3hCLEtBQUssRUFBRSxPQUFPO2lCQUNmLENBQUM7YUFDSDtZQUVELE1BQU0sSUFBSSxHQUFHLE1BQU0scUJBQVMsQ0FBQyxlQUFlLGlCQUMxQyxLQUFLO2dCQUNMLEtBQUssRUFDTCxRQUFRLEVBQUUsSUFBSSxJQUNYLFVBQVUsRUFDYixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzdCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBQSxlQUFNLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQzNEO2lCQUFNO2dCQUNMLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbEM7UUFDSCxDQUFDO0tBQUE7SUFFWSxJQUFJLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDM0QsTUFBTSxNQUFNLEdBQUcsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDL0IsSUFBSSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Z0JBQzdCLFlBQVksRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO2dCQUNyQyxJQUFJLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtnQkFDN0IsV0FBVyxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3BDLE1BQU0sRUFBRSxhQUFHLENBQUMsUUFBUSxFQUFFO2FBQ3ZCLENBQUMsQ0FBQztZQUVILE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsSUFBSSxLQUFLLFlBQVksMkJBQWUsRUFBRTtnQkFDcEMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDNUM7WUFFRCxNQUFNLE9BQU8sR0FBRztnQkFDZCxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJO2dCQUNuQixZQUFZLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZO2dCQUNuQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJO2dCQUNuQixXQUFXLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXO2dCQUNqQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNO2dCQUN2QixTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7Z0JBQ3JCLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTthQUN0QixDQUFDO1lBRUYscURBQXFEO1lBQ3JELElBQUk7Z0JBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakQsZ0NBQWdDO2dCQUNoQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDcEQ7WUFBQyxPQUFPLENBQU0sRUFBRTtnQkFDZixrQ0FBa0M7Z0JBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLE1BQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixHQUFHLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7YUFDMUM7UUFDSCxDQUFDO0tBQUE7SUFFWSxNQUFNLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDN0QsTUFBTSxNQUFNLEdBQUcsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDL0IsRUFBRSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Z0JBQzNCLElBQUksRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO2dCQUM3QixXQUFXLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtnQkFDcEMsWUFBWSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3JDLElBQUksRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO2dCQUM3QixNQUFNLEVBQUUsYUFBRyxDQUFDLFFBQVEsRUFBRTthQUN2QixDQUFDLENBQUM7WUFFSCxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25ELElBQUksS0FBSyxZQUFZLDJCQUFlLEVBQUU7Z0JBQ3BDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEMsT0FBTzthQUNSO1lBRUQsTUFBTSxVQUFVLEdBQVEsTUFBTSxxQkFBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTlELElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2YsR0FBRyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM3QixPQUFPO2FBQ1I7WUFFRCxNQUFNLGFBQWEsR0FBRztnQkFDcEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTtnQkFDbkIsWUFBWSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWTtnQkFDbkMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFDakMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTtnQkFDbkIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTTtnQkFDdkIsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO2FBQ3RCLENBQUM7WUFDRixJQUFJO2dCQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0scUJBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO29CQUNyRCxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7aUJBQzNCLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNiLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO2lCQUN2RTtnQkFDRCxNQUFNLFFBQVEsR0FBRyxNQUFNLHFCQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZELE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN0RDtZQUFDLE9BQU8sQ0FBTSxFQUFFO2dCQUNmLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO2dCQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxNQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QjtRQUNILENBQUM7S0FBQTtJQUVLLFlBQVksQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUM1RCw2Q0FBNkM7WUFFN0MsTUFBTSxNQUFNLEdBQUcsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDL0IsTUFBTSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Z0JBQy9CLEVBQUUsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO2FBQzVCLENBQUMsQ0FBQztZQUNILE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFbkQsSUFBSSxLQUFLLFlBQVksMkJBQWUsRUFBRTtnQkFDcEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNwQyxPQUFPO2FBQ1I7WUFFRCxNQUFNLElBQUksR0FBUSxNQUFNLHFCQUFTLENBQUMsTUFBTSxDQUN0QyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUMzQixFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQy9CLENBQUM7WUFFRixJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQ2hCLEdBQUcsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDOUIsT0FBTzthQUNSO1lBQ0QsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDcEQsQ0FBQztLQUFBO0lBQ0QsV0FBVztJQUNMLEdBQUcsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUNuRCxJQUFJO2dCQUNGLElBQUksSUFBSSxHQUFHLE1BQU0scUJBQVMsQ0FBQyxPQUFPLENBQUM7b0JBQ2pDLEtBQUssRUFBRTt3QkFDTCxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO3FCQUN4QjtpQkFDRixDQUFDLENBQUM7YUFDSjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQzthQUMxQztZQUVELEdBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUN0QyxDQUFDO0tBQUE7O0FBcE1ILGtEQXFNQztBQXBNZ0IsNEJBQVEsR0FBK0IsSUFBSSxDQUFDIn0=