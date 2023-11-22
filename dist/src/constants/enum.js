"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatusEnum = exports.OrderStatusEnum = exports.StatusEnum = exports.UserTypeEnum = void 0;
var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum["Admin"] = "admin";
    UserTypeEnum["Customer"] = "customer";
})(UserTypeEnum = exports.UserTypeEnum || (exports.UserTypeEnum = {}));
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["Active"] = "Active";
    StatusEnum["Inactive"] = "Inactive";
})(StatusEnum = exports.StatusEnum || (exports.StatusEnum = {}));
var OrderStatusEnum;
(function (OrderStatusEnum) {
    OrderStatusEnum["pending"] = "pending";
    OrderStatusEnum["complete"] = "complete";
    OrderStatusEnum["rejected"] = "rejected";
})(OrderStatusEnum = exports.OrderStatusEnum || (exports.OrderStatusEnum = {}));
var PaymentStatusEnum;
(function (PaymentStatusEnum) {
    PaymentStatusEnum["pending"] = "pending";
    PaymentStatusEnum["complete"] = "complete";
    PaymentStatusEnum["rejected"] = "rejected";
})(PaymentStatusEnum = exports.PaymentStatusEnum || (exports.PaymentStatusEnum = {}));
// export enum deliveryCharges {
//     PUNJAB = '250',
//     KPK = '350',
//     SINDH = '350',
//     BLOCHISTAN= "350"
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25zdGFudHMvZW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDcEIsK0JBQWEsQ0FBQTtJQUNiLHFDQUFvQixDQUFBO0FBQ3hCLENBQUMsRUFIVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUd2QjtBQUNELElBQVksVUFHWDtBQUhELFdBQVksVUFBVTtJQUNsQiwrQkFBaUIsQ0FBQTtJQUNqQixtQ0FBcUIsQ0FBQTtBQUN6QixDQUFDLEVBSFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFHckI7QUFFRCxJQUFZLGVBSVg7QUFKRCxXQUFZLGVBQWU7SUFDdkIsc0NBQW1CLENBQUE7SUFDbkIsd0NBQXFCLENBQUE7SUFDckIsd0NBQXFCLENBQUE7QUFDekIsQ0FBQyxFQUpXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBSTFCO0FBRUQsSUFBWSxpQkFJWDtBQUpELFdBQVksaUJBQWlCO0lBQ3pCLHdDQUFtQixDQUFBO0lBQ25CLDBDQUFxQixDQUFBO0lBQ3JCLDBDQUFxQixDQUFBO0FBQ3pCLENBQUMsRUFKVyxpQkFBaUIsR0FBakIseUJBQWlCLEtBQWpCLHlCQUFpQixRQUk1QjtBQUVELGdDQUFnQztBQUNoQyxzQkFBc0I7QUFDdEIsbUJBQW1CO0FBQ25CLHFCQUFxQjtBQUNyQix3QkFBd0I7QUFDeEIsSUFBSSJ9