export default function showGame(room) {
	let height
	let scale = room.grid<=70?5:room.grid<80?4:room.grid<100?3:room.grid<=150?3:2
	//room.grid<=50?6:room.grid<80?5:room.grid<100?4:room.grid<150?3:2
	let width = height = room.grid*scale
	let grid = room.sampleGrid
	let canvas = document.getElementById('gameDemo')
	if(canvas) {
		canvas.width = width
		canvas.height = height
		let ctx = canvas.getContext('2d');
		let drawGrid=()=>{
			grid.forEach((cell,id)=>{
				if(cell>=100&&cell<=120)
				{
					ctx.fillStyle=cellColor[101]	
				}
				else
				{
					ctx.fillStyle=cellColor[cell]	
				}
				x+=1
				if(id%room.grid===0) {
					// console.log('new row',id,y)
					x=0
					y+=1
				}
				ctx.fillRect(x,y,1,1)
			})
			// ctx.fillStyle='grey'
			// ctx.fillRect(0,0,canvas.width,7)
	
		}
		canvas.style.cursor='pointer'
		canvas.style.boxShadow='none'
		canvas.style.transition='all 0.1s'
		canvas.addEventListener('mouseover',()=>{
			ctx.fillStyle='rgba(255,255,255,0.7)'
			ctx.font='bold 5px Arial'
			ctx.fillText('click Start to play',2,5,100)
			canvas.style.boxShadow='1px 1px 1px 1px rgba(0,0,0,0.5)'
		})

		canvas.addEventListener('mouseout',()=>{
			canvas.style.boxShadow='0px 0px 0px 0px rgba(0,0,0,0)'
		})			

		ctx.scale(scale,scale)
		ctx.clearRect(0,0,width,height)
		let y=-1
		let x=-1;
		// floor:rw(100,120),
		// test2:2,
		// wall:5,
		// corridor:2,
		// altWall:5,
		// red:6,
		// centre:8,
		// test:9,
		// start:999,
		// exit:200

		let cellColor=
		{
			0:'#444',
			1:'skyblue',
			2:'skyblue',
			3:'#7a3f7b',
			4:'#7f8472',
			5:'#2b2525',
			6:'red',
			8:'yellow',
			9:'#2b2525',
			40:'grey',
			101:'#00bcd4',
			999:'green',
			200:'red'
		}
		drawGrid()

	}
}
