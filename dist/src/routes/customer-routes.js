"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const routes_config_1 = require("./routes.config");
const auth_middlewares_1 = require("../middlewares/auth-middlewares");
class CustomerRoutes extends routes_config_1.RoutesConfig {
    constructor(app) {
        super(app, 'CustomerRoutes');
    }
    configureRoutes() {
        this.route = express_1.default.Router();
        this.app.use('/api/customer', new auth_middlewares_1.AuthMiddleware(this.app).handle, this.route);
        return this.app;
    }
}
exports.CustomerRoutes = CustomerRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItcm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy9jdXN0b21lci1yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQXlDO0FBQ3pDLG1EQUE4QztBQUM5QyxzRUFBK0Q7QUFFL0QsTUFBYSxjQUFlLFNBQVEsNEJBQVk7SUFHNUMsWUFBWSxHQUF1QjtRQUMvQixLQUFLLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLENBQUE7SUFDaEMsQ0FBQztJQUNELGVBQWU7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7UUFJaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFDLElBQUksaUNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUU3RSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUVKO0FBaEJELHdDQWdCQyJ9