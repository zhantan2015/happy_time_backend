import { expect, describe, it, beforeAll } from "bun:test";
import { stdout, randStr } from "@zhantan2015/utils"
import DB from "../data/db"

describe("数据库测试", () => {

    let db: DB
    beforeAll(async () => {
        db = DB.get_db();
    })

    it("新增数据", async () => {
        const uid = randStr(20);
        const username = "test_user";
        const password = randStr(64);
        const sql = `INSERT INTO users(uid,username,password) VALUES(?,?,?)`;
        const result = await db.execute(sql, [uid, username, password]);
        stdout.info(result);
    })

    it("修改数据", async () => {
        const username = "test_user";
        const sql = `update users set username = 'ttt' where username = ?`;
        const result = await db.execute(sql, [username])
        stdout.info(result);
    })

    it("查询数据", async () => {
        const username = "ttt";
        const sql = `select username from users where username = ?`;
        const result = await db.execute(sql, [username]);
        stdout.info(result);
    })

    it("删除数据", async () => {
        const username = "ttt";
        const sql = `delete from users where username = ?`;
        const result = await db.execute(sql, [username]);
        stdout.info(result);
    })
})
