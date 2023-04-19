import moment from "moment";
import mongoose from "mongoose";
import supertest from "supertest";

import app from "../src/application/app";
import Classes from "../src/domain/model/classes";
import Database from "../src/infra/config/database";

const request = supertest(app);
let arrClasses: Classes[] = [];

describe("Database testing", () => {
  it("Should connect to the database", () => {
    const database = new Database();
    database.startService().then(() => {
      expect(mongoose.connection.readyState).toBe(1);
    });
  });
});

describe("Classes API testing", () => {
  it("Should save a class to database", async (done) => {
    const res = await request
      .post("/v1/classes")
      .send({
        name: "class",
        start_date: new Date().toString(),
        end_date: moment().add(10, "days"),
        capacity: 10,
      })
      .expect(201);

    expect(res.statusCode).toEqual(201);
    done();
  });

  it("Should search classes from database", async (done) => {
    const res = await request.get("/v1/classes").query({
      start_date: new Date().toString(),
      end_date: moment().add(10, "days").toString(),
    });

    arrClasses = res.body;

    expect(res.statusCode).toEqual(200);
    done();
  });

  it("Should get a class from database", async (done) => {
    const res = await request.get(`/v1/classes/${arrClasses[0]._id}`);

    expect(res.statusCode).toEqual(200);
    done();
  });

  it("Should update a class from database", async (done) => {
    const res = await request.put(`/v1/classes/${arrClasses[0]._id}`).send({
      name: "new class",
      class_date: new Date().toString(),
      capacity: 100,
    });

    expect(res.statusCode).toEqual(200);
    done();
  });

  it("Should delete a class from database", async (done) => {
    const res = await request.delete(`/v1/classes/${arrClasses[0]._id}`);

    expect(res.statusCode).toEqual(200);
    done();
  });
});

describe("Bookings API testing", () => {
  it("Should save a booking to database", async (done) => {
    const res = await request
      .post("/v1/bookings")
      .send({
        id_classes: arrClasses[1]._id,
        member: "member 0000",
      })
      .expect(201);

    expect(res.statusCode).toEqual(201);
    done();
  });

  it("Should search bookings from database", async (done) => {
    const res = await request.get("/v1/bookings").query({
      member: "member 0000",
    });

    arrClasses = res.body;

    expect(res.statusCode).toEqual(200);
    done();
  });

  it("Should get a booking from database", async (done) => {
    const res = await request.get(
      `/v1/bookings/${arrClasses[0].bookings[0]._id}`
    );

    expect(res.statusCode).toEqual(200);
    done();
  });

  it("Should update a class from database", async (done) => {
    const res = await request
      .put(`/v1/bookings/${arrClasses[0].bookings[0]._id}`)
      .send({
        member: "member 1111",
      });

    expect(res.statusCode).toEqual(200);
    done();
  });

  it("Should delete a class from database", async (done) => {
    const res = await request.delete(
      `/v1/bookings/${arrClasses[0].bookings[0]._id}`
    );

    expect(res.statusCode).toEqual(200);
    done();
  });
});
