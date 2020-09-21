"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const UserDomain_1 = require("../../../../Domain/UserDomain");
const UserRepository_1 = require("../../../../Repository/Mongodb/UserRepository");
/**
 * @swagger
 * tags:
 *   name: User
 *   description: 使用者帳戶
 */
var Route;
(function (Route) {
    Route.routeName = "/api/user";
    function getRoute() {
        const router = express_1.default.Router();
        const userRepository = new UserRepository_1.Repository.Module();
        userRepository.Init().then(() => {
            /**
             * @swagger
             * path:
             *  /user:
             *    get:
             *      summary: 取得自己的帳號資料 (需登入)
             *      tags: [User]
             *      responses:
             *        "200":
             *          content:
             *            application/json:
             *              schema:
             *                $ref: '#/definitions/IUser'
             */
            router.get("/", async (req, res) => {
                try {
                    if (req.session.user) {
                        const user = req.session.user;
                        user.password = ``;
                        res.status(200).send(user);
                    }
                    else {
                        res.status(401).send(`無此操作的權限!`);
                    }
                }
                catch (erro) {
                    res.status(500).send("伺服器發生錯誤!");
                }
            });
            /**
             * @swagger
             * path:
             *  /user/auth:
             *    post:
             *      summary: 登入
             *      tags: [User]
             *      produces:
             *      - "application/json"
             *      parameters:
             *      - in: "body"
             *        name: "body"
             *        required: true
             *        schema:
             *          $ref: "#/definitions/ILoginRequest"
             *      responses:
             *        200:
             *          description: "操作正常無誤"
             *          content:
             *            application/json:
             *              schema:
             *                $ref: '#/definitions/IUser'
             *        401:
             *          description: "使用者帳號或密碼錯誤!"
             *        500:
             *          description: "伺服器發生錯誤!"
             */
            router.post("/auth", async (req, res) => {
                try {
                    let request = req.body;
                    let user = await userRepository.auth(request.email, passwd(request.password), req.ip);
                    if (user) {
                        if (user.enable) {
                            user.password = ``;
                            //設定Session
                            req.session.user = user;
                            res.status(200).send(user);
                        }
                        else {
                            res.status(401).send(`此帳號已被禁用，請聯絡系統管理員。`);
                        }
                    }
                    else {
                        res.status(401).send(`使用者帳號或密碼錯誤!`);
                    }
                }
                catch (erro) {
                    res.status(500).send("伺服器發生錯誤!");
                }
            });
            /**
            * @swagger
            * path:
            *  /user/logout:
            *    get:
            *      summary: 登出
            *      tags: [User]
            *      responses:
            *        "200":
            *          description: "操作正常無誤"
            */
            router.get("/logout", async (req, res) => {
                req.session.destroy((err) => {
                    res.status(200).send("帳戶已登出成功");
                });
            });
            /**
             * @swagger
             * path:
             *  /user/list:
             *    get:
             *      summary: 取得帳戶清單
             *      tags: [User]
             *      responses:
             *        200:
             *          description: "操作正常無誤"
             *          content:
             *            application/json:
             *              schema:
             *                type: "array"
             *                items:
             *                  $ref: '#/definitions/IUser'
             *        401:
             *          description: "無此操作的權限!"
             *        500:
             *          description: "伺服器發生錯誤!"
             */
            router.get("/list", async (req, res) => {
                try {
                    const users = await userRepository.list();
                    for (const u of users) {
                        u.password = ``; // 避免資安疑慮
                    }
                    res.status(200).send(users);
                }
                catch (erro) {
                    res.status(500).send("伺服器發生錯誤!");
                }
            });
            /**
             * @swagger
             * path:
             *  /user/{email}:
             *    get:
             *      summary: 取得帳號資料
             *      tags: [User]
             *      produces:
             *      - "application/json"
             *      parameters:
             *      - name: "email"
             *        in: "path"
             *        required: true
             *        type: "string"
             *      responses:
             *        200:
             *          description: "操作正常無誤"
             *          content:
             *            application/json:
             *              schema:
             *                $ref: '#/definitions/IUserInfo'
             *        404:
             *          description: "找不到用戶!"
             *        401:
             *          description: "無此操作的權限!"
             *        500:
             *          description: "伺服器發生錯誤!"
             */
            router.get("/:email", async (req, res) => {
                try {
                    const user = await userRepository.findbyMail(req.params.email);
                    if (user.length > 0) {
                        user[0].password = ``;
                        res.status(200).send(user[0]);
                    }
                    else {
                        res.status(404).send(`找不到用戶`);
                    }
                }
                catch (erro) {
                    res.status(500).send("伺服器發生錯誤!");
                }
            });
            /**
             * @swagger
             * path:
             *  /user/:
             *    put:
             *      summary: 建立使用者
             *      description: "建立使用者"
             *      tags: [User]
             *      produces:
             *      - "application/json"
             *      parameters:
             *      - in: "body"
             *        name: "body"
             *        required: true
             *        schema:
             *          $ref: "#/definitions/IUserRequest"
             *      responses:
             *        200:
             *          description: "操作正常無誤"
             *        400:
             *          description: "參數錯誤!"
             *        401:
             *          description: "無此操作的權限!"
             *        500:
             *          description: "伺服器發生錯誤!"
             */
            router.put("/", async (req, res, next) => {
                try {
                    const body = req.body;
                    if (body) {
                        // 後台檢查
                        if (body.email === undefined) {
                            res.status(400).send(`帳號不得為空白!`);
                        }
                        if (body.email === null) {
                            res.status(400).send(`帳號不得為空白!`);
                        }
                        if (body.email.trim() === "") {
                            res.status(400).send(`帳號不得為空白!`);
                        }
                        const users = await userRepository.findbyMail(req.params.email);
                        if (users && users.length > 0) {
                            res.status(200).send("用戶帳號已存在!");
                            return;
                        }
                        if (body.password === undefined) {
                            res.status(400).send(`密碼不得為空白!`);
                        }
                        if (body.password === null) {
                            res.status(400).send(`密碼不得為空白!`);
                        }
                        if (body.password.trim() === "") {
                            res.status(400).send(`密碼不得為空白!`);
                        }
                        if (body.name === undefined) {
                            res.status(400).send(`名稱不得為空白!`);
                        }
                        if (body.name === null) {
                            res.status(400).send(`名稱不得為空白!`);
                        }
                        if (body.name.trim() === "") {
                            res.status(400).send(`名稱不得為空白!`);
                        }
                        if (body.enable === undefined) {
                            body.enable = false;
                        }
                        if (body.enable === null) {
                            body.enable = false;
                        }
                        if (body.permission === undefined) {
                            body.permission = UserDomain_1.Domain.UserPermission.USER;
                        }
                        if (body.permission === null) {
                            body.permission = UserDomain_1.Domain.UserPermission.USER;
                        }
                        body.lastLoginIp = ``;
                        body.password = passwd(body.password);
                        await userRepository.update(body);
                        res.status(200).send("使用者已建立");
                    }
                    else {
                        res.status(400).send(`參數錯誤!`);
                    }
                }
                catch (erro) {
                    res.status(500).send("伺服器發生錯誤!");
                }
            });
            /**
             * @swagger
             * path:
             *  /user/{email}:
             *    delete:
             *      summary: 刪除使用者
             *      description: "刪除使用者"
             *      tags: [User]
             *      produces:
             *      - "application/json"
             *      parameters:
             *      - name: "email"
             *        in: "path"
             *        required: true
             *        type: "string"
             *      responses:
             *        200:
             *          description: "操作正常無誤"
             *        400:
             *          description: "參數錯誤!"
             *        401:
             *          description: "無此操作的權限!"
             *        500:
             *          description: "伺服器發生錯誤!"
             */
            router.delete("/:email", async (req, res) => {
                try {
                    if (req.params.email) {
                        const users = await userRepository.findbyMail(req.params.email);
                        if (users && users.length > 0) {
                            await userRepository.delete(users[0]);
                            res.status(200).send("用戶已被刪除");
                        }
                        else {
                            res.status(404).send(`找不到用戶`);
                        }
                    }
                    else {
                        res.status(400).send(`參數錯誤!`);
                    }
                }
                catch (erro) {
                    res.status(500).send("伺服器發生錯誤!");
                }
            });
        });
        return router;
    }
    Route.getRoute = getRoute;
    function passwd(pwd) {
        return crypto_1.default.createHash("sha256").update(pwd).digest("base64");
    }
    Route.passwd = passwd;
    function RSA(str) {
        return crypto_1.default.createHash("RSA-SHA512").update(str).digest("base64");
    }
    Route.RSA = RSA;
})(Route = exports.Route || (exports.Route = {}));
