const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const userRoutes = require("./routes/userrouter.js")
const verifyroute = require("./routes/verifyroute.js")
const githubroute = require("./routes/githubroute.js")
const postRoutes = require('./routes/postRoutes');
const path = require("path");


const server = http.createServer(app);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: 'https://techacks-devlance.onrender.com',
  credentials: true
}))
require('./config/Db').connect();
app.use("/user", userRoutes)
app.use("/api/auth", verifyroute)
app.use('/api/post', postRoutes);
app.use("/api/git", githubroute)

const frontendPath = path.join(__dirname, '../client/build');
app.use(express.static(frontendPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send({ error: 'Something went wrong!' })
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server Started on ${PORT}`)
})