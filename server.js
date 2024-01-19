const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("astitva ");
});

app.listen(3000,()=>{
    console.log(`server run at port http://localhost:3000`)
})