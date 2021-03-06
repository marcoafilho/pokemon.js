import React from 'react'
import Pokeballs from './pokeballs'

const propTypes = {
  activePokemon: React.PropTypes.object,
  avatar: React.PropTypes.string,
  owner: React.PropTypes.string,
  pokemons: React.PropTypes.array,
  showInPokedex: React.PropTypes.func,
  currentOpponent: React.PropTypes.object
}

class TrainerMenu extends React.Component {
  render () {
    console.log(this.props)
    let avatar = this.props.avatar || 'red'
    let template

    if (this.props.owner === 'player' || typeof this.props.currentOpponent === 'object') {
      template = (
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
    } else {
      template = (
        <div className='row'>
          <div className='col-xs-12'>
            <span>Awaiting rival...</span>
          </div>
        </div>
      )
    }

    return template
  }
}

TrainerMenu.propTypes = propTypes

export default TrainerMenu
