import * as baseLib from "../";

import { Domain as NdDomain } from "../Domain/NdDomain";

import { Repository as NdRepository } from "../Repository/Mongodb/NdRepository";
import { Service as IotService } from "../Service/Iot/iot.gigaenergy.com.tw";

export namespace Service {
  const iotService = new IotService.Module();
  const ndRepository = new NdRepository.Module();

  export class Module implements baseLib.IModule {
    public isTimer = false;
    public async Init() {
      for (const repository of [ndRepository, iotService]) {
        await repository.Init();
      }
      iotService.on(IotService.MeterUpdated, (data: NdDomain.INdGateway) => {
        this.toDatabase(data);
      });
    }
    public async RunTimer() {
      console.info(`啟用資料蒐集服務`);
      //暫停 IOT
      //await iotService.RunTimer();
    }
    private toDatabase(data: NdDomain.INdGateway) {
      ndRepository
        .update(data)
        .then(() => {
          console.info(`${data.gatewayId} 已寫入到資料庫`);
        })
        .catch();
    }
  }
}
