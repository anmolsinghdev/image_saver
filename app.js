//importing Core Module
const path = require("path");

//importing Some NPM Module
const express = require("express");
const multer = require("multer");

//importing the UploadFile Function From S3
const uploadFile = require("./s3");

//Make A Express Instance In A App Function
const app = express();

//Assigning A PORT Variable
const port = 3000;

//using BodyPaser For Getting the Input Fields Value
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

//setup the view Engine
// app.set("view engine", "ejs");

// Create A Upload Variable Which Includes And Multer.storage.filename
const upload = multer({
  storage: multer.diskStorage({
    //assign the Destination Where We Want to Store
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    //Assign the filename
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
});

//Create constant Variable  In Which Getting Multiple Input Fields Value
const multipleuploads = upload.fields([
  {
    //Assign the Extact Value What You Give the Input Field Attribute "name:"
    name: "AvatarImage", //assign the name
    maxCount: 1,
  },
  {
    name: "Bannerimage",
    maxCount: 1,
  },
]);

//Here We using the Post Method To Post Images What We Get From the '/' path
app.post("/upload", multipleuploads, async (req, res) => {
  //assign the files into a File Variable
  const file = req.files;
  //console the files What We Want to Send TO AWS
  console.log(file);
  // res.statusCode = 304; //it used to Redirect homePath "/"
  // res.redirect("/"); //giving the path '/'
  await uploadFile(file); //calling the uploadFile Function  & and Pass file as a Arugement
});

// Setting The Home Path
// app.get("/", (req, res) => {
//   res.send("hello");
// res.render("index"); //Using the Index From views Folder Index.ejs
// });

//Creating A server With A PORT
app.listen(port, () => console.log(` app listening on port ${port}!`));
