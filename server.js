const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static(__dirname + "/Public"));
app.set("views", __dirname + "/views/");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


//configuring database
const port = "http://localhost:3000"

app.use("/",(req,res)=>{
  res.render("index");
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server ready at ${port}`);
});
