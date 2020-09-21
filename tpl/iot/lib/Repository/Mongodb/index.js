"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const mongodb_1 = __importDefault(require("mongodb"));
var Repository;
(function (Repository) {
    /** 提供一個簡易的 Mongodb Client 1.0.1.0903 Build200903 KuoFu-Wu */
    class Module {
        constructor() {
            this.client = undefined;
        }
        async fetch(collectionName, find, sort) {
            const client = await this.getClient();
            return new Promise((reslove, reject) => {
                const db = client.db(Module.dbName);
                db.executeDbAdminCommand({
                    setParameter: 1,
                    internalQueryExecMaxBlockingSortBytes: 335544320,
                }).then(() => {
                    db.collection(collectionName)
                        .find(find)
                        .sort(sort)
                        .toArray((err, result) => {
                        if (err !== null) {
                            reject(err);
                        }
                        else {
                            reslove(result);
                        }
                    });
                });
            });
        }
        //alex fix replace save to updateOne
        async updateOne(collectionName, data) {
            const client = await this.getClient();
            return new Promise((reslove, reject) => {
                //return new Promise((reslove, reject) => {
                const db = client.db(Module.dbName);
                db.collection(collectionName).updateOne({ _id: data._id }, { $set: data }, { upsert: true }, (err, r) => {
                    if (err !== null) {
                        reject(err);
                    }
                    else {
                        reslove(r);
                    }
                });
            });
        }
        async deleteOne(collectionName, data) {
            const client = await this.getClient();
            return new Promise(
            //return new Promise<mongodb.DeleteWriteOpResultObject>(
            (reslove, reject) => {
                const db = client.db(Module.dbName);
                db.collection(collectionName).deleteOne({ _id: data._id }, (err, r) => {
                    if (err !== null) {
                        reject(err);
                    }
                    else {
                        reslove(r);
                    }
                });
            });
        }
        async getClient() {
            return new Promise((reslove, reject) => {
                if (this.client !== undefined) {
                    reslove(this.client);
                }
                else {
                    mongodb_1.default.MongoClient.connect(Module.connStr, { useNewUrlParser: true }, (error, client) => {
                        if (error !== null) {
                            this.client = undefined;
                            reject(error);
                        }
                        else {
                            this.client = client;
                            reslove(client);
                        }
                    });
                }
            });
        }
        //alex fix replace save to updateOne
        async updateDoc(dbName, collectionName, data) {
            const client = await this.getClient();
            return new Promise((reslove, reject) => {
                //return new Promise((reslove, reject) => {
                const db = client.db(dbName);
                db.collection(collectionName).updateOne({ _id: data._id }, { $set: data }, { upsert: true }, (err, r) => {
                    if (err !== null) {
                        reject(err);
                    }
                    else {
                        reslove(r);
                    }
                });
            });
        }
        //alex
        async deleteOneDoc(dbName, collectionName, data) {
            const client = await this.getClient();
            return new Promise(
            //return new Promise<mongodb.DeleteWriteOpResultObject>(
            (reslove, reject) => {
                const db = client.db(dbName);
                db.collection(collectionName).deleteOne({ _id: data._id }, (err, r) => {
                    if (err !== null) {
                        reject(err);
                    }
                    else {
                        reslove(r);
                    }
                });
            });
        }
        //alex add
        async fetchDoc(dbName, collectionName, find, options) {
            const client = await this.getClient();
            return new Promise((reslove, reject) => {
                const db = client.db(dbName);
                db.executeDbAdminCommand({
                    setParameter: 1,
                    internalQueryExecMaxBlockingSortBytes: 335544320,
                }).then(() => {
                    db.collection(collectionName)
                        .find(find, options)
                        .toArray((err, result) => {
                        if (err !== null) {
                            reject(err);
                        }
                        else {
                            reslove(result);
                        }
                    });
                });
            });
        }
    }
    //public static connStr = "mongodb://192.168.130.145:27017";
    Module.connStr = "mongodb://localhost:27017";
    Module.dbName = "NdDb";
    Repository.Module = Module;
})(Repository = exports.Repository || (exports.Repository = {}));
