import { InvalidUsernameOrPassword, UsernameExist, InvalidNickname } from "../error/userError"
import DB from "../data/db"
import { randStr, stdout } from "@zhantan2015/utils"
import { password } from "bun";

export default class UserService {

    static async addUser(username: string, password: string, nickname?: string, avatar?: string) {

        if (/^\w{5,20}$/.test(username) && password.length == 64) {
            if (nickname && !/^\w{1,20}$/.test(nickname)) {
                throw new InvalidNickname("无效昵称");
            }
            const uid = randStr(20);
            const salt = randStr(20);
            password = password + salt
            const hash = new Bun.CryptoHasher("sha256");
            hash.update(password);
            password = hash.digest("hex");
            const sql = `insert into users (uid,username,password,${nickname ? ",nickname" : ""}${avatar ? ",avatar" : ""}) values(?,?,?${nickname ? ",?" : ""}${avatar ? ",?" : ""});`
            try {
                const res = await DB.get_db().execute(sql, [uid, username, password, nickname, avatar])
                return res
            } catch (err: any) {
                if (err["code"] == "ER_DUP_ENTRY")
                    throw new UsernameExist("该用户名已存在");
                else
                    throw err;
            }
        } else
            throw new InvalidUsernameOrPassword("用户名或密码长度不对");
    }

    static async getUserList() {
        const sql = `select * from users;`;
        try {
            const res = await DB.get_db().execute(sql)
            return res
        } catch (err: any) {
            throw err;
        }
    }
}