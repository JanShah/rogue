export default function showGame(room) {
	let height
	let scale = room.started?10:room.grid>74?3:4
	let width = height = room.grid*scale
	let grid = room.sampleGrid
	let canvas = document.getElementById('gameDemo')
	if(canvas) {
		canvas.width = width
		canvas.height = height
		let ctx = canvas.getContext('2d');
		ctx.scale(scale,scale)
		ctx.clearRect(0,0,width,height)
		let y=-1
		let x=-1;

		// floor:1,
		// test2:2,
		// wall:3,
		// corridor:4,
		// altWall:5,
		// red:6,
		// centre:8,
		// test:9
		let cellColor=
		{
			0:'#444',
			1:'#7f8472',
			2:'#727f84',
			3:'#7a3f7b',
			4:'#7f8472',
			5:'white',
			6:'red',
			8:'yellow',
			9:'#2a2254'
		}
		grid.forEach((cell,id)=>{
			ctx.fillStyle=cellColor[cell]	
			x+=1
			if(id%room.grid===0) {
				// console.log('new row',id,y)
				x=0
				y+=1
			}
			ctx.fillRect(x,y,1,1)
		})

	}
}
