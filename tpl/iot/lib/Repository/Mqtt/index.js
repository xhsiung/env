"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const mqtt = __importStar(require("mqtt"));
const events = __importStar(require("events"));
var Repository;
(function (Repository) {
    Repository.message = Symbol("message");
    Repository.error = Symbol("error");
    Repository.packetsend = Symbol("packetsend");
    Repository.packetreceive = Symbol("packetreceive");
    Repository.connect = Symbol("connect");
    /** 提供一個簡單的MQTT客戶端 1.0.0 Build191215 KuoFu Wu */
    class Module extends events.EventEmitter {
        constructor() {
            super();
            this.connected = false;
            this.subscribeTopics = [];
        }
        async connect(host, option) {
            return new Promise((reslove) => {
                this.client = mqtt.connect(host, option);
                this.client.on(`error`, (erro) => {
                    this.emit(Repository.error, erro);
                });
                this.client.on(`message`, (topic, payload) => {
                    this.connected = true;
                    this.emit(Repository.message, topic, payload);
                });
                this.client.on(`connect`, () => {
                    this.emit(Repository.connect);
                    this.connected = true;
                    reslove(true);
                });
                this.client.on(`packetsend`, (packet) => {
                    this.connected = true;
                    this.emit(Repository.packetsend, packet.length);
                });
                this.client.on(`packetreceive`, (packet) => {
                    this.connected = true;
                    this.emit(Repository.packetreceive, packet.length);
                });
            });
        }
        async Close() {
            if (this.client !== undefined) {
                this.client.removeAllListeners();
                if (this.subscribeTopics !== undefined) {
                    this.client.unsubscribe(this.subscribeTopics);
                    this.subscribeTopics = [];
                }
            }
        }
        async subscribe(topic, qos) {
            return new Promise((reslove) => {
                if (this.client !== undefined) {
                    this.subscribeTopics = topic;
                    this.client.subscribe(topic, {
                        qos,
                    }, (erro) => {
                        if (erro) {
                            reslove(false);
                        }
                        reslove(true);
                    });
                }
            });
        }
        async publish(topic, payload, qos) {
            return new Promise((reslove) => {
                if (this.client !== undefined) {
                    this.client.publish(topic, payload, {
                        qos,
                    }, (erro) => {
                        if (erro) {
                            reslove(false);
                        }
                        reslove(true);
                    });
                }
            });
        }
    }
    Repository.Module = Module;
})(Repository = exports.Repository || (exports.Repository = {}));
