"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Domain = void 0;
var Domain;
(function (Domain) {
    let UserPermission;
    (function (UserPermission) {
        UserPermission[UserPermission["USER"] = 0] = "USER";
        UserPermission[UserPermission["SITEADMIN"] = 1] = "SITEADMIN";
    })(UserPermission = Domain.UserPermission || (Domain.UserPermission = {}));
})(Domain = exports.Domain || (exports.Domain = {}));
