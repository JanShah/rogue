import overlap from './overlap'

export default function spaceOutRooms() 
{
	let dungeon = this;
	let count = dungeon.length-1
	while(count)
	{
		for(let room = 0;room<dungeon.length;room++)
		{
			if(room!==count)
			{
				let dr = dungeon[room]//this room
				let dc = dungeon[count]//compare with this room
				let rule = 	
				dr.br.x+1>=dc.tl.x &&//from left
				dr.tl.x-1<=dc.br.x &&//from right
				dr.br.y+1>=dc.tl.y &&//from top
				dr.tl.y-1<=dc.br.y   //from bottom
				if(rule) {
					dungeon[room] = overlap(dungeon[room],dungeon[count])
				}
			}
		}
		//reduce counter
		count-=1
	}

	return dungeon
}