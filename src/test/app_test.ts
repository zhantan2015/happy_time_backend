import { stdout } from "@zhantan2015/utils";
import app from "../app"
import { it, describe, expect } from "bun:test"
import request from "supertest"

describe("get_index", () => {
    it("should return all products", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
        expect(res.text.length).toBeGreaterThan(0);
    });
});