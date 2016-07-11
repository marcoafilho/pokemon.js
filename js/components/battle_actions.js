import React from 'react'

const propTypes = {
  damagePokemon: React.PropTypes.func
}

class BattleActions extends React.Component {
  constructor (props) {
    super(props)

    this.state = { disabled: false }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({ disabled: true })
    this.props.damagePokemon()
  }

  render () {
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
}

BattleActions.propTypes = propTypes

export default BattleActions
