const express = require("express");

const publicRouter = express.Router();
const app = express();

app.use(express.json());

const log = (req, res, next) =>{
    console.log('I am middleware')
    next()
}

//working as a middleware
publicRouter.param('user', (req, res, next, id) =>{
    req.user = id === '1' ? 'Admin' : 'Anonymous'
    next()
})

//middleware  that returns a function
publicRouter.param((params, options) => (req, res, next, val) =>{
    if(val === options){
        next()
    }else{
        res.sendStatus(403)
    }
})

publicRouter.param('sample', '12')

publicRouter.get("/:user", (req, res) => {
    res.status(200).send({
      success: true,
      message: `you are from ${req.user}`,
    });
    console.log(`you are from ${req.user}`)
  });

publicRouter.get('*', log)
publicRouter.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "You are from public home",
  });
});

publicRouter.get("/login", (req, res) => {
  res.send({
    success: true,
    message: "You are from public login",
  });
});

module.exports = publicRouter;
