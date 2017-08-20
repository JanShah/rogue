import moveRoom from './moveRoom'
import rw from '../../general/functions/rw'

export default function overlap(thisRoom,lastRoom) 
{
	// console.log(this)
	this.moveRoom = moveRoom.bind(this)
	let t = thisRoom
	let l = lastRoom
	let tc = t.centrePoint
	let lc = l.centrePoint
	let move
	if(tc.x>=lc.x) 
	{
		move = {x:tc.x+3,y:tc.y}
	}
	else if(tc.x<lc.x) 
	{
		move = {x:tc.x-1,y:tc.y}
	}
	if(tc.y>=lc.y) 
	{
		move = {x:tc.x,y:tc.y+3}
	} 
	else if(tc.y<lc.y) 
	{
		move = {x:tc.x,y:tc.y-1}
	} 

	return this.moveRoom(thisRoom,move)
}
