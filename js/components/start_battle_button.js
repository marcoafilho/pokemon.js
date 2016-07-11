import React from 'react'

const propTypes = {
  playerPokemons: React.PropTypes.array,
  log: React.PropTypes.func,
  setPhase: React.PropTypes.func
}

class StartBattleButton extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    if (this.props.playerPokemons.length <= 0) {
      this.props.log('You must select a pokemon first!')
    } else {
      this.props.log('')
      this.props.setPhase('battle')
    }
  }

  render () {
    return (
      <button className='btn btn-block btn-success start-battle' onClick={this.handleClick}>Start Battle!</button>
    )
  }
}

StartBattleButton.propTypes = propTypes

export default StartBattleButton
