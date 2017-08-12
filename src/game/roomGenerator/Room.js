import near from './near'

export default class 
{
	centre(props) {
		this.centrePoint = props
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
		this.cartesian = near(this.centrePoint)
	}
	sizes(props) {
		this.size = props
	}
}