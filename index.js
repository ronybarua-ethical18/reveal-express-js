const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

app.use(express());

const UPLOAD_FOLDER = "./uploads/";

//define the storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, UPLOAD_FOLDER);
  },
  filename: (req, file, callback) => {
    //file.pdf = file-38743897.pdf

    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    callback(null, fileName + fileExt);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, //10 MB
  },
  fileFilter: (req, file, callback) => {
    if (file.fieldname === "avatar") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Only png, jpg, and jpeg file format are allowed"));
      }
    } else if (file.fieldname === "doc") {
      if (file.mimetype === "application/pdf") {
        callback(null, true);
      } else {
        callback(new Error("Only PDF format is allowed"));
      }
    }
  },
});

//upload a single file

// app.post("/upload", upload.single("avatar"), (req, res) => {
//   res.send("File Saved");
// });

//upload multiple files in multiple field
app.post(
  "/upload",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "doc", maxCount: 2 },
  ]),
  (req, res) => {
    console.log(req.files);
    res.send("File Saved");
  }
);

// handle multer related error

app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("There was a problem with file upload");
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("success");
  }
});

//upload multiple file
// app.post('/upload', upload.array('avatar', 3), (req, res) =>{
//   res.send('File Saved')
// })

//upload multiple files in multiple field
// app.post('/upload', upload.fields([
//   {name: 'avatar', maxCount: 1},
//   {name: 'gallery', maxCount: 2},
// ]), (req, res) =>{
//   res.send('File Saved')
// })

//take form data using multer
// app.post('/upload', upload.none(), (req, res) =>{
//   res.send('File Saved')
// })

app.listen(5000, (req, res) => {
  console.log("listening  from port 5000");
});
