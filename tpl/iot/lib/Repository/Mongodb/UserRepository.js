"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const _1 = require(".");
var Repository;
(function (Repository) {
    const collectionName = "users";
    class Module extends _1.Repository.Module {
        async Init() {
            return;
        }
        async update(item) {
            item._id = item.email;
            await this.updateOne(collectionName, item);
        }
        async delete(item) {
            await this.deleteOne(collectionName, item);
        }
        async list() {
            return await this.fetch(collectionName, {}, { email: 1 }); // 1 ascending , -1 descending
        }
        async findbyMail(email) {
            return await this.fetch(collectionName, { email: email }, { email: 1 });
        }
        async auth(account, password, ip) {
            const users = await this.fetch(collectionName, { email: account, password: password }, {});
            if (users !== undefined && users.length == 1) {
                // updalte user login info
                users[0].lastLoginDate = new Date();
                users[0].lastLoginIp = ip;
                await this.updateOne(collectionName, users[0]);
                return users[0];
            }
            else {
                return undefined;
            }
        }
    }
    Repository.Module = Module;
})(Repository = exports.Repository || (exports.Repository = {}));
