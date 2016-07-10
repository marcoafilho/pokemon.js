var React = require('react')
var ReactDOM = require('react-dom')
var db = require('./db')

var Pokemon = function (attributes) {
  this.id = attributes.id

  this.name = attributes.name
  this.level = 5

  this.hp = 15 + Math.floor(Math.random() * 6)
  this.attack = 8 + Math.floor(Math.random() * 6)
  this.defense = 8 + Math.floor(Math.random() * 6)
  this.specialAttack = 8 + Math.floor(Math.random() * 6)
  this.specialDefense = 8 + Math.floor(Math.random() * 6)
  this.speed = 8 + Math.floor(Math.random() * 6)

  this.currentHp = this.hp
}

Pokemon.prototype.isAlive = function () {
  return this.currentHp > 0
}

Pokemon.prototype.className = function () {
  return this.name.replace(/\W+/g, '-').toLowerCase()
}

var samplePokemon = function () {
  return db.pokemons[Math.floor(Math.random() * db.pokemons.length)]
}

var PokemonSelector = React.createClass({
  propTypes: {
    addPokemon: React.PropTypes.func
  },
  handleSubmit: function (event) {
    event.preventDefault()

    var input = this.refs.pokemonName
    this.props.addPokemon(input.value)
  },
  render: function () {
    return (
      <div className='pokemon-selection-actions'>
        <form action='#' className='pokemon-selector' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <input type='text' className='form-control pokemon-name' placeholder='Choose your Pokémon' ref='pokemonName' />
          </div>
        </form>
      </div>
    )
  }
})

