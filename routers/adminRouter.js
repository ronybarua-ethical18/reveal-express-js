const express = require("express");

const adminRouter = express.Router();
const app = express();

app.use(express.json());
adminRouter.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "You are from home",
  });
});

adminRouter.get("/login", (req, res) => {
  res.send({
    success: true,
    message: "You are from login",
  });

  adminRouter
    .route("/user")
    .all((req, res, next) => {
      res.send("All");
      next();
    })
    .get((req, res) => {
      res.send("get");
    })
    .post((req, res) => {
      res.send("post");
    })
    .put((req, res) => {
      res.send("put");
    });
});

module.exports = adminRouter;
