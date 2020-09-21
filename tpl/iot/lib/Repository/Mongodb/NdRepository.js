"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const _1 = require(".");
var Repository;
(function (Repository) {
    const collectionName = "nddatas";
    class Module extends _1.Repository.Module {
        async Init() {
            return;
        }
        async update(item) {
            item._id = `${item.gatewayId}_${moment_timezone_1.default(item.timestamp).format("YYYYMMDDHHmm")}`;
            await this.updateOne(collectionName, item);
        }
        async delete(item) {
            await this.deleteOne(collectionName, item);
        }
        async list() {
            return await this.fetch(collectionName, {}, { timestamp: -1 }); // 1 ascending , -1 descending
        }
        async findbyGatewayId(gwId) {
            return await this.fetch(collectionName, { gatewayId: gwId }, { timestamp: -1 });
        }
    }
    Repository.Module = Module;
})(Repository = exports.Repository || (exports.Repository = {}));
