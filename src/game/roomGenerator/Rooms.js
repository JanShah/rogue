//props used
// grid : number
// size : object w: number, h: number
// rooms: number

import renderDungeon from './renderDungeon'
import applyCentre from './applyCentre'
import spaceOutRooms from './spaceOutRooms'
import trimRooms from './trimRooms'
import Room from './Room'

function makeRoomCoords(props)
{
	let dungeon				= []
	dungeon.grid 			= props.grid
	dungeon.maxSize 	= props.size
	dungeon.maxRooms 	= props.rooms

	let apply 	 			=	applyCentre.bind(dungeon)
	let spaceOut	  	=	spaceOutRooms.bind(dungeon)
	let trimmer  			=	trimRooms.bind(dungeon)
	let renderGrid  	=	renderDungeon.bind(dungeon)

	//create empty rooms
	for( let point = 0; point < dungeon.maxRooms; point++ ) 
	{
		dungeon.push(new Room())
	}
	//apply starting points and size.
	apply()
	//space rooms out a bit 
	spaceOut();
	//trim the excess
	trimmer()
	//add corridors and convert grid to 1d array
	renderGrid()

	return dungeon
}

export default class Rooms 
{
	constructor(props) 
	{
		this.dungeon = makeRoomCoords(props)
	}
}

