import * as base from ".";
export namespace Domain {
  /**
   * @swagger
   * definitions:
   *   IUser:
   *     required:
   *       - email
   *       - password
   *     properties:
   *       _id:
   *         type: string
   *       enable:
   *         type: boolean
   *         description: "帳號啟用"
   *       email:
   *         type: string
   *         description: "登入郵件"
   *       password:
   *         type: string
   *         description: "密碼"
   *       name:
   *         type: string
   *         description: "使用者名稱"
   *       permission:
   *         type: number
   *         description: "權限"
   *         enum:
   *            - "0"
   *            - "1"
   *       lastLoginDate:
   *         type: Date
   *         description: "上次登入日期"
   *       lastLoginIp:
   *         type: string
   *         description: "上次登入IP"
   */
  export interface IUser extends base.IDBBasic {
    enable: boolean;
    email: string;
    password: string;
    name: string;
    permission: UserPermission;
    lastLoginDate?: Date;
    lastLoginIp: string;
  }
  export enum UserPermission {
    USER = 0,
    SITEADMIN = 1,
  }
}
