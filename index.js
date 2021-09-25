const express = require("express");
const handle = require("./handle");

const app = express();
const admin = express(); //created sub app for handling admin related api

app.use("/admin", admin);

const router = express.Router({
  caseSensitive: true,
});
app.use(router);

admin.get("/dashboard", (req, res) => {
  console.log(admin.mountpath); //root path of admin app
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
  console.log(req.userDetails);
  res.send("Params done");
});

//template engine is related to render method
app.set('view engine', 'ejs')

// for making a common api for few different methods
app.route("/about/mission")
  .get((req, res) => {
    // res.send("listening from get method");
    res.render('pages/about')
  })
  .post((req, res) => {
    res.send("listening from post method");
  })
  .put((req, res) => {
    res.send("listening from put method");
  })
  .delete((req, res) => {
    res.send("listening from delete method");
  });




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
