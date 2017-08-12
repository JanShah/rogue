import Room from './Room'
import Point from './Point'
import Size from './Size'


export default function moveRoom(room,move) 
{
	let newRoom = new Room()
	newRoom.sizes(new Size({h:10,w:10}))
	newRoom.centre(new Point(move))
	return newRoom
}
