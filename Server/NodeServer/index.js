const express = require('express');
const fs = require('fs');
var options = {
    key: fs.readFileSync('C:/Windows/System32/example.com+5-key.pem'),
    cert: fs.readFileSync('C:/Windows/System32/example.com+5.pem')
  };
  
const app = express();
const https = require('https')
const {Server} = require('socket.io')
const cors = require('cors');

app.use(cors());
const server = https.createServer(options,app);
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
app.get('/',(req,res)=>{
    res.end('hi')
})
let arr=[]
function getLIST(){
    let a2=[]
    for (let i = 0;i<arr.length;i++){
        for (let j = 0;j<arr.length-i-1;j++){
            if (arr[j].score < arr[j + 1].score) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return(arr)

}
io.on('connection', (socket) => {
    let m=getLIST()
    io.emit('New',m);
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('New', (msg) => {
    console.log('message: ' + msg);
    arr.push(msg)
    let m=getLIST()
    io.emit('New',m);
  });
});

server.listen(3002, () => {
  console.log('listening on *:3002');
});