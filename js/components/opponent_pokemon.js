import React from 'react'
import PokemonHealthPointsBar from './pokemon_health_points_bar'

const propTypes = {
  pokemon: React.PropTypes.object
}

class OpponentPokemon extends React.Component {
  classNames () {
    let classNames = 'pokemon front ' + this.props.pokemon.className()
    if (!this.props.pokemon.isAlive()) {
      classNames += ' desaturate'
    }
    return classNames
  }

  render () {
    let pokemon = this.props.pokemon

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
}

OpponentPokemon.propTypes = propTypes

export default OpponentPokemon
