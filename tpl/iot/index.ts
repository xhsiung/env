import consoleStamp = require("console-stamp");
import { Server as WebServer } from "./lib/Server/WebServer";
consoleStamp(console, { pattern: "HH:MM:ss.l" });
const server = new WebServer.Module();
server.Init().then(() => {
    server.Start();
  });