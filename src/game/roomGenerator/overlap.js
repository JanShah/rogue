import moveRoom from './moveRoom'

export default function overlap(thisRoom,lastRoom) 
{
	let t = thisRoom
	let l = lastRoom
	let tc = t.centrePoint
	let lc = l.centrePoint
	let diff,move
	if(tc.x>lc.x) 
	{
		diff = l.br.x-t.tl.x
		move = {x:tc.x+(diff+2),y:tc.y}
		if(diff<=t.size.w)
			thisRoom = moveRoom(thisRoom,move)
		//move right/left
	}
	if(tc.y>lc.y) 
	{
		diff = l.br.y-t.tl.y
		move = {x:tc.x,y:tc.y+(diff+4)}
		if(diff<t.size.h)
			thisRoom = moveRoom(thisRoom,move)
		//move down/up
	} 
	return thisRoom
}
