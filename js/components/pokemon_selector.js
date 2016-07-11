import React from 'react'
import ReactDOM from 'react-dom'

const propTypes = {
  addPokemon: React.PropTypes.func,
  log: React.PropTypes.func
}

class PokemonSelector extends React.Component {

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    let input = this.refs.pokemonName
    let pokemonName = input.value.trim().split(' ').map((word) => {
      return word[0].toUpperCase() + word.slice(1).toLowerCase()
    }).join(' ')

    if (this.props.addPokemon(pokemonName)) {
      this.props.log(`${pokemonName} was added to your bag.`)
      input.value = ''
    } else {
      this.props.log('Invalid Pokémon name.')
    }
  }

  componentDidUpdate () {
    ReactDOM.findDOMNode(this.refs.pokemonName).focus()
  }

  render () {
    return (
      <div className='pokemon-selection-actions'>
        <form action='#' className='pokemon-selector' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              ref='pokemonName'
              className='form-control pokemon-name'
              placeholder='Choose your Pokémon'
              autoFocus
            />
          </div>
        </form>
      </div>
    )
  }
}

PokemonSelector.propTypes = propTypes

export default PokemonSelector
