import { Domain as UserDomain } from "./UserDomain";

export namespace Domain {
  /**
   * @swagger
   * definitions:
   *   ILoginRequest:
   *     properties:
   *       email:
   *         type: string
   *       password:
   *         type: string
   */
  export interface ILoginRequest {
    email: string;
    password: string;
  }
 /**
   * @swagger
   * definitions:
   *   IUserRequest:
   *     required:
   *       - email
   *       - password
   *       - name
   *     properties:
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
   */
  export interface IUserRequest {
    enable: boolean;
    email: string;
    password: string;
    name: string;
    permission: UserDomain.UserPermission;
  }
}
