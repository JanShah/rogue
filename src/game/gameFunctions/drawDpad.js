export default function() {
	let dpad = this.loader.getImage('dpad')
	//0 64 up
	//64 64 centre
	//64 128 down 
	//128 128 right
	//0 64 left
	this.ctx.drawImage(dpad,64,128,64,64,this.ctx.canvas.width-64,this.ctx.canvas.height-64,64,64)
}