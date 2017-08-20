import Point from './Point'
import Size from './Size'
import rw from '../../general/functions/rw'

export default function applyCentre() 
{
	let d  = this
	for(let centre =0;centre<d.length;centre++) 
	{
		let x,y
		if(!centre)
		{
			x=d.grid/2
			y=d.grid/2
		}
		else
		{
			x = rw(10,d.grid-10)
			y = rw(10,d.grid-10)
		}
		d[centre].sizes(new Size(d.maxSize))
		d[centre].centre({point:new Point({x:x,y:y,grid:d.grid}),grid:d.grid})
	}
	return d
}