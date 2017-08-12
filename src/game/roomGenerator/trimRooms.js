
export default function trimRooms() 
{
	let dungeon = this
	dungeon.filter((a,b)=>{
		if (a.br.y>dungeon.grid||a.tl.y<0)
			dungeon.splice(b,1)
	})
	return dungeon
}