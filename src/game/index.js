import React, { Component } from 'react'
import Div from '../components/layout/div/'
import Canvas from '../components/canvas/'
export default class extends Component{
	constructor(props) {
		console.log(props.detail)
		super(props)
		this.state = props.detail
	}

	notifier(note) {
    let maxN = this.state.window.width<800?8:25
    this.notifications.push(note)
    if(this.notifications.length>maxN) {
      this.notifications.shift()
    }
	}
	
	render(props) {
		let w = this.state.window
		return <Div>
		<Canvas id='game' width={w.width} height={w.height-32} position={'absolute'} top={30}/>
		</Div>
	}

}