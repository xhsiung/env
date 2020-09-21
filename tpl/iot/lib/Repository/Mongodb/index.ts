
import mongodb from "mongodb";
import * as base from "../../Domain/index";

export namespace Repository {
  /** 提供一個簡易的 Mongodb Client 1.0.1.0903 Build200903 KuoFu-Wu */
  export abstract class Module<T extends base.IDBBasic> {
    //public static connStr = "mongodb://192.168.130.145:27017";
    public static connStr = "mongodb://localhost:27017";
    public static dbName = "NdDb";
    private client: mongodb.MongoClient | undefined = undefined;

    public abstract async update(data: T): Promise<void>;
    public abstract async delete(data: T): Promise<void>;

    protected async fetch(collectionName: string, find: any, sort: any) {
      const client = await this.getClient();
      return new Promise<T[]>((reslove, reject) => {
        const db = client.db(Module.dbName);
        db.executeDbAdminCommand({
          setParameter: 1,
          internalQueryExecMaxBlockingSortBytes: 335544320, // 避免資料量太大造成錯誤
        }).then(() => {
          db.collection(collectionName)
            .find(find)
            .sort(sort)
            .toArray((err, result) => {
              if (err !== null) {
                reject(err);
              } else {
                reslove(result as T[]);
              }
            });
        });
      });
    }

    //alex fix replace save to updateOne
    protected async updateOne(collectionName: string, data: T) {
      const client = await this.getClient();
      return new Promise<mongodb.UpdateWriteOpResult>((reslove, reject) => {
        //return new Promise((reslove, reject) => {
        const db = client.db(Module.dbName);
        db.collection(collectionName).updateOne({ _id: data._id }, { $set: data }, { upsert: true }, (err, r) => {
          if (err !== null) {
            reject(err);
          } else {
            reslove(r);
          }
        })
      });
    }
    protected async deleteOne(collectionName: string, data: T) {
      const client = await this.getClient();
      return new Promise(
        //return new Promise<mongodb.DeleteWriteOpResultObject>(
        (reslove, reject) => {
          const db = client.db(Module.dbName);
          db.collection(collectionName).deleteOne(
            { _id: data._id },
            (err, r) => {
              if (err !== null) {
                reject(err);
              } else {
                reslove(r);
              }
            }
          );
        }
      );
    }
    private async getClient() {
      return new Promise<mongodb.MongoClient>((reslove, reject) => {
        if (this.client !== undefined) {
          reslove(this.client as mongodb.MongoClient);
        } else {
          mongodb.MongoClient.connect(
            Module.connStr,
            { useNewUrlParser: true },
            (error, client) => {
              if (error !== null) {
                this.client = undefined;
                reject(error);
              } else {
                this.client = client;
                reslove(client);
              }
            }
          );
        }
      });
    }

    //alex fix replace save to updateOne
    protected async updateDoc(dbName: string, collectionName: string, data: T) {
      const client = await this.getClient();
      return new Promise<mongodb.UpdateWriteOpResult>((reslove, reject) => {
        //return new Promise((reslove, reject) => {
        const db = client.db(dbName);
        db.collection(collectionName).updateOne({ _id: data._id }, { $set: data }, { upsert: true }, (err, r) => {
          if (err !== null) {
            reject(err);
          } else {
            reslove(r);
          }
        })
      });
    }

    //alex
    protected async deleteOneDoc(dbName: string, collectionName: string, data: T) {
      const client = await this.getClient();
      return new Promise(
        //return new Promise<mongodb.DeleteWriteOpResultObject>(
        (reslove, reject) => {
          const db = client.db(dbName);
          db.collection(collectionName).deleteOne(
            { _id: data._id },
            (err, r) => {
              if (err !== null) {
                reject(err);
              } else {
                reslove(r);
              }
            }
          );
        }
      );
    }

    //alex add
    protected async fetchDoc(dbName: string, collectionName: string, find: any, options: any) {
      const client = await this.getClient();
      return new Promise<T[]>((reslove, reject) => {
        const db = client.db(dbName);
        db.executeDbAdminCommand({
          setParameter: 1,
          internalQueryExecMaxBlockingSortBytes: 335544320, // 避免資料量太大造成錯誤
        }).then(() => {
          db.collection(collectionName)
            .find(find, options)
            .toArray((err, result) => {
              if (err !== null) {
                reject(err);
              } else {
                reslove(result as T[]);
              }
            });
        });
      });
    }
  }
}
