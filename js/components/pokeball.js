import React from 'react'

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

export default Pokeball
