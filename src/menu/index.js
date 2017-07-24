import React, { Component } from 'react'
import Button from './components/button/'
// import Input from './components/input/'
import Slider from './components/slider/'
import Box from './components/layout/box/'
import Container from './components/layout/container/'
import Label from './components/label/'
import { injectGlobal } from 'styled-components';
import optionMinMax from './constants/optionMinMax'
import presets from './constants/presets'

class Menu extends Component {
  constructor() {
    super() 
        let options = optionMinMax
        this.state={
            started: false,
            grid:options.grid.default,
            enemies:options.enemies.default,
            bonuses:options.bonuses.default,
            width:options.width.default,
            height:options.height.default,
            rooms:options.rooms.default,
            preset:0,
            cols:2
       }
        this.endGame=this.endGame.bind(this)
        this.changeDefaults=this.changeDefaults.bind(this)
        this.presets=this.presets.bind(this)
    }

    componentDidMount() {
        let start = () => injectGlobal`
            body {
                margin:1em;    
                font-family:'Cabin', sans-serif;
            }
        `;
        this.getCSS(start)
    }

    getCSS() {
        if (window.innerWidth<500) {
            this.setState({
            cols:1
            })
        } else if (window.innerWidth<800) {
            this.setState({
            cols:2
            })
        } else if (window.innerWidth<1200){
            this.setState({
            cols:3
            })
        } else {
            this.setState({
            cols:6
            })
        }

    }
    changeWindow() {
        this.getCSS()
        console.log('window change')
    }

    changeDefaults(value) {
        this.setState({
            [value[0]]: parseInt(value[1],10)
        })
    }

    endGame() {
        this.setState({
            started:!this.state.started
        })
    }

    shouldComponentUpdate(first,second){
        // console.log(second,this.state)
        return true
    }

    componentDidUpdate() {
        // console.log('component updated')
    }

    presets() {
        let current = this.state.preset
        let next
        if(current===4) {
            next = 1
        } else {
            next = current+1
        }
        this.setState(presets[next])
    }

    getBoxSlider(props) {
        let o = optionMinMax
        let box=props
        let p = box[0]
        // console.log(o[p])
        return  (
        <Box detail={box}>
            <Label size='small' label={o[p].label}/>
            <Label label={this.state[p]} />
            <Slider 
                val={this.state[p]}
                what={o[p]}
                alter={this.changeDefaults}
            />
        </Box>
        )

    }

    render() {
        window.onresize=this.changeWindow.bind(this)
        let p = this.state.preset
        let started = this.state.started?'Something':'Nothing'
        let btnText = this.state.started?' End ':'Start'

        return (
            <Container detail={['container']} cols={this.state.cols}>

                {this.getBoxSlider(['grid',0,0,0,0,'white'])}
                {this.getBoxSlider(['enemies',0,0,0,0,'white'])}
                {this.getBoxSlider(['bonuses',0,0,0,0,'white'])}
                {this.getBoxSlider(['width',0,0,0,0,'white'])}
                {this.getBoxSlider(['height',0,0,0,0,'white'])}
                {this.getBoxSlider(['rooms',0,0,0,0,'white'])}
                <Button 
                    primary={this.state.started} 
                    text={btnText} 
                    fn={this.endGame}
                />
                <Button 
                    primary={!this.state.started} 
                    text={p===4?'back to: '+presets[1].level:'Level: '+presets[p+1].level} 
                    fn={this.presets}
                />
 
                App has {started} 


            </Container>
        )
    }
}

export default Menu;