var Trainer = React.createClass({
  propTypes: {
    activePokemon: React.PropTypes.object,
    avatar: React.PropTypes.string,
    owner: React.PropTypes.string,
    pokemons: React.PropTypes.array,
    showInPokedex: React.PropTypes.func
  },
  render: function () {
    var avatar = this.props.avatar || 'red'

    return (
      <div className='row'>
        <div className={this.props.owner}>
          <div className='col-xs-5 col-sm-3 col-md-2'>
            <div className={'trainer ' + avatar}></div>
          </div>
          <div className='col-xs-7 col-sm-9 col-md-10'>
            <div className='pokeball-list'>
              <Pokeballs
                pokemons={this.props.pokemons}
                allowClickEvents={this.props.owner === 'player'}
                showInPokedex={this.props.showInPokedex}
                activePokemon={this.props.activePokemon}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
})

var Pokeballs = React.createClass({
  propTypes: {
    allowClickEvents: React.PropTypes.bool,
    showInPokedex: React.PropTypes.func,
    pokemons: React.PropTypes.array
  },
  getInitialState: function () {
    return { selectedPokeball: null }
  },
  openPokeball: function (pokeball) {
    if (!this.props.allowClickEvents) {
      return
    }
    this.props.showInPokedex(pokeball.props.pokemon)
    this.setState({ selectedPokeball: pokeball })
  },
  closePokeball: function (pokeball) {
    if (!this.props.allowClickEvents) {
      return
    }
    this.props.showInPokedex(null)
    this.setState({ selectedPokeball: null })
  },
  render: function () {
    var component = this
    var pokeballs = this.props.pokemons.map(function (pokemon) {
      var selectedPokeball = component.state.selectedPokeball
      var activePokemon = component.props.activePokemon
      var isOpen = false

      if ((selectedPokeball && selectedPokeball.props.pokemon === pokemon) ||
          (activePokemon && activePokemon === pokemon) ||
          (!pokemon.isAlive())) {
        isOpen = true
      }

      return (
        <li key={pokemon.id} className='pokeball-container'>
          <Pokeball
            pokemon={pokemon}
            closePokeball={component.closePokeball}
            openPokeball={component.openPokeball}
            isOpen={isOpen}
          />
        </li>
      )
    })

    return (
      <ul className='poke-belt'>
        {pokeballs}
      </ul>
    )
  }
})

var Pokeball = React.createClass({
  propTypes: {
    isOpen: React.PropTypes.bool,
    closePokeball: React.PropTypes.func,
    openPokeball: React.PropTypes.func,
    pokemon: React.PropTypes.object
  },
  isActive: function () {
    var pokemon = this.props.pokemon
    if (this.props.isOpen) {
      if (pokemon.isAlive()) {
        return 'pokemon small animated ' + pokemon.className()
      } else {
        return 'pokemon small small-up desaturate ' + pokemon.className()
      }
    } else {
      return 'pokeball poke-ball active'
    }
  },
  handleClick: function (event) {
    if (this.props.isOpen) {
      this.props.closePokeball(this)
    } else {
      this.props.openPokeball(this)
    }
  },
  render: function () {
    return (
      <div className={this.isActive()} onClick={this.handleClick} data-id={this.props.pokemon.id} />
    )
  }
})

var Pokedex = React.createClass({
  propTypes: {
    pokemon: React.PropTypes.object
  },
  render: function () {
    var pokemon = this.props.pokemon
    var template

    if (pokemon) {
      template = (
        <div className='pokemon-display'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='row'>
                <div className='col-xs-4'>
                  <div className='img-thumbnail pokemon-thumbnail'>
                    <div className={'pokemon front ' + pokemon.className()}></div>
                  </div>
                </div>
                <div className='col-xs-8'>
                  <div className='row'>
                    <div className='col-xs-12'>
                      <div className='pokemon-name'>{pokemon.name}</div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-xs-12'>
                      <div className='row'>
                        <div className='col-xs-5'>
                          <strong className='pokemon-level'>Level</strong>
                        </div>
                        <div className='col-xs-5'>
                          <div className='attribute attribute-level'>{pokemon.level}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='row top-buffer'>
                <div className='col-xs-3'>
                  <strong>HP</strong>
                </div>
                <div className='col-xs-2 text-right'>
                  <div className='attribute attribute-hp'>{pokemon.hp}</div>
                </div>
                <div className='col-xs-4 col-xs-offset-1'>
                  <strong>Sp. Atk.</strong>
                </div>
                <div className='col-xs-2 text-right'>
                  <div className='attribute attribute-sp-atk'>{pokemon.specialAttack}</div>
                </div>
              </div>
              <div className='row'>
                <div className='col-xs-3'>
                  <strong>Attack</strong>
                </div>
                <div className='col-xs-2 text-right'>
                  <div className='attribute attribute-attack'>{pokemon.attack}</div>
                </div>
                <div className='col-xs-4 col-xs-offset-1'>
                  <strong>Sp. Def.</strong>
                </div>
                <div className='col-xs-2 text-right'>
                  <div className='attribute attribute-sp-def'>{pokemon.specialDefense}</div>
                </div>
              </div>
              <div className='row'>
                <div className='col-xs-3'>
                  <strong>Defense</strong>
                </div>
                <div className='col-xs-2 text-right'>
                  <div className='attribute attribute-defense'>{pokemon.defense}</div>
                </div>
                <div className='col-xs-4 col-xs-offset-1'>
                  <strong>Speed</strong>
                </div>
                <div className='col-xs-2 text-right'>
                  <div className='attribute attribute-speed'>{pokemon.speed}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='pokemon-info'>
        {template}
      </div>
    )
  }
})

var Log = React.createClass({
  propTypes: {
    message: React.PropTypes.string
  },
  render: function () {
    return (
      <div className='panel panel-default selection-log'>
        <div className='panel-body'>
          {this.props.message}
        </div>
      </div>
    )
  }
})

var StartBattleButton = React.createClass({
  propTypes: {
    playerPokemons: React.PropTypes.array,
    log: React.PropTypes.func,
    setPhase: React.PropTypes.func
  },
  handleClick: function () {
    if (this.props.playerPokemons.length <= 0) {
      this.props.log('You must select a pokemon first!')
    } else {
      this.props.log('')
      this.props.setPhase('battle')
    }
  },
  render: function () {
    return (
      <button className='btn btn-block btn-success start-battle' onClick={this.handleClick}>Start Battle!</button>
    )
  }
})

var PokemonHealthPointsBar = React.createClass({
  propTypes: {
    pokemon: React.PropTypes.object
  },
  classNames: function (hpPercentage) {
    var classNames = 'progress-bar'

    if (hpPercentage >= 50) {
      classNames += ' progress-bar-success'
    } else if (hpPercentage >= 25) {
      classNames += ' progress-bar-warning'
    } else {
      classNames += ' progress-bar-danger'
    }

    return classNames
  },
  render: function () {
    var pokemon = this.props.pokemon
    var hpPercentage = (pokemon.currentHp / pokemon.hp * 100)

    return (
      <div className='progress'>
        <div className={this.classNames(hpPercentage)} aria-valuenow='' aria-valuemin='0' aria-valuemax='' style={{ width: hpPercentage + '%' }}></div>
      </div>
    )
  }
})

var OpponentPokemon = React.createClass({
  propTypes: {
    pokemon: React.PropTypes.object
  },
  classNames: function () {
    var classNames = 'pokemon front ' + this.props.pokemon.className()
    if (!this.props.pokemon.isAlive()) {
      classNames += ' desaturate'
    }
    return classNames
  },
  render: function () {
    var pokemon = this.props.pokemon

    return (
      <div className='opponent-pokemon'>
        <div className='row'>
          <div className='col-xs-6'>
            <div className='row'>
              <div className='col-xs-12'>
                <div className='panel panel-default pokemon-battle-info'>
                  <div className='panel-body'>
                    <div className='row'>
                      <div className='col-xs-12'>
                        <span className='pokemon-name'>{pokemon.name}</span>
                        <span className='pokemon-level pull-right'>Lv{pokemon.level}</span>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-xs-12'>
                        <PokemonHealthPointsBar pokemon={pokemon} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xs-6'>
            <div className='text-center'>
              <div className={this.classNames()}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

var PlayerPokemon = React.createClass({
  propTypes: {
    pokemon: React.PropTypes.object
  },
  classNames: function () {
    var classNames = 'pokemon back ' + this.props.pokemon.className()
    if (!this.props.pokemon.isAlive()) {
      classNames += ' desaturate'
    }
    return classNames
  },
  render: function () {
    var pokemon = this.props.pokemon

    return (
      <div className='player-pokemon'>
        <div className='row'>
          <div className='col-xs-6'>
            <div className='text-center'>
              <div className={this.classNames()}></div>
            </div>
          </div>
          <div className='col-xs-6'>
            <div className='row'>
              <div className='col-xs-12'>
                <div className='panel panel-default pokemon-battle-info'>
                  <div className='panel-body'>
                    <div className='row'>
                      <div className='col-xs-12'>
                        <span className='pokemon-name'>{pokemon.name}</span>
                        <span className='pokemon-level pull-right'>Lv{pokemon.level}</span>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-xs-12'>
                        <PokemonHealthPointsBar pokemon={pokemon} />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-xs-12'>
                        <span className='hp-info pull-right'>
                          {pokemon.currentHp}/{pokemon.hp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

var BattleActions = React.createClass({
  propTypes: {
    damagePokemon: React.PropTypes.func
  },
  getInitialState: function () {
    return { disabled: false }
  },
  handleClick: function () {
    this.setState({ disabled: true })
    this.props.damagePokemon()
  },
  render: function () {
    return (
      <div className='battle-actions'>
        <div className='col-xs-6'>
          <button className='btn btn-block btn-danger attack' onClick={this.handleClick}>Tackle</button>
        </div>
        <div className='col-xs-6'>
          <button className='btn btn-block btn-info defend'>Growl</button>
        </div>
      </div>
    )
  }
})

var Game = React.createClass({
  getInitialState: function () {
    return {
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
  },
  generateRandomPokemons: function (list) {
    var index,
      pokemonName,
      pokemon

    for (index = list.length; index < 6; index++) {
      pokemonName = samplePokemon()
      pokemon = new Pokemon({ id: index + 1, name: pokemonName })
      list.push(pokemon)
    }
  },
  addPokemon: function (pokemonName) {
    var playerPokemons = this.state.playerPokemons
    var pokemon

    if (db.pokemons.indexOf(pokemonName) <= -1 || playerPokemons.length >= 6) {
      return
    }
    pokemon = new Pokemon({ id: playerPokemons.length + 1, name: pokemonName })
    playerPokemons.push(pokemon)
    this.setState({ playerPokemons: playerPokemons })
  },
  showInPokedex: function (pokemon) {
    this.setState({ activePokemon: pokemon })
  },
  log: function (message) {
    this.setState({ message: message })
  },
  setPhase: function (phase) {
    this.setState({ phase: phase })
  },
  damage: function (attacker, defender) {
    return Math.floor((((2 * attacker.level + 10) / 250) * attacker.attack / defender.defense * 35 + 2) * [0.85, 1][Math.floor(Math.random() * 2)])
  },
  damagePokemon: function () {
    var playerPokemon = this.state.playerPokemons[this.state.playerPokemonIndex]
    var opponentPokemon = this.state.opponentPokemons[this.state.opponentPokemonIndex]
    var component = this
    var nextIndex

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
  },
  render: function () {
    var template
    var currentPlayerPokemon
    var currentOpponentPokemon

    this.generateRandomPokemons(this.state.opponentPokemons)

    switch (this.state.phase) {
      case 'selection':
        template = (
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12'>
                <PokemonSelector addPokemon={this.addPokemon} />
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
})

ReactDOM.render(<Game />, document.getElementById('game'))
