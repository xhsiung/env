"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.mqttCommand = exports.iotName = exports.mqttID = void 0;
const uuid_1 = __importDefault(require("uuid"));
const events_1 = __importDefault(require("events"));
const NdDomain_1 = require("../../Domain/NdDomain");
const Mqtt_1 = require("../../Repository/Mqtt");
exports.mqttID = "nd-datalogger";
exports.iotName = "ndgateway";
var mqttCommand;
(function (mqttCommand) {
    mqttCommand.getNd = () => `${exports.iotName}/+/Meter`;
})(mqttCommand = exports.mqttCommand || (exports.mqttCommand = {}));
var Service;
(function (Service) {
    Service.MeterUpdated = Symbol("MeterUpdated");
    class Module extends events_1.default.EventEmitter {
        constructor() {
            super();
            this.sysId = uuid_1.default.v4();
            this.iotClient = new Mqtt_1.Repository.Module();
        }
        async Init() {
            return;
        }
        async RunTimer() {
            await this.iotClient.connect(`mqtt://iot.gigaenergy.com.tw`, {
                username: `iotdev`,
                password: `gigaiotkuofu0121`,
                clientId: `${exports.mqttID}-${this.sysId}`,
            });
            this.iotClient.on(Mqtt_1.Repository.message, async (topic, payload) => {
                try {
                    this.parseTopic(topic, payload);
                }
                catch (erro) { }
            });
            this.iotClient.on(Mqtt_1.Repository.connect, () => {
                console.log(`Iot Server Connected`);
            });
            await this.iotClient.subscribe([mqttCommand.getNd()], 0);
        }
        parseTopic(topic, payload) {
            const deparseTopic = topic.split("/");
            if (deparseTopic[0] === exports.iotName) {
                const data = NdDomain_1.Parser.Parse(payload);
                this.emit(Service.MeterUpdated, data);
            }
        }
    }
    Service.Module = Module;
})(Service = exports.Service || (exports.Service = {}));
var Test;
(function (Test) {
    if (require.main === module) {
        async function unitTest() {
            const d = new Service.Module();
            console.log(`start`);
            await d.Init();
            await d.RunTimer();
        }
        unitTest()
            .then(() => {
            //process.exit();
        })
            .catch((error) => {
            console.error(error);
        });
    }
})(Test || (Test = {}));
