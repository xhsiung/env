import * as Base from "../..";

import { Domain as UserDomain } from "../../Domain/UserDomain";

import { Repository as BaseRepository } from ".";

export namespace Repository {
  const collectionName = "users";
  export class Module
    extends BaseRepository.Module<UserDomain.IUser>
    implements Base.IBaseRepository {
    public async Init() {
      return;
    }

    public async update(item: UserDomain.IUser) {
      item._id = item.email;
      await this.updateOne(collectionName, item);
    }
    public async delete(item: UserDomain.IUser) {
      await this.deleteOne(collectionName, item);
    }
    public async list() {
      return await this.fetch(collectionName, {}, { email: 1 }); // 1 ascending , -1 descending
    }
    public async findbyMail(email: string) {
      return await this.fetch(collectionName, { email: email }, { email: 1 });
    }
    public async auth(
      account: string,
      password: string,
      ip: string
    ): Promise<UserDomain.IUser | undefined> {
      const users = await this.fetch(collectionName, { email: account, password: password }, {});
      if (users !== undefined && users.length == 1) {
        // updalte user login info
        users[0].lastLoginDate = new Date();
        users[0].lastLoginIp = ip;
        await this.updateOne(collectionName, users[0]);
        return users[0] as UserDomain.IUser;
      } else {
        return undefined;
      }
    }
  }
}
