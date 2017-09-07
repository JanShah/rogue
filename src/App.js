import React, { Component } from 'react'
import { optionMinMax,presetData,boxGrid } from './constants/'
import {players} from './constants/'
import Div from './components/layout/div/'
import Box from './components/layout/box/'
import Container from './components/layout/container/'
import Loader from './components/images/Loader'
import characterAnims from './options/characterAnims'
import Rooms from './game/roomGenerator/Rooms'
import showGame from './game/demo/'
import Game from './game/'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';

const OptionSlider = (props) => {
	let changeValue=(event,value)=>
	{
		props.onChange(props.what,event,value)
	}

 	return <MuiThemeProvider>
    <Slider 
			min={props.what.min}
      max={props.what.max}
      step={props.step|1}
      value={props.value}
      onChange={changeValue.bind(this)} />
	</MuiThemeProvider>
};

const Button = (props)=>(
	<MuiThemeProvider>
	<RaisedButton 
		style={{borderRadius:'0',backgroundColor:'#fff'}}
  	label={props.value}
		onClick={props.onClick}
		secondary={props.secondary}
		fullWidth={true}
		/>
	</MuiThemeProvider>
)

class SliderGroup extends Component
{
	constructor()
	{
		super()
		this.state={
			visible:false
		}
	}
	show(){
		this.setState({
			visible:!this.state.visible
		})
	}
	render()
	{
		let style = {
			display:!this.state.visible?'none':'block'
		}
		let outerStyle={
			height:!this.state.visible?'0px':'94px',
			transition:'all .3s ease-in-out'}
		
		return (
		<div style={outerStyle}>
			<Button 
			onClick={this.show.bind(this)}
			value={this.props.what.label+' '+this.props.optionValue}
			/>
			<div style={style}>
				<OptionSlider 
					value={this.props.optionValue}
					what={this.props.what}
					onChange={this.props.onChange.bind(this)}
				/>
			</div>			
		</div>
		)
	}

}

class App extends Component {
	constructor () {
		super() 
		let options = optionMinMax()
		let width = window.innerWidth
		let loader = new Loader()
		loader.preload()
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
		let inti = setInterval(()=>{
			if(this.refs.loadedAsset.style.height==='0px')
			{
				console.log(this.refs.loadedAsset.style.height)
				clearInterval(inti)
				this.changeWindow()
			}
		},100)
	}

	getCSS() {
		let width = window.innerWidth
		let cols = width<500?1:width<800?2:width<1400?3:4
		let visibleMenu = width<500?false:true
		this.setState({
			cols:cols,
			window: {
					width:width,
					height:window.innerHeight,
					visibleMenu:visibleMenu
				}
			
		})
	}

	changeWindow() {
		this.getCSS()
	}

	changeDefaults(what,event,value) {
		if(what.name==='height') {
			this.setState({
				size: {
					h:value,
					w:this.state.size.w
				}
			})
		} 
		else	if(what.name==='width') 
		{
			this.setState({
				size: {
					w:value,
					h:this.state.size.h
				}
			})
		} 
		else	if(what.name==='grid') {
			this.setState({
				game:null
			})
		} 
		this.setState({
			[what.name]: value				
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
			<SliderGroup 
				buttonValue={this.state[p]}
				optionValue={this.state[p]}
				what={o[p]}
				onChange={this.changeDefaults.bind(this)}
			/>
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
		return (!this.state.loader.loaded)
		? <Button 
				secondary={!this.state.started} 
				value={'Load Players'} 
				onClick={this.changeWindow}
			/>
		: <Button 
				secondary={this.state.started} 
				value={this.state.sex==='f'?'choose Boy':'choose Girl'} 
				onClick={this.boyGirl}
			/>				
	}

	showSampleGrid(grid) {
		showGame({
			sampleGrid:grid.dungeon.render,
			grid:this.state.grid,
			started:this.state.started,
			clicker:this.closeGame.bind(this)
		})
	}

	componentDidUpdate() {
		this.sampleGrid = this.state.game?this.state.game:new Rooms(this.state)
		this.showSampleGrid(this.sampleGrid);
	}

	saveMap(event) {
		this.setState({
			game:this.sampleGrid
		})
	}

	clearMap() {
		this.setState({
			game:null
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
		
		let saveButton = (!this.state.game)
		?<Button 
			secondary={this.state.game} 
			value={'Save this map'}
			onClick={this.saveMap}/>
			:<Button 
			value={'clear saved'} 
			onClick={this.clearMap.bind(this)}/>
		let newButton =<Button 
			secondary={!this.state.started} 
			value={'get new map'}
			onClick={this.clearMap.bind(this)}/>
		
		
			
		let menuStyle = {
			listStyleType:'none',	
			WebkitMarginStart:0,
			WebkitMarginBefore:0,
			WebkitPaddingStart:0,
			marginTop: '0px',
			paddingLeft: '0px'
		}
		let w = window.innerWidth<500?1:window.innerWidth<800?3:6
		let wSmaller = window.innerWidth<500?1:window.innerWidth<800?2:5
		let menuInnerStyle = {
			display:'inline-block',
			width:'calc(100%/'+w+')'	
		}
		let menuInnerSmallStyle = {
			display:'inline-block',
			width:'calc(100%/'+wSmaller+')'	
		}

		return ( 
			<Div>
				<div ref='loadedAsset' id='loader'></div>

				<ul style = {menuStyle}>
					{Object.keys(bGrid).map((box,key)=>
						<li style={menuInnerStyle} key={key}>
							{box!=='player'?this.getBoxSlider(bGrid[box])
							:null}
						</li> 
					)}
				</ul>
				<ul style = {menuStyle}>
					<li style={menuInnerSmallStyle} >
						<Button 
							secondary={!this.state.started} 
							value={btnText} 
							onClick={this.closeGame}
						/>
					</li>					
					<li style={menuInnerSmallStyle} >
						{this.loadButton(playerlist.name[0])}
					</li>

					<li style={menuInnerSmallStyle} >
						<Button 
							secondary={!this.state.started} 
							value={
								p===4
								?''+presets[1].level
								:'lvl: '+presets[p+1].level
							} 
						onClick={this.presets}
						/>
					</li>
					<li style={menuInnerSmallStyle} >{newButton}</li>		
					<li style={menuInnerSmallStyle} >{saveButton}</li>
					</ul>
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
								<canvas id={'pm_'+player} 
									width='225'
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
						<canvas id='gameDemo' />
						</Box>
					</Container>
				</Div>

			</Div>
		)
	}
		
	render() {
		let btnText = this.state.started?' End ':'Start'
		return !this.state.started
			?	this.getContainer()
			:	<Div>
				<Button 
					secondary={!this.state.started} 
					value={btnText} 
					onClick={this.closeGame}
				/>
					<Game detail={this.state}/>
				</Div>
	}
}

export default App