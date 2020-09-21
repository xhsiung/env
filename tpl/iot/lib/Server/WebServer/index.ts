import http from "http";
import https from "https";
import path from "path";
import net from "net";
import express from "express";
import expressSession from "express-session";
import bodyParser from "body-parser";
import connectMongo from "connect-mongo";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import session from "express-session";

import * as baseLib from "../..";

import { Service as DataloggerService } from "../../Service/DataloggerService";
import { Repository as MongoRepository } from "../../Repository/Mongodb";

import { Route as dataRoute } from "./Route/api/data";
import { Route as userRoute } from "./Route/api/user";


export namespace Server {
  export const name = "WebServer";
  const MongoStore = connectMongo(expressSession);
  const swaggerDefinition = {
    info: {
      title: "連齊Gateway通訊API",
      version: "1.0.0",
      description: "連齊Gateway API 操作說明",
    },
    host: "localhost:3000", //
    basePath: "/api",
  };
  const options = {
    swaggerDefinition: swaggerDefinition,
    apis: ["./lib/Domain/*.ts", "./lib/Server/WebServer/Route/api/*.ts"],
  };
  const swaggerSpec = swaggerJSDoc(options);

  export class Module implements baseLib.IModule {
    public static port = 3000;
    public static bindIP = "0.0.0.0";
    private server: http.Server | https.Server | undefined = undefined;
    private mainApp: express.Express | undefined = undefined;
    private isEnable: boolean = false;
    private dataloggerService = new DataloggerService.Module();

    public async Init() {
      //service start
      await this.dataloggerService.Init();
      //epxress
      this.mainApp = await this.CreateApplication();
      //http|https
      this.server = await this.CreateServer();
      await this.Start();
    }
    public async Start() {
      await this.RunTimer();
    }
    public async RunTimer() {
      if (this.isEnable) {
        return;
      } else {
        await this.dataloggerService.RunTimer();
        return new Promise<void>((resolve, reject) => {
          const errorFN = (error: Error) => {
            reject(error);
          };
          this.server!.addListener("error", errorFN);
          this.server!.listen(Module.port, Module.bindIP, () => {
            this.isEnable = true;
            this.server!.removeListener("error", errorFN);
            resolve();
          });
        });
      }
    }

    public async Stop() {
      if (this.isEnable) {
        return new Promise<void>((resolve) => {
          resolve();
        });
      } else {
        return;
      }
    }

    private async CreateApplication() {
      const dist = "../../../dist";
      const application = express();
      application.disable("x-powered-by");
      application.use(morgan("short"));
      // 設定bodyparser 可解析post的資料
      application.use(bodyParser.json()); // 接收json
      application.use(bodyParser.urlencoded({ extended: true })); // 可接收傳統的body
      application.use(cookieParser("gigaenergy_server"));
      // 設定session 使用Mongodb存放
      application.set("trust proxy", 1); // trust first proxy
      application.use(
        session({
          secret: "NdGateway",
          resave: true,
          store: new MongoStore({
            url: `${MongoRepository.Module.connStr}/${MongoRepository.Module.dbName}`,
          }),
          saveUninitialized: true,
          cookie: {
            secure: false,
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 30),
          },
        })
      );
      // 設定api路由
      application.use(dataRoute.routeName, dataRoute.getRoute());
      application.use(userRoute.routeName, userRoute.getRoute());

      // 設定 swagger
      application.get("/swagger.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
      });
      application.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec)
      );
      application.use("/", express.static(path.join(__dirname, dist)));
      application.use("*", express.static(path.join(__dirname, dist)));
      return application;
    }
    private async CreateServer() {
      let server: http.Server | https.Server;
      server = http.createServer(this.mainApp);
      return server;
    }
  }
}

namespace Test {
  if (require.main === module) {
    async function unitTest() {
      const server = new Server.Module();
      await server.Init();
      await server.Start();
    }
    unitTest().then(); //() => process.exit());
  }
}
