export default function renderDungeon() 
{
	let dungeon = this
	let returnGrid=[]
	let grid = dungeon.grid
	for(let y = 1;y<=grid;y++) 
	{
		for(let x = 1;x<=grid;x++) 
		{
			if(y===1 || y%grid===0 || x===1 || x%grid===0) 
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
		dungeon.forEach((a,b)=>{
			let lowest = Math.abs(a.cartesian-compare.cartesian)
			if(lowest && lowest<nearest && !a.taken) {
				nearest = lowest
				room = a
				a.taken = true
			} 
			else
			{
				room = dungeon[b-1]
			}
		})
		return room
	}

	let blue = 7
	let red = 6
	let green = 9
	if(dungeon.length>1)
	{	
		for(let corridors = 0;corridors < dungeon.length;corridors++) 
		{
			let thisRoom = dungeon[corridors]
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
				let gridRef = up*grid+x.start
				let wallLeft = gridRef-1
				let wallRight = gridRef+1
				
					returnGrid[wallLeft] = returnGrid[wallLeft]===0?blue:returnGrid[wallLeft]
					returnGrid[wallRight] = returnGrid[wallRight]===0?blue:returnGrid[wallRight]
					returnGrid[gridRef] = red
				
			}

			for(let up = y.end;up<=y.start;up++) {
				let gridRef = up*grid+x.start
				let wallLeft = gridRef-1
				let wallRight = gridRef+1
				returnGrid[wallLeft] = returnGrid[wallLeft]===0?blue:returnGrid[wallLeft]
				returnGrid[wallRight] = returnGrid[wallRight]===0?blue:returnGrid[wallRight]
				returnGrid[gridRef] = red
						}

			for(let right = x.end;right<=x.start;right++) {
				let gridRef = y.end*grid+right
				let gridAbove = (y.end-1)*grid+right
				let gridBelow = (y.end+1)*grid+right
				returnGrid[gridAbove] = returnGrid[gridAbove]===0?blue:returnGrid[gridAbove]
				returnGrid[gridBelow] = returnGrid[gridBelow]===0?blue:returnGrid[gridBelow]
				returnGrid[gridRef] = red
			}

			for(let right = x.start;right<=x.end;right++) {
				let gridRef = y.end*grid+right
				let gridAbove = (y.end-1)*grid+right
				let gridBelow = (y.end+1)*grid+right
				returnGrid[gridAbove] = returnGrid[gridAbove]===0?blue:returnGrid[gridAbove]
				returnGrid[gridBelow] = returnGrid[gridBelow]===0?blue:returnGrid[gridBelow]
				returnGrid[gridRef] = red
			}

			// console.log(thisRoom.centrePoint,nearRoom)


		}
	}


	for(let dCorners = 0;dCorners < dungeon.length;dCorners++) 
	{
		let tl = dungeon[dCorners].tl
		let br = dungeon[dCorners].br
		for(var y = tl.y;y<br.y;y++) 
		{
			for(var x = tl.x;x<br.x;x++) 
			{
				if(y===tl.y) 
				{
					let gridRef = (y-1)*grid+x
					returnGrid[gridRef] = returnGrid[gridRef]===0?blue:returnGrid[gridRef]
				}
				if(y===br.y-1) 
				{
				let gridRef = (br.y)*grid+x
				returnGrid[gridRef] = returnGrid[gridRef]===0?blue:returnGrid[gridRef]					
				}				
				if(x===tl.x) 
				{
					let gridRef = y*grid+x-1
					returnGrid[gridRef] = returnGrid[gridRef]===0?blue:returnGrid[gridRef]
				}
				if(x===br.x-1) 
				{
				let gridRef = y*grid+br.x
				returnGrid[gridRef] = returnGrid[gridRef]===0?blue:returnGrid[gridRef]					
				}

				returnGrid[y*grid+x] = 5
			}
		}
	}

		for(let dCentre = 0;dCentre < dungeon.length;dCentre++) 
	{
		let x = dungeon[dCentre].centrePoint.x
		let y = dungeon[dCentre].centrePoint.y
		let gridRef = y*grid+x
		returnGrid[gridRef] = 8
	}
	dungeon.render = returnGrid
	return dungeon
}