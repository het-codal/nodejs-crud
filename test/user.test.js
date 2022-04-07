let mongoose = require("mongoose");
let User = require("../Models/User");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlzRGVsZXRlZCI6ZmFsc2UsInBvc3RzIjpbXSwibmFtZSI6IkhldCBSYWNoaCIsImVtYWlsIjoiaHJhY2hoQGNvZGFsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDloN2pYZVhQT1NIZi5KMzByRWR5NmUveDNXNGVtTXlRbDJtT2JrTk5zQjZ0YnBPZ3FKTUZhIiwiY3JlYXRlZEF0IjoiMjAyMi0wNC0wNlQwNTo0NTo0OC4yMTBaIiwidXBkYXRlZEF0IjoiMjAyMi0wNC0wNlQwNTo0NTo0OC4yMTFaIiwiaWQiOiI2MjRkMjkwY2EwNjRjMTRlMTJjY2RiMTkiLCJ2IjowfSwiaWF0IjoxNjQ5MzM3NjAwLCJleHAiOjE2NDk0MjQwMDB9.ImGBj64mkH8G-IMi1WtgIc_aHuoQ9RUy7FUWb_JPDUE";

chai.use(chaiHttp);
//Our parent block
describe("Users", () => {
  /*
   * Test the /GET route
   */
  describe("/GET users", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(server)
        .get("/api/users")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          done();
        });
    });
  });
  /*
   * Test the /POST route
   */
  describe("/POST users", () => {
    it("it should not POST a users without pages field", (done) => {
      let book = {
        name: "The Lord of the Rings",
        password: "J.R.R. Tolkien",
        email: "demo@codal.com",
      };
      chai
        .request(server)
        .post("/api/users")
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("pages");
          res.body.errors.pages.should.have.property("kind").eql("required");
          done();
        });
    });
    it("it should POST a book ", (done) => {
      let book = {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: 1954,
        pages: 1170,
      };
      chai
        .request(server)
        .post("/api/users")
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Book successfully added!");
          res.body.book.should.have.property("title");
          res.body.book.should.have.property("author");
          res.body.book.should.have.property("pages");
          res.body.book.should.have.property("year");
          done();
        });
    });
  });
  describe("/GET/:id users", () => {
    it("it should GET a users by the given id", (done) => {
      let book = new User({
        name: "The Lord of the Rings",
        password: "J.R.R. Tolkien",
        email: "demo+1@codal.com",
      });
      book.save((err, book) => {
        chai
          .request(server)
          .get("/api/users/" + book.id)
          .send(book)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("title");
            res.body.should.have.property("author");
            res.body.should.have.property("pages");
            res.body.should.have.property("year");
            res.body.should.have.property("_id").eql(book.id);
            done();
          });
      });
    });
  });
});
