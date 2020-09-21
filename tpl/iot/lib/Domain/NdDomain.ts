import * as base from ".";
export namespace Domain {
  /**
   * @swagger
   * definitions:
   *   INdGateway:
   *     properties:
   *       _id:
   *         type: string
   *       timestamp:
   *         type: Date
   *         description: "更新時間"
   *       gatewayId:
   *         type: string
   *         description: "Cube-TB’s PID"
   *       customerId:
   *         type: string
   *         description: "Identity of customer"
   *       meterId:
   *         type: string
   *         description: "Identity of device"
   *       districtId:
   *         type: string
   *         description: "Identity of district"
   *       energyN:
   *         type: number
   *         description: "Measured cumulative amount of electric energy (normal direction), Wh"
   *       energyR:
   *         type: number
   *         description: "Measured cumulative amount of electric energy (reverse directions), Wh"
   */
  export interface INdGateway extends base.IDBBasic {
    timestamp: Date;
    gatewayId: string;
    customerId: string;
    meterId: string;
    districtId: string;
    energyN: number;
    energyR: number;
  }
}
export namespace Parser {
  export function Parse(payload: Buffer): Domain.INdGateway {
    const obj = JSON.parse(payload.toString());
    return {
      _id: ``,
      timestamp: obj.data.timestamp,
      gatewayId: obj.gateway_id,
      customerId: obj.customer_id,
      districtId: obj.district_id,
      meterId: obj.meter_id,
      energyN: obj.data.energy_n,
      energyR: obj.data.energy_r,
    };
  }
}
