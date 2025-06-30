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

const server = http.createServer(app);

// const _dirname = path.resolve();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
require('./config/Db').connect();
app.use("/user", userRoutes)
app.use("/api/auth", verifyroute)
app.use('/api/post', postRoutes);
app.use("/api/git", githubroute)

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`server Started on ${PORT}`)
})