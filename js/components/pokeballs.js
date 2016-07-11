import React from 'react'
import Pokeball from './pokeball'

const propTypes = {
  activePokemon: React.PropTypes.object,
  allowClickEvents: React.PropTypes.bool,
  showInPokedex: React.PropTypes.func,
  pokemons: React.PropTypes.array
}

class Pokeballs extends React.Component {
  constructor (props) {
    super(props)

    this.state = { selectedPokeball: null }

    this.openPokeball = this.openPokeball.bind(this)
    this.closePokeball = this.closePokeball.bind(this)
  }

  openPokeball (pokeball) {
    if (!this.props.allowClickEvents) {
      return
    }
    this.props.showInPokedex(pokeball.props.pokemon)
    this.setState({ selectedPokeball: pokeball })
  }

  closePokeball (pokeball) {
    if (!this.props.allowClickEvents) {
      return
    }
    this.props.showInPokedex(null)
    this.setState({ selectedPokeball: null })
  }

  render () {
    let pokeballs = this.props.pokemons.map((pokemon) => {
      let selectedPokeball = this.state.selectedPokeball
      let activePokemon = this.props.activePokemon
      let isOpen = false

      if ((selectedPokeball && selectedPokeball.props.pokemon === pokemon) ||
          (activePokemon && activePokemon === pokemon) ||
          (!pokemon.isAlive())) {
        isOpen = true
      }

      return (
        <li key={pokemon.id} className='pokeball-container'>
          <Pokeball
            pokemon={pokemon}
            closePokeball={this.closePokeball}
            openPokeball={this.openPokeball}
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
}

Pokeballs.propTypes = propTypes

export default Pokeballs
