
export default function trimRooms() 
{
	let dungeon = this
	let mark =[]
	dungeon.forEach((a,b)=>{
		if (a.br.y>=dungeon.grid-2||a.tl.y<=2||a.br.x>=dungeon.grid-2||a.tl.x<=2)
		{
			mark.push(b)
		}
	})
	mark.reverse().forEach(num=>{
		dungeon.splice(num,1)
	})
}