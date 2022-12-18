const express = require("express");
const app = express();
const router = require("./router.js");
const router__bssr = require("./router_bssr.js");
const cookieParser = require("cookie-parser");
const http = require("http");

const cors = require("cors");

let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

//1:Kirish kodlari
app.use(express.static("public"));

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

app.use(router);

//2: Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 30, //for 30 minutes
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  res.locals.member = req.session.member;
  next();
  //console.log("req.locals.member=req.session.member");
});

//3:Views code
app.set("views", "views");
app.set("view engine", "ejs");

//4: Routing code
app.use("/", router);
app.use("/resto", router__bssr);
module.exports = app;

const server = http.createServer(app);
//** SOCKET.IO BACKEND SERVER */
const io = require("socket.io")(server, {
  serveClient: false,
  origins: "*:*",
  transport: ["websocket", "xhr-polling"],
});

let online_users = 0;
io.on("connection", function (socket) {
  online_users++;
  console.log("New user, total:", online_users);
  socket.emit("greetMsg", { text: "welcome" });
  io.emit("infoMsg", { total: online_users });

  socket.on("disconnect", function () {
    online_users--;
    socket.broadcast.emit("infoMsg", { total: online_users });
    console.log("client disconnected, total:", online_users);
  });

  socket.on("createMsg", function (data) {
    console.log("createMsg", data);
    io.emit("newMsg", data);
  });
});

//socket.emit()
//socket.broadcast.emit()
//io.emit()

module.exports = server;
