"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const express_1 = __importDefault(require("express"));
const NdRepository_1 = require("../../../../Repository/Mongodb/NdRepository");
/**
 * @swagger
 * tags:
 *   name: Data
 *   description: 連齊電錶資料
 */
var Route;
(function (Route) {
    Route.routeName = "/api/data";
    function getRoute() {
        const router = express_1.default.Router();
        const ndRepository = new NdRepository_1.Repository.Module();
        ndRepository.Init().then(() => {
            /**
             * @swagger
             * path:
             *  /data:
             *    get:
             *      summary: 取得電錶最新資料
             *      tags: [Data]
             *      responses:
             *        "200":
             *          content:
             *            application/json:
             *              schema:
             *                $ref: '#/definitions/INdGateway'
             */
            router.get("/", async (req, res) => {
                try {
                    const datas = await ndRepository.list();
                    res.status(200).send(datas);
                }
                catch (erro) {
                    res.status(500).send("伺服器發生錯誤!");
                }
            });
        });
        return router;
    }
    Route.getRoute = getRoute;
})(Route = exports.Route || (exports.Route = {}));
