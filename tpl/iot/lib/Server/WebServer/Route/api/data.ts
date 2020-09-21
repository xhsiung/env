import express from "express";

import * as baseDomain from "../../../../Domain/.";
import { Domain as NdDomain } from "../../../../Domain/NdDomain";
import { Domain as WebDomain } from "../../../../Domain/WebDomain";

import { Repository as NdRepository } from "../../../../Repository/Mongodb/NdRepository";
/**
 * @swagger
 * tags:
 *   name: Data
 *   description: 連齊電錶資料
 */
export namespace Route {
  export const routeName = "/api/data";
  export function getRoute() {
    const router = express.Router();
    const ndRepository = new NdRepository.Module();
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
        } catch (erro) {
          res.status(500).send("伺服器發生錯誤!");
        }
      });
    });
    return router;
  }
}
