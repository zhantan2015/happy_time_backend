import app from '../app'
import request from "supertest"
import { describe, it, expect, afterAll, beforeAll } from "bun:test"
import DB from '../data/db';
import { stdout } from '@zhantan2015/utils';
import axios from 'axios';

describe("测试用户路由", () => {
    it("注册成功", async () => {
        const username = "test_router_name";
        const password = "t".repeat(64);
        const res_json = JSON.parse((await request(app).post("/user").send({ username, password })).text)
        stdout.debug(res_json)
        expect(res_json["type"]).toBe("success")
    });
    it("用户名不合法", async () => {
        const username = "test";
        const password = "t".repeat(64);
        const res_json = JSON.parse((await request(app).post("/user").send({ username, password })).text)
        stdout.debug(res_json)
        expect(res_json["msg"]).toBe("无效的用户名或密码")
    });
    it("密码不合法", async () => {
        const username = "test_router_name";
        const password = "t".repeat(60);
        const res_json = JSON.parse((await request(app).post("/user").send({ username, password })).text)
        stdout.debug(res_json)
        expect(res_json["msg"]).toBe("无效的用户名或密码")
    });
    it("存在同名用户", async () => {
        const username = "test_router_name";
        const password = "t".repeat(64);
        const res_json = JSON.parse((await request(app).post("/user").send({ username, password })).text)
        stdout.debug(res_json)
        expect(res_json["msg"]).toBe("该用户名已存在")
    });
    it("获取所有用户", async () => {
        const response = await request(app).get("/user");
        const res_json: any = JSON.parse(response.text)
        stdout.debug(res_json)
        expect(res_json["data"]).toBeObject();
    })

    afterAll(async () => {
        await DB.get_db().execute("delete from users where username = 'test_router_name'");
    })
})