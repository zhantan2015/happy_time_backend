import { logger } from "@zhantan2015/utils";

import express from "express";
import cors from 'cors'
import type { Request, Response } from "express"
import userRouter from "./router/userRouter";

const app = express();
const hostname = "0.0.0.0";
const port = 3001;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_: Request, res: Response) => { res.send(`<h1>HelloWorld!</h1>`) });
app.use('/user', userRouter);


app.listen(port, hostname, () => {
    logger.info(`Express app listening on http://${hostname}:${port}`);
})

export default app