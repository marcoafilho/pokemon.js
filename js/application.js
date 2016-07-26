import React from 'react'
import ReactDOM from 'react-dom'
import Game from './components/game'
import io from 'socket.io-client'

ReactDOM.render(<Game />, document.getElementById('game'))

const socket = io()
socket.on('challengeAccepted', function (trainer) {
  console.log('challengeAccepted')
  document.dispatchEvent(new window.CustomEvent('challengeAccepted', { detail: trainer }))
})

socket.on('newPokemon', function (pokemon) {
  const opponentNewPokemon = new window.CustomEvent(
    'opponentNewPokemon',
    { detail: pokemon }
  )
  document.dispatchEvent(opponentNewPokemon)
})

document.addEventListener('newPokemon', (event) => {
  socket.emit('newPokemon', event.detail)
})
