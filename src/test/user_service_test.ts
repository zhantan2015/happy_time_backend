import UserService from "../service/userService";
import { randStr, stdout } from "@zhantan2015/utils";
import { describe, it, expect, afterAll, beforeAll } from "bun:test"
import { InvalidUsernameOrPassword, UsernameExist } from "../error/userError";
import DB from "../data/db";

describe("用户模块测试", () => {
    beforeAll(async () => {
        const uid = randStr(20);
        const username = "test_user"
        const password = "t".repeat(64)
        await DB.get_db().execute("insert into users(uid,username,password) values(?,?,?)", [uid, username, password]);
    });
    it("注册-用户名或密码长度不对", async () => {
        const username = "12345"
        const password = randStr(62)
        expect(async () => {
            try {
                const res = await UserService.addUser(username, password)
            } catch (err) {
                throw err
            }
        }).toThrowError(InvalidUsernameOrPassword);
    })

    it("注册-注册成功", async () => {
        const username = "tttttt"
        const password = "t".repeat(64)
        expect(async () => await UserService.addUser(username, password))
    })

    it("注册-已存在相同用户名", async () => {
        const username = "test_user"
        const password = "t".repeat(64)
        expect(async () => {
            try {
                const res = await UserService.addUser(username, password)
            } catch (err) {
                throw err
            }
        }).toThrowError(UsernameExist)

    })
    afterAll(async () => {
        await DB.get_db().execute("delete from users where username = ?;", ["tttttt"])
        await DB.get_db().execute("delete from users where username = ?;", ["test_user"])
    })
})
