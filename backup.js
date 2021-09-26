const express = require("express");
const handle = require("./handle");
const cookieParser = require("cookie-parser");

const app = express();
const admin = express(); //created sub app for handling admin related api

app.use("/admin", admin);
app.use(cookieParser());

const router = express.Router({
  caseSensitive: true,
});
app.use(router);

const logger = (req, res, next) => {
  console.log(
    `${new Date(Date.now()).toDateString()} - ${req.method} - ${
      req.protocol
    } - ${req.originalUrl} - ${req.ip}`
  );
  // next();
  throw new Error ('This is an error')
};

//error handling middleware

const handlingError = (err, req, res, next) =>{
  console.log(err.message)
  res.status(500).send('there was a server side error')
}


const loggerWrapper = (options) =>{
  return (req, res, next) =>{
    if(options.log){
      console.log(
        `${new Date(Date.now()).toDateString()} - ${req.method} - ${
          req.protocol
        } - ${req.originalUrl} - ${req.ip}`)
        next()
    }else{
      throw new Error('Failed to log')
    }
  }
}
// admin.use(logger);
admin.use(loggerWrapper({log: false}))
admin.use(handlingError)

admin.get("/dashboard", (req, res) => {
  console.log(admin.mountpath); //root path of admin app
  console.log(req.baseUrl); //output  /admin
  console.log(req.originalUrl); //output /admin/dashboard
  console.log(req.url); //output /dashboard
  res.send("Welcome to admin dashboard");
});

//allows all type of method to get access api
app.all("/universal", (req, res) => {
  res.send("I am universal route");
});

//enable settings of the App
app.enable("case sensitive routing");
app.disable("case sensitive routing");

app.param("id", (req, res, next, id) => {
  const user = {
    userId: 4,
    name: "Rocky",
  };
  req.userDetails = user;
  next();
});

app.get("/user/:id", (req, res) => {
  // console.log(req.path);
  console.log(req.params.id);
  console.log(req.query);
  console.log(req.cookies);
  console.log(req.secure);
  console.log(req.route);

  // if(req.accepts('html')){
  //   res.render('pages/about')
  // }else{
  //   res.send('Dont accepts html')
  // }
  console.log(req.get("accept"));
  res.send("Params done");
});

//template engine is related to render method
app.set("view engine", "ejs");

app.route("/test", (req, res) => {
  res.send("Hello");
});

const myMiddleWare = (req, res, next) => {
  console.log("I am a middleware");
  next();
};

app.use(myMiddleWare);

// for making a common api for few different methods
app
  .route("/about/mission")
  .get((req, res) => {
    // res.send("listening from get method");
    console.log(res.headersSent);
    res.render("pages/about", {
      name: "Bangladesh",
    });
    console.log(res.headersSent);
  })
  .post((req, res) => {
    // res.json({
    //   name: 'Bangladesh'
    // })
    // res.cookie('name', 'rony', {})
    // res.location('/test')

    // res.redirect('/test')
    res.set("Platform", "Learn with sumit");
    console.log(res.get("Platform"));
    res.end();
  })
  .put((req, res) => {
    res.format({
      "text/plain": () => {
        res.send("Hello");
      },
      "text/html": () => {
        res.render("pages/about", {
          name: "Bangladesh",
        });
      },
      "application/json": () => {
        res.json({
          name: "Bangladesh",
        });
      },
      default: () => {
        res.status(403).send("Not acceptable");
      },
    });
  })
  .delete((req, res) => {
    // res.send("listening from delete method");
  });

//

// app.use(express.json())

// app.use(express.raw())

// app.use(express.text())

// app.use(express.urlencoded())

//make the public folder static
// app.use(express.static(__dirname + '/public/', {
//     index: 'home.html'
// }))

// app.get('/', (req, res) =>{
//     res.send('This is home page')
// })

// app.locals.title = 'My App'

router.get("/", handle); //alternative of app.get

app.post("/", (req, res) => {
  // console.log(req.body.toString()) for raw function
  // console.log(req.body)
  res.send("This is post page");
});

app.listen(5000, (req, res) => {
  console.log("listening to port 5000");
});
