"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consoleStamp = require("console-stamp");
const WebServer_1 = require("./lib/Server/WebServer");
consoleStamp(console, { pattern: "HH:MM:ss.l" });
const server = new WebServer_1.Server.Module();
server.Init().then(() => {
    server.Start();
});
