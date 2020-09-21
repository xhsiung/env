"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const express_session_2 = __importDefault(require("express-session"));
const DataloggerService_1 = require("../../Service/DataloggerService");
const Mongodb_1 = require("../../Repository/Mongodb");
const data_1 = require("./Route/api/data");
const user_1 = require("./Route/api/user");
var Server;
(function (Server) {
    Server.name = "WebServer";
    const MongoStore = connect_mongo_1.default(express_session_1.default);
    const swaggerDefinition = {
        info: {
            title: "連齊Gateway通訊API",
            version: "1.0.0",
            description: "連齊Gateway API 操作說明",
        },
        host: "localhost:3000",
        basePath: "/api",
    };
    const options = {
        swaggerDefinition: swaggerDefinition,
        apis: ["./lib/Domain/*.ts", "./lib/Server/WebServer/Route/api/*.ts"],
    };
    const swaggerSpec = swagger_jsdoc_1.default(options);
    class Module {
        constructor() {
            this.server = undefined;
            this.mainApp = undefined;
            this.isEnable = false;
            this.dataloggerService = new DataloggerService_1.Service.Module();
        }
        async Init() {
            //service start
            await this.dataloggerService.Init();
            //epxress
            this.mainApp = await this.CreateApplication();
            //http|https
            this.server = await this.CreateServer();
            await this.Start();
        }
        async Start() {
            await this.RunTimer();
        }
        async RunTimer() {
            if (this.isEnable) {
                return;
            }
            else {
                await this.dataloggerService.RunTimer();
                return new Promise((resolve, reject) => {
                    const errorFN = (error) => {
                        reject(error);
                    };
                    this.server.addListener("error", errorFN);
                    this.server.listen(Module.port, Module.bindIP, () => {
                        this.isEnable = true;
                        this.server.removeListener("error", errorFN);
                        resolve();
                    });
                });
            }
        }
        async Stop() {
            if (this.isEnable) {
                return new Promise((resolve) => {
                    resolve();
                });
            }
            else {
                return;
            }
        }
        async CreateApplication() {
            const dist = "../../../dist";
            const application = express_1.default();
            application.disable("x-powered-by");
            application.use(morgan_1.default("short"));
            // 設定bodyparser 可解析post的資料
            application.use(body_parser_1.default.json()); // 接收json
            application.use(body_parser_1.default.urlencoded({ extended: true })); // 可接收傳統的body
            application.use(cookie_parser_1.default("gigaenergy_server"));
            // 設定session 使用Mongodb存放
            application.set("trust proxy", 1); // trust first proxy
            application.use(express_session_2.default({
                secret: "NdGateway",
                resave: true,
                store: new MongoStore({
                    url: `${Mongodb_1.Repository.Module.connStr}/${Mongodb_1.Repository.Module.dbName}`,
                }),
                saveUninitialized: true,
                cookie: {
                    secure: false,
                    httpOnly: true,
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 30),
                },
            }));
            // 設定api路由
            application.use(data_1.Route.routeName, data_1.Route.getRoute());
            application.use(user_1.Route.routeName, user_1.Route.getRoute());
            // 設定 swagger
            application.get("/swagger.json", (req, res) => {
                res.setHeader("Content-Type", "application/json");
                res.send(swaggerSpec);
            });
            application.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
            application.use("/", express_1.default.static(path_1.default.join(__dirname, dist)));
            application.use("*", express_1.default.static(path_1.default.join(__dirname, dist)));
            return application;
        }
        async CreateServer() {
            let server;
            server = http_1.default.createServer(this.mainApp);
            return server;
        }
    }
    Module.port = 3000;
    Module.bindIP = "0.0.0.0";
    Server.Module = Module;
})(Server = exports.Server || (exports.Server = {}));
var Test;
(function (Test) {
    if (require.main === module) {
        async function unitTest() {
            const server = new Server.Module();
            await server.Init();
            await server.Start();
        }
        unitTest().then(); //() => process.exit());
    }
})(Test || (Test = {}));
