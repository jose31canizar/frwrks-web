import express from "express";
import morgan from "morgan";
// import router from "./router";
import fs from "fs";
import session from "express-session";
import bodyParser from "body-parser";
import socketio from "socket.io";
const scribble = require("scribbletune");
import path from "path";

// Initialize http server
const app = express();

// Logger that outputs all requests into the console
app.use(morgan("combined"));
// Use v1 as prefix for all API endpoints
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var options = {
  inflate: true,
  limit: "100kb",
  type: "application/octet-stream"
};

// app.use(bodyParser.json());
app.use(bodyParser.raw(options));
app.options("*", function(req, res) {
  "use strict";
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Connection", "keep-alive");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).end();
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

// app.use("/v1", router);

const server = app.listen(3001, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});

// app.post("/scribble", function(req, res) {
//   console.log("received your string");
//   console.log(req.body);
// });

const websocket = socketio(server);

websocket.on("connection", socket => {
  console.log("A client just joined on");
  socket.on("send-notes", pattern => {
    console.log("pattern");
    console.log(pattern);
    let clip = scribble.clip({
      notes: scribble.scale("c", "major", 3), // this works too ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3']
      pattern: pattern.repeat(1)
    });

    console.log(clip);

    scribble.midi(clip, "cscale.mid");

    var filePath = "./cscale.mid";

    var readStream = fs.createReadStream(filePath, "utf8");

    // websocket.sockets.emit('receive-midi', )

    readStream.on("data", chunk => {
      console.log(chunk);
      websocket.sockets.emit("receive-midi", chunk);
    });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
