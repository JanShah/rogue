import React, { Component } from 'react'
import Div from '../components/layout/div/'
import Container from '../components/layout/container/'
import Box from '../components/layout/box/'
import Canvas from '../components/canvas/'

let w = window.innerWidth

export default class extends Component
{
	constructor(props) 
	{
		super(props)
		let det = props.detail
		this.state = {
		
			grid:det.grid,
			hero:det.hero,
			started:det.started,
			chanceEnemy:det.enemies,
			chanceBonus:det.bonuses,
			loader:det.loader,
			notifications:['game loading data now','game loading','game loading','game loading','game loading','game loading','game loading','game loading']
		}
	}

	notifier(note) 
	{
		let maxN = w<800?8:25
		let notes = Object.assign([],[...this.state.notifications,note])
		if(this.notes.length>maxN) 
		{
      notes.shift()
		}
		this.setState({
			notifications:notes
		})
	}

  showNotes() {
    if(this.state.notifications.length) {
      let notes = this.state.notifications.map((a,b)=><Div margin={'3px 0 5px 10px'}align={'left'} key={b}>{a}</Div>)
      return notes
    }
  }


	loadGame()
	{
		let game = document.getElementById('game')
		console.log(game)
		game.width = 800
		game.height = 600
		this.setState({
			canvas:game
		})
	}

	componentDidMount() 
	{
		this.loadGame()
	}
	
	render(props) 
	{
		// console.log(this.state)
		return <Container 
			detail={['gameContainer']} 
			cols={2} 
			rows={3}
			gap={20}
			templateCols={'220px 1fr'} 
			stretch={'flex-start'}>
			<Box
				key={1} 
				detail={['',1,1,1,1]}>
				{this.showNotes()}
			</Box>
			<Box
				key={2} 
				detail={['',1,3,2,1]}>
				<Canvas id='game' position={'relative'}/>
			</Box>
		</Container>
	}

}