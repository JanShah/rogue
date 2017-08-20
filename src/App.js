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
import showGame from './game/demo/'
import Game from './game/'
class App extends Component {
	constructor () {
		super() 
		let options = optionMinMax()
		let width = window.innerWidth
		let loader = new Loader()
		this.showSampleGrids = true;
		this.state={
			window: {
				width:window.innerWidth,
				height:window.innerHeight
			},
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
		this.closeGame=this.closeGame.bind(this)
		this.changeDefaults=this.changeDefaults.bind(this)
		this.presets=this.presets.bind(this)
		this.changeWindow=this.changeWindow.bind(this)
		this.boyGirl=this.boyGirl.bind(this)
		this.saveMap = this.saveMap.bind(this)
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
		this.changeWindow()
	}

	getCSS() {
		let width = window.innerWidth
		let cols = width<500?1:width<800?2:width<1400?3:4
		this.setState({
			cols:cols,
			window: {
					width:width,
					height:window.innerHeight
				}
		})
	}

	changeWindow() {
		this.getCSS()
	}

	changeDefaults(value) {
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
		else	if(value[0]==='grid') {
			this.setState({
				game:null
			})
		} 
		this.setState({
			[value[0]]: parseInt(value[1],10)
			
		})
		

	}

	closeGame() {
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
		this.setState({...presets[next],game:null})
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
		showGame({sampleGrid:grid.dungeon.render,grid:this.state.grid,started:this.state.started})
	}

	componentDidUpdate() {
		this.sampleGrid = new Rooms(this.state)
		this.showSampleGrid(this.sampleGrid);
	}

	renderSample() {
	}

	saveMap(event) {
		this.setState({
			game:this.sampleGrid
		})
	}


	getContainer() {
		let playerlist = players(this.state.sex)
		let presets = presetData()
		let p = this.state.preset
		let btnText = this.state.started?' End ':'Start'
		let bGrid = boxGrid();
		let pCols = this.state.cols===1?1:this.state.cols
		let pRows = this.state.cols===1?4:1
		let alertText = this.state.game?'Map Saved. Changing dungeon width/height will delete your saved map':null
		let saveButtontext = this.state.game?'Save this instead?':'Save this map'
		
		let retrieveSaved = this.state.game?<Button 
							text={'load saved'} 
							fn={this.showSampleGrid.bind(this,this.state.game)}/>:null
		let saveButton = this.sampleGrid?<Button 
							primary={this.state.started} 
							text={saveButtontext}
							fn={this.saveMap}
						/>:null
		return ( 
			<Div>
				<Container detail={['container']} cols={this.state.cols} rows={4}>
					{Object.keys(bGrid).map((box,key)=>
						<Div key={key} pad={10}>
							{box!=='player'?this.getBoxSlider(bGrid[box]):<Button 
								primary={!this.state.started} 
								text={p===4?'back to: '+presets[1].level:'use level preset: '+presets[p+1].level} 
								fn={this.presets}
						/>}
						</Div> 
					)}
					<Div pad={10}>
						<Button 
							primary={this.state.started} 
							text={btnText} 
							fn={this.closeGame}
						/>
					</Div>
					<Div pad={10}>
						{this.loadButton(playerlist.name[0])}
					</Div>
				</Container>
				<Container detail={['player']} cols={pCols===3?4:pCols} rows={pRows}>	
					{
						playerlist.name.map((player,id)=>{	
							let detail = this.state.cols<=2?['',0,0,0,0]:['',1,1,id+1,1]
							let selector = 'rgba(0,0,0,0.0)'
							return (
								
								<Box
									key={id} 
									detail={[...detail,selector]}
								>
								<Canvas id={'pm_'+player} 
									width={225}
									onClick={this.selectHero.bind(this)} 				
								/>					
								{
									this.state.loader.getURL(player)
									?	(
										characterAnims(
											{	
												loader:this.state.loader,
												hero:player,
												selected:this.state.hero
											})
										)
									:null
								}
								</Box>
							)
						})
					}
				</Container>
				<Div align='center'>
					<Container detail={['grids']} cols={2} template={'1fr 27px 20px'} stretch={'center'}>	
						<Box
							key={2} 
							detail={['',1,1,1,2]}>
						<Canvas id='gameDemo' />
						</Box>
						<Box
							key={1} 
							detail={['',2,1,1,2]}>
							{alertText}
						</Box>
						<Box
							key={3} 
							detail={['',3,1,1,1]}>
							{saveButton}
						</Box>
						<Box
							key={4} 
							detail={['',3,1,2,1]}>

						{retrieveSaved}</Box>
					</Container>
				</Div>

			</Div>
		)
	}
		
	render() {
		let btnText = this.state.started?' End ':'Start'
		let text = this.state
		// window.onresize=this.changeWindow
		return !this.state.started
			?	this.getContainer()
			:	<Div>
				<Button 
					primary={!this.state.started} 
					text={btnText} 
					fn={this.closeGame}
				/>
					<Game detail = {this.state}/>
				</Div>
	}
}

export default App