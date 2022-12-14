
const express = require('express');
const app = express();
const http =require('http').Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});


// const adminRoutes = require('./routes/admin');

// app.use('/admin', adminRoutes);
let users = [];
let messages = [];
let index = 0;
let currentUser = "";


io.on("connection", socket =>{
  console.log("new connection");
socket.emit("loggedIn",{
  users: users.map(s => s.username),
  messages:messages
});
socket.on('newuser', username =>{
  console.log(`${username} has entered the Chat Group`);
  socket.username = username;
  currentUser = username;
  users.push(socket);
  io.emit('userOnline',socket.username);
});
socket.on('msg',data =>{
  console.log(currentUser);
  let message = {
    index:index,
    username:data.username,
    msg:data.msg,
  }
  messages.push(message);
  io.emit('msg',message);
  index++;
});
  
socket.on("disconnect",()=>{
console.log(`${socket.username} has left the chat Group`);
 io.emit("userLeft",socket.username);
 users.splice(users.indexOf(socket),1);
});
});


http.listen(process.env.PORT || 3000,()=>{
console.log("listening on port %s",process.env.PORT || 3000);
});


