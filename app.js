const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require("body-parser");
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");



//landing page
app.get("/", function(req, res){
    res.render("register");
});



//register users
app.post("/", function(req, res){
    console.log(req.body.username);
    res.render("index", {username: req.body.username});
});



io.on('connection', function(socket) {
    console.log('a user connected');
    var eventArray = ["play", "pause", "seeked", "ended"];
    eventArray.forEach(function(evnt){
        console.log('a user connected');
        socket.on(evnt, function(msg){
        console.log(msg);
        });
    });
});


let port = process.env.PORT || 3000;

server.listen(port, process.env.IP, function(){
    console.log("App is running on port " + port);
});