import { data } from "@serverless/cloud";
import request from "supertest";
import app from "../../index";

beforeAll(async () => {
  await data.seed("data.json", false);
});

test("should return users", async () => {
  const { body } = await request(app.callback()).get("/users");

  expect(body).toHaveProperty("users");
  expect(body.users.length).toBeGreaterThan(0);
});
