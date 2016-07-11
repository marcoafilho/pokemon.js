import React from 'react'

const propTypes = {
  pokemon: React.PropTypes.object
}

class Pokedex extends React.Component {
  render () {
    let pokemon = this.props.pokemon
    let template

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
}

Pokedex.propTypes = propTypes

export default Pokedex
