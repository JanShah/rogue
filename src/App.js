import React, { Component } from 'react';
import Menu from './menu/'
import Button from './menu/components/button/'

class App extends Component {
  constructor() {
    super()
    this.state={started:false}
    this.defineGame=this.defineGame.bind(this)
    this.gameState=this.gameState.bind(this)
  }

  gameState() {
    this.setState({
      started:false
    })
  }

  defineGame(game) {
    this.setState({
      ...game
    })
  }
  render() {
    console.log(this.state)
    let btnText = this.state.started?' End ':'Start'

    let started = this.state.started?'started':'not started'
    return <div>App has {started}
    {
      (!this.state.started)
      ? 
      <Menu defineGame={this.defineGame}/>
      : 
      <div>
          <Button 
          primary={!this.state.started} 
          text={btnText} 
          fn={this.gameState}
        />
      </div>
    }
    </div>
  }
}

export default App;
