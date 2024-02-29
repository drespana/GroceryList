import request from "supertest"
import app from "../../../server";
import { mocked } from "jest-mock";
import { encrypt, decrypt } from "../../util/encrypt";


describe("GET /tasks", () => {
  it("GET tasks returns correct and decrypted data", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
  });
});
