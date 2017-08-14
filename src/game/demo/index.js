export default function showGame(room) {
	let height
	let scale = room.started?10:room.grid>74?2:3
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
		let gItems =[]
		grid.forEach((cell,id)=>{
			if(cell===1){
				ctx.fillStyle='#ca6e75'
			}
			else if(cell===5){
				ctx.fillStyle='#ca3e75'
			}
			else if(cell===6){
				ctx.fillStyle='#ca6e75'
			}
			else if(cell===4){
				ctx.fillStyle='#2a2254' //outline
			}
			else if(cell===8){
				ctx.fillStyle='yellow'
			}
			else if(cell===9){
				ctx.fillStyle='#2a2254'
			}
			else if(cell===2)ctx.fillStyle='green' 
			else if(cell===3)ctx.fillStyle='#666' //rooms
			else ctx.fillStyle='#8f6690'
			x+=1
			if(id%room.grid===0) {
				// console.log('new row',id,y)
				x=0
				y+=1
			}
			ctx.fillRect(x,y,1,1)
			gItems.push(x,y)
		})

	}
}
