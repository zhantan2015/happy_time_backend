import type { Request, Response } from "express";
import { ApiResult, logger, stdout } from "@zhantan2015/utils";
import UserService from "../service/userService";
import { InvalidUsernameOrPassword, UsernameExist } from "../error/userError";

export default class UserController {
    static async get(req: Request, res: Response) {
        const R = new ApiResult()

        try {
            const result: any = await UserService.getUserList();
            R.setData(result).success("获取用户列表成功", (body: any) => res.send(body));
        } catch (err) {
            logger.error(err);
            R.error("服务器错误", (body: any) => res.send(body));
        }
    }

    static async post(req: Request, res: Response) {

        const R = new ApiResult()

        const username = req.body["username"];
        const password = req.body["password"];
        const nickname = req.body["nickname"];
        try {
            await UserService.addUser(username, password);
            R.success("注册成功!", (body: any) => res.send(body));
        } catch (error) {
            if (error instanceof UsernameExist) {
                R.failed("该用户名已存在", (body: any) => res.send(body));
            } else if (error instanceof InvalidUsernameOrPassword) {
                R.failed("无效的用户名或密码", (body: any) => res.send(body));
            }
            else {
                logger.error(error);
                R.error("服务器错误", (body: any) => res.send(body));
                throw error;
            }
        }
    }
}