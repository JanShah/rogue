import React, { Component } from 'react'
import Div from '../components/layout/div/'
import Container from '../components/layout/container/'
import Box from '../components/layout/box/'
import Canvas from '../components/canvas/'
// import Rooms from './roomGenerator/Rooms'
import Board from '../gameBoard/'
import Maps from '../gameBoard/Maps'
let w = window.innerWidth

export default class extends Component
{
	constructor(props) 
	{
		super(props)
		let detail = props.detail
		let notes = detail.game?' Saved Map': ' Random Map'
		this.state = {
			// grid:detail.grid,
			// hero:detail.hero,
			// started:detail.started,
			// chanceEnemy:detail.enemies,
			// chanceBonus:detail.bonuses,
			loader:detail.loader,
			// game:detail.game||new Rooms(props.detail),
			notifications:['game loading'+notes]
		}
		this.notifier = this.notifier.bind(this)
	}

	notifier(note) 
	{

		let maxN = w<800?8:25
		let notes = this.state.notifications
		notes.push(note)
		if(notes.length>maxN) 
		{
      notes.shift()
		}
		this.setState({
			notifications:notes
		})
	}

	showNotes() 
	{
    if(this.state.notifications.length) {
			let notes = this.state.notifications
			.map((note,num)=>
				<Div 
					margin={'3px 0 5px 10px'}
					align={'left'} 
					key={num}>
					{note}
				</Div>
			)
      return notes
    }
  }

	componentDidMount() 
	{
		this.loadGame()
	}

	loadGame()
	{
		let size = this.props.detail.window
		let canvas = document.getElementById('game')
		if(canvas){		
			canvas.width = size.width<800?size.width-30:size.width<1200?size.width-300:size.width-600
			canvas.height = size.height-60
			let map = new Maps({...this.props,notifier:this.notifier})
			let board = new Board({map:map,canvas:canvas})
			// console.log('0',...map.layers[0])
			// console.log('1',...map.layers[1])
			// console.log('2',...map.layers[2])
			// console.log('3',...map.layers[3])
			this.setState({
				canvas:canvas,
				map:map
			})
		}
	}




	smallWindow() 
	{
		return <Container 
			detail={['gameContainer']} 
			cols={1} 
			rows={1}
			gap={20}
			templateCols={'1fr'} 
			stretch={'stretch'}><Box
				key={1} 
				detail={['',1,3,1,2]}>
				<Canvas id='game' position={'relative'}/>
			</Box>
			</Container>
	}

	largeWindow() 
	{
		return <Container 
			detail={['gameContainer']} 
			cols={2} 
			rows={3}
			gap={20}
			templateCols={'220px 1fr'} 
			stretch={'flex-start'}>
				<Box
					key={1} 
					color={'white'}
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
	
	render() 
	{
		console.log(this.state)
		return this.props.detail.window.width<800?this.smallWindow():this.largeWindow()
	}

}