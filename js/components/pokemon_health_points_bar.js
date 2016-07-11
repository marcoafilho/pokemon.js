import React from 'react'

const propTypes = {
  pokemon: React.PropTypes.object
}

class PokemonHealthPointsBar extends React.Component {
  classNames (hpPercentage) {
    let classNames = 'progress-bar'

    if (hpPercentage >= 50) {
      classNames += ' progress-bar-success'
    } else if (hpPercentage >= 25) {
      classNames += ' progress-bar-warning'
    } else {
      classNames += ' progress-bar-danger'
    }

    return classNames
  }

  render () {
    let pokemon = this.props.pokemon
    let hpPercentage = (pokemon.currentHp / pokemon.hp * 100)

    return (
      <div className='progress'>
        <div className={this.classNames(hpPercentage)} aria-valuenow='' aria-valuemin='0' aria-valuemax='' style={{ width: hpPercentage + '%' }}></div>
      </div>
    )
  }
}

PokemonHealthPointsBar.propTypes = propTypes

export default PokemonHealthPointsBar
