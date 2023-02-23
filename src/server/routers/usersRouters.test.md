import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDataBase from "../../database/connectDataBase";
import User from "../../database/models/User";
import jwt from "jsonwebtoken";
import { request } from "express";
import { app } from "..";

let mongodbServer: MongoMemoryServer;

beforeAll(async () => {
  mongodbServer = await MongoMemoryServer.create();
  const mongoServerUrl = mongodbServer.getUri();
  await connectDataBase(mongoServerUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongodbServer.stop();
});

describe("Given a POST '/users/login' endpoint", () => {
  const mockUser = {
    username: "Jairo",
    password: "87654321",
    email: "jairo@jairo.com",
  };
  describe("When it receives a request with name 'Jairo', password '87654321' and email 'jairo@jairo.com'", () => {
    test("Then it responds with status 200 and the body of the response has the 'token' property", async () => {
      const user = await User.create(mockUser);
      const jwtPayload = {
        sub: user?._id,
      };
      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

      const expectedStatus = 200;

      const response = await request(app)
        .post("users/login/")
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token", token);
    });
  });
});
