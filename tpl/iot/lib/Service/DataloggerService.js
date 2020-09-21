"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const NdRepository_1 = require("../Repository/Mongodb/NdRepository");
const iot_gigaenergy_com_tw_1 = require("../Service/Iot/iot.gigaenergy.com.tw");
var Service;
(function (Service) {
    const iotService = new iot_gigaenergy_com_tw_1.Service.Module();
    const ndRepository = new NdRepository_1.Repository.Module();
    class Module {
        constructor() {
            this.isTimer = false;
        }
        async Init() {
            for (const repository of [ndRepository, iotService]) {
                await repository.Init();
            }
            iotService.on(iot_gigaenergy_com_tw_1.Service.MeterUpdated, (data) => {
                this.toDatabase(data);
            });
        }
        async RunTimer() {
            console.info(`啟用資料蒐集服務`);
            //暫停 IOT
            //await iotService.RunTimer();
        }
        toDatabase(data) {
            ndRepository
                .update(data)
                .then(() => {
                console.info(`${data.gatewayId} 已寫入到資料庫`);
            })
                .catch();
        }
    }
    Service.Module = Module;
})(Service = exports.Service || (exports.Service = {}));
