import Room from './Room'
import Point from './Point'


export default function moveRoom(room,move) 
{
	let newRoom = new Room()
	newRoom.sizes(room.size)
	newRoom.centre({point:new Point(move),grid:this.grid})
	return newRoom
}
