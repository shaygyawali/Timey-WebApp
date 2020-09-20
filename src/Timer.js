import React, { Component } from 'react'
import SecondsTohhmmss from './SecondsTohhmmss'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


let offset = null, interval = null

/**
 * Timer module
 * A simple timer component.
**/
class Timer extends Component {
  static get propTypes () {
    return {
      options: PropTypes.object
    }
  }

  constructor(props) {
    super(props)
    this.state = { clock: 0, time: '' ,}
  }
  componentDidUpdate(prevProps , prevState){
    if(prevProps.exists !== this.props.exists){
      if(this.props.exists){
        if(this.state.clock > 0){
          this.play()
        }
      }
      else{
        if(this.state.clock > 0){
          this.pause()
        }
      }
    }
  }
  componentDidMount() {
    this.pause()
  }

  componentWillUnmount() {
    this.pause()
  }

  pause() {
    clearInterval(this.timerID)
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }

  play() {
    this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    if (!interval) {
      offset = Date.now()
      interval = setInterval(this.update.bind(this), this.props.options.delay)
    }
  }



  tick(){
      console.log(this.state.clock)
      if(this.state.clock > 50000){
          this.reset()
          this.pause()
      }
  }

  reset() {
    let clockReset = 0
    this.setState({clock: clockReset })
    let time = SecondsTohhmmss(clockReset / 1000)
    this.setState({time: time })
  }

 

  update() {
    let clock = this.state.clock
    clock += this.calculateOffset()
    this.setState({clock: clock })
    let time = SecondsTohhmmss(clock / 1000)
    this.setState({time: time })
  }

  calculateOffset() {
    let now = Date.now()
    let newOffset = now - offset
    offset = now
    return newOffset
  }

  render() {
    const timerStyle = {
      margin: "0px",
      paddingTop: "90px",
      border: '1px solid pink',
      textAlign: 'center'
    };

    const buttonStyle = {
      background: "#fff",
      color: "black",
      border: "3px solid black",
      marginRight: "5px",
      padding: "10px",
      fontWeight: 'bold'
    };

    const secondsStyles = {
      paddingTop: 300,
      fontSize: "400%",
      fontWeight: "bolder",
      lineHeight: "1.5",
      margin: "0",
      color: 'black',
 
    };

    return (
      <div style={timerStyle} className="react-timer">
       <em><h3 style={secondsStyles} className="seconds"> {this.state.time} {this.props.prefix}</h3></em> 
        <br />
        <button onClick={this.reset.bind(this)} style={buttonStyle} >RESET SESSION</button>
        <button onClick={this.play.bind(this)} style={buttonStyle} >START WORK</button>
        <button onClick={this.play.bind(this)} style={buttonStyle} >CONTINUE WORK</button>
        <button onClick={this.pause.bind(this)} style={buttonStyle} >PAUSE WORK</button>
      </div>
    )
  }
} 

const mapStatetoProps = (state) =>({
  exists: state.exists
})
export default connect(mapStatetoProps)(Timer)
