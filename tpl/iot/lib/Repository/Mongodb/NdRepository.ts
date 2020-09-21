import moment from "moment-timezone";
import * as Base from "../..";

import { Domain as NdDomain } from "../../Domain/NdDomain";

import { Repository as BaseRepository } from ".";

export namespace Repository {
  const collectionName = "nddatas";
  export class Module
    extends BaseRepository.Module<NdDomain.INdGateway>
    implements Base.IBaseRepository {
    public async Init() {
      return;
    }
    public async update(item: NdDomain.INdGateway) {
      item._id = `${item.gatewayId}_${moment(item.timestamp).format(
        "YYYYMMDDHHmm"
      )}`;
      await this.updateOne(collectionName, item);
    }
    public async delete(item: NdDomain.INdGateway) {
      await this.deleteOne(collectionName, item);
    }
    public async list() {
      return await this.fetch(collectionName, {}, { timestamp: -1 }); // 1 ascending , -1 descending
    }
    public async findbyGatewayId(gwId: string) {
      return await this.fetch(
        collectionName,
        { gatewayId: gwId },
        { timestamp: -1 }
      );
    }
  }
}
