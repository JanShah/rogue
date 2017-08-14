import rw from '../../general/functions/rw'

export default function renderd() 
{
	let d = this
	let returnGrid=[]
	for(let y = 1;y<=d.grid;y++) 
	{
		for(let x = 1;x<=d.grid;x++) 
		{
			if(y===1 || y%d.grid===0 || x===1 || x%d.grid===0) 
			{
				returnGrid.push(9)
			} 
			else 
			{
				returnGrid.push(0)
			}
		}    
	}


	let findNearest = (compare) => {
		let nearest = 10000
		let room
		d.filter((a,b)=>{
			let lowest = Math.abs(a.cartesian-compare.cartesian)
			if(lowest && lowest<nearest && !a.taken) {
				nearest = lowest
				a.taken=1

				room = a
			} 
			else if(!lowest)
			{
				room = d[0]
			}
		})
		return room
	}


	let corridor = 2
	let floor = 3
	let outline = 4
	let wall = 5
	let centreSpot = 8
	let blue = 7
	let green = 9
	if(d.length>1)
	{	
		for(let corridors = 0;corridors < d.length;corridors++) 
		{
			let thisRoom = d[corridors]
			let nearRoom = findNearest(thisRoom)
			let startX = thisRoom.centrePoint.x
			let targetX = nearRoom.centrePoint.x
			let startY = thisRoom.centrePoint.y
			let targetY = nearRoom.centrePoint.y
			let x,y
			x = {
				start:startX,
				end:targetX
			}
			y = {
				start:startY,
				end:targetY
			}
			for(let up = y.start;up<=y.end;up++) {
				let gridRef 
				if(up===y.end) {
					gridRef = (up+1)*d.grid+(x.start-1)
					returnGrid[gridRef] = outline
				}										
				gridRef = up*d.grid+x.start
				let wallLeft = gridRef-1
				let wallRight = gridRef+1
				returnGrid[wallLeft] = (returnGrid[wallLeft]===0||returnGrid[wallLeft]===floor)?outline:returnGrid[wallLeft]
				returnGrid[wallRight] = (returnGrid[wallRight]===0||returnGrid[wallRight]===floor)?outline:returnGrid[wallRight]
				returnGrid[gridRef] = corridor
				
			}

			for(let up = y.end;up<=y.start;up++) {
				let gridRef
				if(up===y.end) {
					gridRef = (up-1)*d.grid+(x.start+1)
					returnGrid[gridRef] = outline
				}						
				gridRef = up*d.grid+x.start
				let wallLeft = gridRef-1
				let wallRight = gridRef+1
				returnGrid[wallLeft] = (returnGrid[wallLeft]===0)?outline:returnGrid[wallLeft]
				returnGrid[wallRight] = (returnGrid[wallRight]===0)?outline:returnGrid[wallRight]
				returnGrid[gridRef] = corridor
						}

			for(let right = x.end;right<=x.start;right++) {
				let gridRef
				if(right===x.start) {
					gridRef = (y.end+1)*d.grid+(right+1)
					returnGrid[gridRef] = outline
				}		
				gridRef = y.end*d.grid+right		
				let gridAbove = (y.end-1)*d.grid+right
				let gridBelow = (y.end+1)*d.grid+right
				returnGrid[gridAbove] = returnGrid[gridAbove]===0?outline:returnGrid[gridAbove]
				returnGrid[gridBelow] = returnGrid[gridBelow]===0?outline:returnGrid[gridBelow]
				returnGrid[gridRef] = corridor
			}

			for(let right = x.start;right<=x.end;right++) {
				let gridRef
				if(right===x.start) {
					gridRef = (y.end-1)*d.grid+(right-1)
					returnGrid[gridRef] = returnGrid[gridRef]===0?outline:returnGrid[gridRef]

				}
				gridRef = y.end*d.grid+right
				let gridAbove = (y.end-1)*d.grid+right
				let gridBelow = (y.end+1)*d.grid+right
				returnGrid[gridAbove] = returnGrid[gridAbove]===0?outline:returnGrid[gridAbove]
				returnGrid[gridBelow] = returnGrid[gridBelow]===0?outline:returnGrid[gridBelow]
				returnGrid[gridRef] = corridor
			}

			// console.log(thisRoom.centrePoint,nearRoom)


		}
	}


	for(let dCorners = 0;dCorners < d.length;dCorners++) 
	{
		let tl = d[dCorners].tl
		let br = d[dCorners].br
		for(var y = tl.y;y<br.y;y++) 
		{
			for(var x = tl.x;x<br.x;x++) 
			{
				if(y===tl.y) 
				{
					let gridRef = (y-1)*d.grid+x
					returnGrid[gridRef] = returnGrid[gridRef]===0?outline:returnGrid[gridRef]
					returnGrid[gridRef-1] = returnGrid[gridRef-1]===0?outline:returnGrid[gridRef-1]
					returnGrid[gridRef+1] = returnGrid[gridRef+1]===0?outline:returnGrid[gridRef+1]
				}
				if(y===br.y-1) 
				{
					let gridRef = (br.y)*d.grid+x
					returnGrid[gridRef] = returnGrid[gridRef]===0?outline:returnGrid[gridRef]		
					returnGrid[gridRef-1] = returnGrid[gridRef-1]===0?outline:returnGrid[gridRef-1]
					returnGrid[gridRef+1] = returnGrid[gridRef+1]===0?outline:returnGrid[gridRef+1]
							
				}				
				if(x===tl.x) 
				{
					let gridRef = y*d.grid+x-1
					returnGrid[gridRef] = returnGrid[gridRef]===0?outline:returnGrid[gridRef]
				}
				if(x===br.x-1) 
				{
					let gridRef = y*d.grid+br.x
					returnGrid[gridRef] = returnGrid[gridRef]===0?outline:returnGrid[gridRef]					
				}
				returnGrid[y*d.grid+x] = floor
			}
		}
	}

	for(let dCentre = 0;dCentre < d.length;dCentre++) 
		{
			let x = d[dCentre].centrePoint.x
			let y = d[dCentre].centrePoint.y
			let gridRef = y*d.grid+x
			returnGrid[gridRef] = centreSpot
		}
	d.render = returnGrid
	return d
}