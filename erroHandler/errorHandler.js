const express = require("express");
const app = express();

app.use(express());

app.get("/", (req, res) => {
  res.send(a);
});

//Error handling for synchronous code starts here

//404 error handler
app.use((req, res, next) => {
  next("Requested url was not found");
});

//error handler middleware
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next("Headers already sent");
  } else {
    if (err.message) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("There was an error");
    }
  }
};

app.use(errorHandler);

//Error handling for synchronous code ends here

//Error handling for asynchronous code starts here
app.use('/error', (req, res, next) => {
  setTimeout(() => {
    try {
      console.log(b);
    } catch (err) {
      if (err) {
        next(err);
      }
    }
  }, 1000);
});

//error handler middleware
const errorHandler2 = (err, req, res, next) => {
  if (res.headersSent) {
    next("Headers already sent");
  } else {
    if (err.message) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("There was an error");
    }
  }
};

app.use(errorHandler2);

//Error handling for asynchronous code end here
app.listen(5000, (req, res) => {
  console.log("listening  from port 5000");
});
