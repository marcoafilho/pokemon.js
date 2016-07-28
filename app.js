const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(__dirname))

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html')
})

let playersConnected = 0
io.on('connection', socket => {
  let roomName = 'arena #' + Math.floor(playersConnected / 2)

  playersConnected += 1
  socket.join(roomName)
  if (io.sockets.adapter.rooms[roomName].length > 1) {
    socket.emit('challengeAccepted', {})
  }
  socket.broadcast.to(roomName).emit('challengeAccepted', {})

  socket.on('newPokemon', (pokemon) => {
    socket.broadcast.emit('newPokemon', pokemon)
  })
})

http.listen(3000)
