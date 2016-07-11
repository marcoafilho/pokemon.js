import React from 'react'

const propTypes = {
  message: React.PropTypes.string
}

class Log extends React.Component {
  render () {
    return (
      <div className='panel panel-default selection-log'>
        <div className='panel-body'>
          {this.props.message}
        </div>
      </div>
    )
  }
}

Log.propTypes = propTypes

export default Log
