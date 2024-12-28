import { InvalidUsernameOrPassword, UsernameExist } from "../error/userError"
import DB from "../data/db"
import { randStr, stdout } from "@zhantan2015/utils"

export default class UserService {

    static async addUser(username: string, password: string) {

        if (/^\w{5,20}$/.test(username) && password.length == 64) {
            const uid = randStr(20);
            const sql = `insert into users (uid,username,password) values(?,?,?);`
            try {
                const res = await DB.get_db().execute(sql, [uid, username, password])
                return res
            } catch (err: any) {
                if (err["code"] == "ER_DUP_ENTRY")
                    throw new UsernameExist("该用户名已存在");
                else
                    throw err;
            }
        } else
            throw new InvalidUsernameOrPassword("用户名或密码长度不对")
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