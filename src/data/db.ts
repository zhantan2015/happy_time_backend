import mysql from "mysql2"
import { logger, stdout } from "@zhantan2015/utils"
import type { Pool, PoolOptions } from "mysql2"
import _config from "../config.json"

export default class DB {

    pool?: Pool;
    static ins: DB;

    constructor(db_config: any) {
        this.pool = mysql.createPool(db_config);
    }

    static get_db(config?: PoolOptions) {
        if (!config) {
            config = _config["db_config"]
            if (!DB.ins) {
                DB.ins = new DB(config);
            }
            return DB.ins;
        } else {
            return new DB(config);
        }
    }

    async execute(sql: string, values?: [...any]) {
        values = values?.filter(i => i);
        logger.info(sql, values);
        return await new Promise((resolve, reject) => {
            this.pool!.execute(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
}