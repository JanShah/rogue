export default function tick(elapsed) {
  // console.log(this)
  // clear previous frame
  // compute delta time in seconds -- also cap it
  let delta = (elapsed - this.lastTime) / 1000.0;
        // maximum delta of 250 ms
  delta = Math.min(delta, 0.25); 
  this.lastTime = elapsed;
  this.getAll(delta);
  if(this.hero.stats.hp<1||this.hero.wins) {
    this.ticker = window.cancelAnimationFrame(this.tick)
    this.ticker=0
    this.ctx.fillStyle='#1a1b1a'
    this.ctx.fillRect(0,260,this.ctx.canvas.width,120)
    if(this.hero.stats.hp<1) {
      this.ctx.font='bold 80px Arial'
      this.ctx.fillStyle='white'
      this.ctx.fillText('GAME OVER',130,340,this.ctx.canvas.width)
      this.ctx.font='bold 20px Arial'
      this.ctx.fillText('Collect shields and weapons as quickly as possible to help you win',80,370,this.ctx.canvas.width)
    } else if (this.hero.wins) {
      this.ctx.font='bold 80px Arial'
      this.ctx.fillStyle='white'
      this.ctx.fillText('YOU WON!!! ',140,340,this.ctx.canvas.width)
      this.ctx.font='bold 15px Arial'
      this.ctx.fillText('You can make the game more challenging by changing the options on the main menu. Well done :)',30,370,this.ctx.canvas.width-20)
      
    }
  } else {
    this.ticker = window.requestAnimationFrame(this.tick);    
  }
}