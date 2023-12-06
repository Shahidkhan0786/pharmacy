"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatusEnum = exports.OrderStatusEnum = exports.PaymentSourceEnum = exports.StatusEnum = exports.UserTypeEnum = void 0;
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
var PaymentSourceEnum;
(function (PaymentSourceEnum) {
    PaymentSourceEnum["CASH"] = "CASH";
    PaymentSourceEnum["JAZZCASH"] = "JAZZCASH";
    PaymentSourceEnum["EASYPASA"] = "EASYPASA";
    PaymentSourceEnum["BANK"] = "BANK";
})(PaymentSourceEnum = exports.PaymentSourceEnum || (exports.PaymentSourceEnum = {}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25zdGFudHMvZW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDdEIsK0JBQWUsQ0FBQTtJQUNmLHFDQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFIVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUd2QjtBQUNELElBQVksVUFHWDtBQUhELFdBQVksVUFBVTtJQUNwQiwrQkFBaUIsQ0FBQTtJQUNqQixtQ0FBcUIsQ0FBQTtBQUN2QixDQUFDLEVBSFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFHckI7QUFFRCxJQUFZLGlCQUtYO0FBTEQsV0FBWSxpQkFBaUI7SUFDM0Isa0NBQWEsQ0FBQTtJQUNiLDBDQUFxQixDQUFBO0lBQ3JCLDBDQUFxQixDQUFBO0lBQ3JCLGtDQUFhLENBQUE7QUFDZixDQUFDLEVBTFcsaUJBQWlCLEdBQWpCLHlCQUFpQixLQUFqQix5QkFBaUIsUUFLNUI7QUFFRCxJQUFZLGVBSVg7QUFKRCxXQUFZLGVBQWU7SUFDekIsc0NBQW1CLENBQUE7SUFDbkIsd0NBQXFCLENBQUE7SUFDckIsd0NBQXFCLENBQUE7QUFDdkIsQ0FBQyxFQUpXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBSTFCO0FBRUQsSUFBWSxpQkFJWDtBQUpELFdBQVksaUJBQWlCO0lBQzNCLHdDQUFtQixDQUFBO0lBQ25CLDBDQUFxQixDQUFBO0lBQ3JCLDBDQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFKVyxpQkFBaUIsR0FBakIseUJBQWlCLEtBQWpCLHlCQUFpQixRQUk1QjtBQUVELGdDQUFnQztBQUNoQyxzQkFBc0I7QUFDdEIsbUJBQW1CO0FBQ25CLHFCQUFxQjtBQUNyQix3QkFBd0I7QUFDeEIsSUFBSSJ9