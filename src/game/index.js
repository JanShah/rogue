import React, { Component } from 'react'
import Container from '../components/layout/container/'
import Box from '../components/layout/box/'
import Board from '../gameBoard/'
import Maps from '../gameBoard/Maps'
import rw from '../general/functions/rw'
let w = window.innerWidth

export default class extends Component
{
	constructor(props) 
	{
		super(props)
		let map = new Maps({...this.props,notifier:this.notifier})
		let detail = props.detail
		let notes = detail.game?' Saved Map': ' Random Map'
		this.state = {
			map:map,
			loader:detail.loader,
			notifications:['game loading '+notes]
		}
		this.notifier = this.notifier.bind(this)
	}

	notifier(note) 
	{
		let maxN = w<800?8:15
		let notes = Object.assign([],this.state.notifications)
		if(notes[notes.length-1]!==note)
		{
			//if notes are similar, change the note, don't append
			let lastMessage = notes[notes.length-1]
			let newMessage = note.split(':')[0]
			if(lastMessage.match(newMessage))
			{
				notes[notes.length-1]=note
			}
			else
			{
				notes.push(note)				
			}
			if(notes.length>maxN) 
			{
				notes.shift()
			}
			this.setState({
				notifications:notes
			})
		}
	}

	showNotes() 
	{
    if(this.state.notifications.length) {
			let style = {
				margin:'3px 0 5px 10px',
				align:'left',
				textAlign:'left'
			}
			let notes = this.state.notifications
			.map((note,num)=>
				<div style={style}
					key={num}>
					{note}
				</div>
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

		let loader = this.props.detail.loader
		let canvas = document.getElementById('game')
		if(canvas){		
			canvas.style.marginTop='20px'
			canvas.width = size.width<800?size.width-30:800
			canvas.height = 600
			let game = new Board({
				map:this.state.map,
				canvas:canvas,
				loader:loader,
				updateMap:this.updateMap.bind(this),
				miniMap:this.miniMap.bind(this),
				notifier:this.notifier.bind(this),
				hero:this.props.detail.hero
			})
			
			if(!this.state.map.startingPoint)
			{
				alert('no rooms!')
			}
			else 
			{
				game.run(canvas)
				this.setState({
					canvas:canvas,
					game:game
				})
			}
		}
	}

	componentWillUnmount()
	{
		if(this.state.game)
		{
			this.state.game.endGame()
		}
	}

	componentDidUpdate()
	{
		let hp = this.state.game.hero.stats.hp
		if(hp<1)
		{
			this.state.game.endGame('lost')					
		}
	}

	updateMap(cell,layer)
	{
		let map = Object.assign({},this.state.map)
		map.layers[layer][cell]= rw(100,120)
		map.layers[1][cell]= rw(100,120)
		this.setState({
			map:map
		})
	}

	miniMap() {
    if(this.state.game.hero.stats.bonuses[9])
    this.setState({
      miniMap:true
    })
  }




	smallWindow() 
	{
		return <Container 
			detail={['gameContainer']} 
			cols={2} 
			rows={1}
			gap={20}
			templateCols={'1fr'} 
			stretch={'stretch'}><Box
				key={1} 
				detail={['',1,1,1,1]}>
				<canvas id='game' />
			</Box>
			<Box
				key={4} 
				detail={['',2,1,1,1]}>
				<canvas id='stats'/>
			</Box>
			
			</Container>
	}

	largeWindow() 
	{
		return <Container 
			detail={['gameContainer']} 
			gap={0}
			templateCols={'260px 800px repeat(3,1fr)'} 
			templateRows={'603px 50px'} 
			stretch={'flex-start'}>
				<Box
					key={1} 
					color={'white'}
					background={'#333'}
					detail={['',1,1,1,1]}>
					{this.showNotes()}
				</Box>
				<Box
					key={5} 
					color={'white'}
					background={'#333'}
					detail={['',2,1,1,1]}>
					<canvas id='miniMap'/>
					</Box>
				<Box
				key={2} 
				detail={['',1,1,2,3]}>
				<canvas id='game'/>
				</Box>				
				<Box
					key={3} 
					detail={['',1,2,3,1]}>
					<canvas id='bonuses'/>
					</Box>				
					<Box
					key={4} 
					detail={['',2,1,2,1]}>
					<canvas id='stats'/>
					</Box>
			</Container>
	}
	
	render() 
	{
		return this.props.detail.window.width<800?this.smallWindow():this.largeWindow()
	}

}