import uuid from "uuid";
import events from "events";

import { Parser as NdParser } from "../../Domain/NdDomain";

import { Repository as MqttRepository } from "../../Repository/Mqtt";

import * as baseLib from "../..";

export const mqttID = "nd-datalogger";
export const iotName = "ndgateway";

export namespace mqttCommand {
  export const getNd = () => `${iotName}/+/Meter`;
}

export namespace Service {
  export const MeterUpdated = Symbol("MeterUpdated");
  export class Module
    extends events.EventEmitter
    implements baseLib.IModule {
    private sysId = uuid.v4();
    private iotClient = new MqttRepository.Module();
    public constructor() {
      super();
    }
    public async Init() {
      return;
    }
    public async RunTimer() {
      await this.iotClient.connect(`mqtt://iot.gigaenergy.com.tw`, {
        username: `iotdev`,
        password: `gigaiotkuofu0121`,
        clientId: `${mqttID}-${this.sysId}`, // 使用mqttID+序號當作clientId
      });

      this.iotClient.on(
        MqttRepository.message,
        async (topic: string, payload: Buffer) => {
          try {
            this.parseTopic(topic, payload);
          } catch (erro) {}
        }
      );

      this.iotClient.on(MqttRepository.connect, () => {
        console.log(`Iot Server Connected`);
      });
      await this.iotClient.subscribe([mqttCommand.getNd()], 0);
    }

    private parseTopic(topic: string, payload: Buffer) {
      const deparseTopic = topic.split("/");
      if (deparseTopic[0] === iotName) {
        const data = NdParser.Parse(payload);
        this.emit(MeterUpdated, data);
      }
    }
  }
}
namespace Test {
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
      .catch((error: Error) => {
        console.error(error);
      });
  }
}
