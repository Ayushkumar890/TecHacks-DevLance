const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res) => {
  res.send("hello ");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server ready at ${port}`);
});
