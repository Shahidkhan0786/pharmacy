"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatusEnum = exports.OrderStatusEnum = exports.StatusEnum = exports.UserTypeEnum = void 0;
var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum["Admin"] = "admin";
    UserTypeEnum["Customer"] = "customer";
})(UserTypeEnum || (exports.UserTypeEnum = UserTypeEnum = {}));
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["Active"] = "Active";
    StatusEnum["Inactive"] = "Inactive";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
var OrderStatusEnum;
(function (OrderStatusEnum) {
    OrderStatusEnum["pending"] = "pending";
    OrderStatusEnum["complete"] = "complete";
    OrderStatusEnum["rejected"] = "rejected";
})(OrderStatusEnum || (exports.OrderStatusEnum = OrderStatusEnum = {}));
var PaymentStatusEnum;
(function (PaymentStatusEnum) {
    PaymentStatusEnum["pending"] = "pending";
    PaymentStatusEnum["complete"] = "complete";
    PaymentStatusEnum["rejected"] = "rejected";
})(PaymentStatusEnum || (exports.PaymentStatusEnum = PaymentStatusEnum = {}));
// export enum deliveryCharges {
//     PUNJAB = '250',
//     KPK = '350',
//     SINDH = '350',
//     BLOCHISTAN= "350"
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25zdGFudHMvZW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDcEIsK0JBQWEsQ0FBQTtJQUNiLHFDQUFvQixDQUFBO0FBQ3hCLENBQUMsRUFIVyxZQUFZLDRCQUFaLFlBQVksUUFHdkI7QUFDRCxJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDbEIsK0JBQWlCLENBQUE7SUFDakIsbUNBQXFCLENBQUE7QUFDekIsQ0FBQyxFQUhXLFVBQVUsMEJBQVYsVUFBVSxRQUdyQjtBQUVELElBQVksZUFJWDtBQUpELFdBQVksZUFBZTtJQUN2QixzQ0FBbUIsQ0FBQTtJQUNuQix3Q0FBcUIsQ0FBQTtJQUNyQix3Q0FBcUIsQ0FBQTtBQUN6QixDQUFDLEVBSlcsZUFBZSwrQkFBZixlQUFlLFFBSTFCO0FBRUQsSUFBWSxpQkFJWDtBQUpELFdBQVksaUJBQWlCO0lBQ3pCLHdDQUFtQixDQUFBO0lBQ25CLDBDQUFxQixDQUFBO0lBQ3JCLDBDQUFxQixDQUFBO0FBQ3pCLENBQUMsRUFKVyxpQkFBaUIsaUNBQWpCLGlCQUFpQixRQUk1QjtBQUVELGdDQUFnQztBQUNoQyxzQkFBc0I7QUFDdEIsbUJBQW1CO0FBQ25CLHFCQUFxQjtBQUNyQix3QkFBd0I7QUFDeEIsSUFBSSJ9