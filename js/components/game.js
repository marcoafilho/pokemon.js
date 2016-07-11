import { db } from '../db'
import Pokemon from '../models/pokemon'
import React from 'react'

import PokemonSelector from './pokemon_selector'
import Trainer from './trainer'
import Pokedex from './pokedex'
import Log from './log'
import StartBattleButton from './start_battle_button'
import OpponentPokemon from './opponent_pokemon'
import PlayerPokemon from './player_pokemon'
import BattleActions from './battle_actions'

var samplePokemon = function () {
  return db.pokemons[Math.floor(Math.random() * db.pokemons.length)]
}

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      phase: 'selection',
      opponentAvatar: db.trainers[Math.floor(Math.random() * db.trainers.length)].replace(/\W+/g, '-').toLowerCase(),
      playerPokemons: [],
      opponentPokemons: [],
      activePokemon: null,
      message: '',
      currentPlayerPokemon: null,
      currentOpponentPokemon: null,
      playerPokemonIndex: 0,
      opponentPokemonIndex: 0
    }

    this.addPokemon = this.addPokemon.bind(this)
    this.showInPokedex = this.showInPokedex.bind(this)
    this.log = this.log.bind(this)
    this.setPhase = this.setPhase.bind(this)
    this.damagePokemon = this.damagePokemon.bind(this)
  }

  generateRandomPokemons (list) {
    let index
    let pokemonName
    let pokemon

    for (index = list.length; index < 6; index++) {
      pokemonName = samplePokemon()
      pokemon = new Pokemon({ id: index + 1, name: pokemonName })
      list.push(pokemon)
    }
  }

  addPokemon (pokemonName) {
    let playerPokemons = this.state.playerPokemons
    let pokemon

    if (db.pokemons.indexOf(pokemonName) <= -1 || playerPokemons.length >= 6) {
      return false
    }
    pokemon = new Pokemon({ id: playerPokemons.length + 1, name: pokemonName })
    playerPokemons.push(pokemon)
    this.setState({ playerPokemons: playerPokemons })

    return true
  }

  showInPokedex (pokemon) {
    this.setState({ activePokemon: pokemon })
  }

  log (message) {
    this.setState({ message: message })
  }

  setPhase (phase) {
    this.setState({ phase: phase })
  }

  damage (attacker, defender) {
    return Math.floor((((2 * attacker.level + 10) / 250) * attacker.attack / defender.defense * 35 + 2) * [0.85, 1][Math.floor(Math.random() * 2)])
  }

  damagePokemon () {
    let playerPokemon = this.state.playerPokemons[this.state.playerPokemonIndex]
    let opponentPokemon = this.state.opponentPokemons[this.state.opponentPokemonIndex]
    let component = this
    let nextIndex

    if (!playerPokemon.isAlive()) {
      return
    }

    opponentPokemon.currentHp -= Math.min(this.damage(playerPokemon, opponentPokemon), opponentPokemon.currentHp)
    this.log(playerPokemon.name + ' used TACKLE')
    if (opponentPokemon.currentHp <= 0) {
      this.log(opponentPokemon.name + ' fainted.')
      nextIndex = this.state.opponentPokemonIndex + 1
      if (nextIndex >= this.state.opponentPokemons.length) {
        this.log('You won!')
      } else {
        this.setState({ opponentPokemonIndex: nextIndex })
      }
    } else {
      setTimeout(function () {
        playerPokemon.currentHp -= Math.min(component.damage(opponentPokemon, playerPokemon), playerPokemon.currentHp)
        component.log(opponentPokemon.name + ' used TACKLE')
        if (playerPokemon.currentHp <= 0) {
          component.log(playerPokemon.name + ' fainted.')
          nextIndex = component.state.playerPokemonIndex + 1
          if (nextIndex >= component.state.playerPokemons.length) {
            component.log('You lost!')
          } else {
            component.setState({ playerPokemonIndex: nextIndex })
          }
        }
      }, 800)
    }
  }

  render () {
    let template
    let currentPlayerPokemon
    let currentOpponentPokemon

    this.generateRandomPokemons(this.state.opponentPokemons)

    switch (this.state.phase) {
      case 'selection':
        template = (
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12'>
                <PokemonSelector addPokemon={this.addPokemon} log={this.log} />
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-6'>
                <Trainer owner='player' pokemons={this.state.playerPokemons} showInPokedex={this.showInPokedex} />
              </div>
              <div className='col-xs-6'>
                <Trainer owner='opponent' avatar={this.state.opponentAvatar} pokemons={this.state.opponentPokemons} />
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12'>
                <Pokedex pokemon={this.state.activePokemon} />
              </div>
            </div>
            <div className='row top-buffer'>
              <div className='col-xs-12'>
                <Log message={this.state.message} />
              </div>
            </div>
            <div className='row pokemon-selection-actions'>
              <div className='col-xs-12'>
                <StartBattleButton setPhase={this.setPhase} log={this.log} playerPokemons={this.state.playerPokemons} />
              </div>
            </div>
          </div>
        )
        break
      case 'battle':
        currentPlayerPokemon = this.state.playerPokemons[this.state.playerPokemonIndex]
        currentOpponentPokemon = this.state.opponentPokemons[this.state.opponentPokemonIndex]
        template = (
          <div className='container'>
            <div className='row'>
              <div className='col-xs-6'>
                <Trainer owner='player' pokemons={this.state.playerPokemons} showInPokedex={this.showInPokedex} activePokemon={currentPlayerPokemon} />
              </div>
              <div className='col-xs-6'>
                <Trainer owner='opponent' avatar={this.state.opponentAvatar} pokemons={this.state.opponentPokemons} activePokemon={currentOpponentPokemon} />
              </div>
            </div>
            <div className='row top-buffer'>
              <div className='col-xs-12'>
                <OpponentPokemon pokemon={currentOpponentPokemon} />
                <div className='row'>
                  <div className='opponents-separator'></div>
                </div>
                <PlayerPokemon pokemon={currentPlayerPokemon} />
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12'>
                <Log message={this.state.message} />
              </div>
            </div>
            <div className='row'>
              <BattleActions pokemon={currentPlayerPokemon} damagePokemon={this.damagePokemon} />
            </div>
          </div>
        )
        break
    }

    return template
  }
}

export default Game
