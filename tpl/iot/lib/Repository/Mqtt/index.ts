import * as mqtt from "mqtt";
import * as events from "events";
export namespace Repository {
  export type IMQTTOption = mqtt.IClientOptions;
  export const message = Symbol("message");
  export const error = Symbol("error");
  export const packetsend = Symbol("packetsend");
  export const packetreceive = Symbol("packetreceive");
  export const connect = Symbol("connect");
  /** 提供一個簡單的MQTT客戶端 1.0.0 Build191215 KuoFu Wu */
  export class Module extends events.EventEmitter {
    public connected = false;
    private client: mqtt.Client | undefined;
    private subscribeTopics: string[] = [];
    constructor() {
      super();
    }
    public async connect(host: string, option?: IMQTTOption) {
      return new Promise<boolean>((reslove) => {
        this.client = mqtt.connect(host, option);
        this.client.on(`error`, (erro: Error) => {
          this.emit(error, erro);
        });
        this.client.on(`message`, (topic: string, payload: Buffer) => {
          this.connected = true;
          this.emit(message, topic, payload);
        });
        this.client.on(`connect`, () => {
          this.emit(connect);
          this.connected = true;
          reslove(true);
        });
        this.client.on(`packetsend`, (packet: mqtt.Packet) => {
          this.connected = true;
          this.emit(packetsend, packet.length);
        });
        this.client.on(`packetreceive`, (packet: mqtt.Packet) => {
          this.connected = true;
          this.emit(packetreceive, packet.length);
        });
      });
    }
    public async Close() {
      if (this.client !== undefined) {
        this.client.removeAllListeners();
        if (this.subscribeTopics !== undefined) {
          this.client.unsubscribe(this.subscribeTopics);
          this.subscribeTopics = [];
        }
      }
    }
    public async subscribe(topic: string[], qos: 0 | 1 | 2) {
      return new Promise<boolean>((reslove) => {
        if (this.client !== undefined) {
          this.subscribeTopics = topic;
          this.client.subscribe(
            topic,
            {
              qos,
            },
            (erro: Error) => {
              if (erro) {
                reslove(false);
              }
              reslove(true);
            }
          );
        }
      });
    }
    public async publish(
      topic: string,
      payload: string | Buffer,
      qos: 0 | 1 | 2
    ) {
      return new Promise<boolean>((reslove) => {
        if (this.client !== undefined) {
          this.client.publish(
            topic,
            payload,
            {
              qos,
            },
            (erro?: Error) => {
              if (erro) {
                reslove(false);
              }
              reslove(true);
            }
          );
        }
      });
    }
  }
}
