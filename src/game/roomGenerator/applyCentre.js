import Point from './Point'
import Size from './Size'
import rw from '../../general/functions/rw'

export default function applyCentre() 
{
	let d  = this
	for(let centre =0;centre<d.length;centre++) 
	{
		let x = rw(10,d.grid-d.maxSize.w)
		let y = rw(10,d.grid-d.maxSize.h)
		d[centre].sizes(new Size(d.maxSize))
		d[centre].centre(new Point({x:x,y:y}))
	}
	return d
}