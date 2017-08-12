import React, { Component } from 'react'
import { injectGlobal } from 'styled-components';
import { optionMinMax,presetData,boxGrid } from './constants/'
import {players} from './constants/'
import Button from './components/button/'
import Div from './components/layout/div/'
import Slider from './components/slider/'
import Canvas from './components/canvas/'
import Box from './components/layout/box/'
import Container from './components/layout/container/'
import Label from './components/label/'
import Loader from './components/images/Loader'
import characterAnims from './options/characterAnims'
import Rooms from './game/roomGenerator/Rooms'


function showGame(room) {

	let height
	let scale = room.started?10:room.grid>74?2:3
	
	let width = height = room.grid*scale
	let grid = room.sampleGrid
	let canvas = document.getElementById('game')
	if(canvas) {
		canvas.width = width
		canvas.height = height
		let ctx = canvas.getContext('2d');
		ctx.scale(scale,scale)
		ctx.clearRect(0,0,width,height)
		let y=-1
		let x=-1;
		let gItems =[]
		grid.forEach((cell,id)=>{
			if(cell===3){
				ctx.fillStyle='black'
			}
			else if(cell===5){
				ctx.fillStyle='#ca3e75'
			}
			else if(cell===6){
				ctx.fillStyle='#ca6e75'
			}
			else if(cell===7){
				ctx.fillStyle='blue'
			}
			else if(cell===8){
				ctx.fillStyle='yellow'
			}
			else if(cell===9){
				ctx.fillStyle='green'
			}
			else if(cell===2)ctx.fillStyle='green'
			else if(cell===1)ctx.fillStyle='#333'
			else ctx.fillStyle='#4f4f9c'
			x+=1
			if(id%room.grid===0) {
				// console.log('new row',id,y)
				x=0
				y+=1
			}
			ctx.fillRect(x,y,1,1)
			gItems.push(x,y)
		})

	}
}


class App extends Component {
	constructor () {
		super() 
		let options = optionMinMax()
		let width = window.innerWidth
		let loader = new Loader()
		this.state={
			started: false,
			grid:			options.grid.default,
			enemies:	options.enemies.default,
			bonuses:	options.bonuses.default,
			width: options.width.default,
			height: options.height.default,
			size: {
				w:			options.width.default,
				h:			options.height.default
			},
			rooms:		options.rooms.default,
			preset:		0,
			sex:			'f',
			cols:			width<500?1:width<800?2:width<1400?3:4,
			hero:			'ninja_f',
			loader:		loader
		}
		this.endGame=this.endGame.bind(this)
		this.changeDefaults=this.changeDefaults.bind(this)
		this.presets=this.presets.bind(this)
		this.changeWindow=this.changeWindow.bind(this)
		this.boyGirl=this.boyGirl.bind(this)
	}

	componentDidMount() {
		injectGlobal`
			body {
				background:#707070;
				margin:0;
				padding:0;    
				font-family:'Cabin', sans-serif;
			}
		`;
	}

	getCSS() {
		let width = window.innerWidth
		let cols = width<500?1:width<800?2:width<1400?3:4
		this.setState({cols:cols})
	}

	changeWindow() {
		this.getCSS()

	}

	changeDefaults(value) {
		// console.log('slider value being changed: ,',value)
		if(value[0]==='height') {
			this.setState({
				size: {
					h:value[1],
					w:this.state.size.w
				}
			})
		} else	if(value[0]==='width') {
			this.setState({
				size: {
					w:value[1],
					h:this.state.size.h
				}
			})
		} 
		this.setState({
			[value[0]]: parseInt(value[1],10)
		})
		

	}

	endGame() {
		this.setState({
			started:!this.state.started
		})
	}

	presets() {
		let presets = presetData()
		let current = this.state.preset
		let next
		if(current===4) {
			next = 1
		} else {
			next = current+1
		}
		this.setState(presets[next])
	}

	boyGirl() {
		let sex = this.state.sex==='m'?'f':'m'
		let hero = this.state.hero
		let newHero = hero.slice(0,hero.length-2)
		this.setState({
			sex:sex,
			hero:newHero+'_'+sex
		})
	}

	getBoxSlider(props) {
		let o = optionMinMax()
		let box=props
		let p = box[0]
		return (
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

	selectHero(e) {
		let canvas
		e.target.style.background='rgba(150,30,0,0.6)'
		let newHero = e.target.id.slice(3,e.target.id.length)
		if(this.state.hero!==newHero){
			canvas = document.getElementById('pm_'+this.state.hero)
		}
		if(canvas) canvas.style.background='#666'
		this.setState({
			hero: newHero
		})
	} 

	loadButton(data) {
		return (!this.state.loader.getURL(data))
		? <Button 
				primary={!this.state.started} 
				text={'Load Players'} 
				fn={this.changeWindow}
			/>
		: <Button 
				primary={this.state.started} 
				text={this.state.sex==='f'?'choose Male Hero':'choose Female Hero'} 
				fn={this.boyGirl}
			/>				
	}

	showSampleGrid(grid) {
		let sampleGrid = new Rooms(grid)
		showGame({sampleGrid:sampleGrid.dungeon.render,grid:this.state.grid,started:this.state.started})
	}

	componentDidUpdate() {
		// if(this.state.started)
		this.showSampleGrid(this.state);
	}

	renderSample() {
	}

	getContainer() {
		let playerlist = players(this.state.sex)
		let presets = presetData()
		let p = this.state.preset
		let btnText = this.state.started?' End ':'Start'
		let bGrid = boxGrid();
		let pCols = this.state.cols===1?2:this.state.cols+1
		let pRows = this.state.cols===1?4:1
		return ( 
			<Div>
				<Container detail={['container']} cols={this.state.cols} rows={4}>
					{Object.keys(bGrid).map((box,key)=>
						<Div key={key} pad={'1px'}>
							{box!=='player'?this.getBoxSlider(bGrid[box]):<Button 
								primary={!this.state.started} 
								text={p===4?'back to: '+presets[1].level:'use level preset: '+presets[p+1].level} 
								fn={this.presets}
						/>}
						</Div> 
					)}
					<Div pad={'10px'}>
						<Button 
							primary={this.state.started} 
							text={btnText} 
							fn={this.endGame}
						/>
					</Div>
					<Div pad={'10px'}>
						{this.loadButton(playerlist.name[0])}
					</Div>
				</Container>
				<Container detail={['player']} cols={pCols} rows={pRows}>	
					{
						playerlist.name.map((player,id)=>{	
							let detail = this.state.cols===1?['',0,0,0,0]:['',1,1,id+1,1]
							let selector = 'rgba(0,0,0,0.0)'
							return (
								<Box
									key={id} 
									detail={[...detail,selector]}
								>
								{
									this.state.loader.getURL(player)
									?	<Canvas id={'pm_'+player} 
											onClick={this.selectHero.bind(this)} 
											onMouseOver={
												characterAnims.bind(this,
													{	
														loader:this.state.loader,
														hero:player,
														selected:this.state.hero
													})
											}
										/>
									:null
								}
								</Box>
							)
						})
					}
				</Container>
				<Div align='center'>
					<Canvas id='game' />
				</Div>

			</Div>
		)
	}
		
	render() {
		let btnText = this.state.started?' End ':'Start'
		let text = this.state
		// window.onresize=this.changeWindow
		return !this.state.started
			?this.getContainer()
			:	<Div height='720px'>
				{console.log(text)}
				<Button 
					primary={!this.state.started} 
					text={btnText} 
					fn={this.endGame}
				/>
					<Canvas id='game'/>
				</Div>
	}
}

export default App