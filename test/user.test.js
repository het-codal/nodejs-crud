let mongoose = require("mongoose");
let User = require("../Models/User");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
let token = "";

chai.use(chaiHttp);
//Our parent block
describe("Users", () => {
  describe("/GET login token", () => {
    it("it should GET token", (done) => {
      chai
        .request(server)
        .post("/api/login")
        .send({
          email: "hrachh@codal.com",
          password: "=admin123",
        })

        .end((err, res) => {
          res.should.have.status(200);
          token = res.body.data.token;
          done();
        });
    });
  });

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
        .set({ Authorization: `Bearer ${token}` })
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("it should POST a book ", (done) => {
      let book = {
        name: "The Lord of the Rings",
        email: "demo@codal.com",
        password: "demo@123",
      };
      chai
        .request(server)
        .post("/api/users")
        .set({ Authorization: `Bearer ${token}` })
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          // res.body.should.be.a("object");
          // res.body.should.have
          //   .property("message")
          //   .eql("Book successfully added!");
          // res.body.book.should.have.property("title");
          // res.body.book.should.have.property("author");
          // res.body.book.should.have.property("pages");
          // res.body.book.should.have.property("year");
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
          .set({ Authorization: `Bearer ${token}` })
          .send(book)
          .end((err, res) => {
            res.should.have.status(200);
            // res.body.should.be.a("object");
            // res.body.should.have.property("title");
            // res.body.should.have.property("author");
            // res.body.should.have.property("pages");
            // res.body.should.have.property("year");
            // res.body.data.should.have.property("id").eql(book._id);
            done();
          });
      });
    });
  });
});
