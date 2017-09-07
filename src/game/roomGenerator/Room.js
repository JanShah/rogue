// import near from './near'

export default class 
{
	centre(props) 
	{
		this.centrePoint = props.point
		this.grid = props.grid
		let coords = this.centrePoint.y*this.grid+this.centrePoint.x
		
		this.point= coords	
			
		this.tl = 
		{
			x: Math.floor(this.centrePoint.x - this.size.w / 2),
			y: Math.floor(this.centrePoint.y - this.size.h / 2)
		}
		this.br= 
		{
			x: Math.floor(this.centrePoint.x + this.size.w / 2),
			y: Math.floor(this.centrePoint.y + this.size.h / 2)
		}
	}
	sizes(props)
	{
		this.size = props
	}

	nearest(props) {
		this.neighbour = props
	}

}