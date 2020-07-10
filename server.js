const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "build")))

app.all("*", (req, res) => {
    
    console.log("check", path.join(__dirname, "/build/index.html"))
    res.sendFile(path.join(__dirname, "/build/index.html"));
})

http.createServer(app).listen()

app.listen(PORT).on('listening', (details) => {
    console.log("server listening on: ", PORT);
})