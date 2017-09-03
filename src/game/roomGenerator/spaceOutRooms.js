import overlap from './overlap'

export default function spaceOutRooms() 
{
	let overlapped=1
	let tries = 0;
	let d = this;
	this.overlap = overlap.bind(this)
	while(overlapped)
	{
		let count = d.length-1
		if (tries>50) {
			break
		};
		overlapped = 0;
		while(count)
		{
			// console.log(tries)
			for(let room = 0;room<d.length;room++)
			{
				if(room!==count)
				{
					let dr = d[room]//this room
					let dc = d[count]//compare with this room
					//allow one extra overlap
					let overlap = 2
					let rule = 	
					dr.br.x+overlap>=dc.tl.x &&
					dr.tl.x-overlap<=dc.br.x &&
					dr.br.y+overlap>=dc.tl.y &&
					dr.tl.y-overlap<=dc.br.y   
					if(rule) {
						overlapped = 1;
						d[room] = this.overlap(d[room],d[count])
					}
				}
			}
			//reduce counter
			count-=1
		}
		tries++
	}

	return d
}