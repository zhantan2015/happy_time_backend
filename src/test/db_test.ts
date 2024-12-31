import { expect, describe, it, beforeAll } from "bun:test";
import { stdout, randStr, logger } from "@zhantan2015/utils"
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
        const salt = randStr(20);
        const sql = `INSERT INTO users(uid,username,password,salt) VALUES(?,?,?,?)`;
        const result = await db.execute(sql, [uid, username, password, salt]);
        stdout.info(result);
    })
    it("新增数据 - 密码长度不对", async () => {
        const uid = randStr(20);
        const username = "test_user_2";
        let password = randStr(65);
        const salt = randStr(20);

        const sql = `INSERT INTO users(uid,username,password,salt) VALUES(?,?,?,?)`;
        const result = await db.execute(sql, [uid, username, password, salt]);
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
        let username = "ttt";
        const sql = `delete from users where username = ?`;
        await db.execute(sql, [username]);
        username = 'test_user_2';
        try {
            await db.execute(sql, [username]);
        } catch (err) {
            logger.error(err)
        }
    })
})
