import near from './near'

export default function () 
{
	let d = this
	let returnGrid=[]
	for(let y = 0;y<d.grid;y++) 
	{
		for(let x = 0;x<d.grid;x++) 
		{
			if(y===0 || y%d.grid===d.grid-1 || x===0 || x%d.grid===d.grid-1) 
			{
				returnGrid.push(9)
			} 
			else 
			{
				returnGrid.push(0)
			}
		}    
	}
	let spot = 
	{
		floor:1,
		test2:2,
		wall:3,
		corridor:4,
		altWall:5,
		red:6,
		centre:8,
		test:9
	}
	let addRooms = (room)=>
	{
		let colorSpot = 	spot.floor
		let tl = room.tl
		let br = room.br
		for(let y = tl.y;y<=br.y;y++)
		{
			for(let x = tl.x;x<=br.x;x++)
			{
				returnGrid[y*d.grid+x] = colorSpot
			}			
		}
	}

	let addSpotToRooms = (room) =>
	{
		returnGrid[room.point] = spot.centre
	}

	let getNearestSpot = (room)=>
	{
		let x = room.centrePoint.x
		let y = room.centrePoint.y
		let nearest=100000
		let bestRoom;
		d.map(point =>{
			let nearX = Math.abs(point.centrePoint.x-x)
			let nearY = Math.abs(point.centrePoint.y-y)
			let nearRoom = near({x:nearX,y:nearY})
			if (nearRoom<nearest&&nearRoom>0&&!point.neighbour)
			{
				nearest = nearRoom
				bestRoom = point
			}
			if(!bestRoom)
			{
				let item = d.filter(a=>{
					return a.point<2000&&a.point>1000
				})
				bestRoom = item[0] || d[0]
			}		
		})	
		room.nearest(bestRoom)
	}

	let addEastCorridors = (room) =>
	{
		let startX = room.centrePoint.x
		let y = room.centrePoint.y
		let endX = room.neighbour.centrePoint.x
		if(startX<endX)
		{
			for(let x = startX;x<=endX;x++)
			{
				let point = y*d.grid+x
				returnGrid[point] = spot.corridor
			}
		}
	}

	let addWestCorridors = (room)=>
	{
		let startX = room.neighbour.centrePoint.x
		let y = room.centrePoint.y
		let endX = room.centrePoint.x
		if(startX<endX)
		{
			for(let x = startX;x<=endX;x++)
			{
				let point = y*d.grid+x
				returnGrid[point] = spot.corridor
			}
		}
	}

	let addNorthCorridors = (room)=>
	{
		let startY = room.centrePoint.y
		let x = room.neighbour.centrePoint.x
		let endY = room.neighbour.centrePoint.y
		if(startY<endY)
		{
			for(let y = startY;y<=endY;y++)
			{
				let point = y*d.grid+x
				returnGrid[point] = spot.corridor
			}
		}
	}
	
	let addSouthCorridors = (room)=>
	{
		let startY = room.neighbour.centrePoint.y
		let x = room.neighbour.centrePoint.x
		let endY = room.centrePoint.y
		if(startY<endY)
		{
			for(let y = startY;y<=endY;y++)
			{
				let point = y*d.grid+x
				returnGrid[point] = spot.corridor
			}
		}
	}

	let addOutline = grid => {
		let size = d.grid
		// console.log(...grid)
		grid.forEach((a,b)=>
		{
			let n = {
				a:b-size,
				b:b+size,
				l:b-1,
				r:b+1
			}
			let rule = (grid[n.b]||grid[n.r])
			if(!grid[b]&&rule&&b)
			{
			grid[b] = spot.wall
			// console.log('n:',n,rule,a)
			}
		})
		grid.reverse().forEach((a,b)=>
		{
			let n = {
				a:b-size,
				b:b+size,
				l:b-1,
				r:b+1
			}
			let rule = (grid[n.b]||grid[n.r])
			if(!grid[b]&&rule&&b)
			{
			grid[b] = spot.wall
			// console.log('n:',n,rule,a)
			}
		})
		grid.reverse()
	}

	d.sort((a,b)=>
	{
		return a.point>b.point
	})

	if(d.length>1)
	{
		for(let room = 0;room<d.length;room++)
		{
			getNearestSpot(d[room])
			addEastCorridors(d[room])
			addWestCorridors(d[room])	
			addNorthCorridors(d[room])
			addSouthCorridors(d[room])

		}
		for(let room = 0;room<d.length;room++)
		{
			addRooms(d[room])
		 	addSpotToRooms(d[room])
		}	
		addOutline(returnGrid)	
	}

	//add render to dungeon object
	d.render = returnGrid
	return d
}
