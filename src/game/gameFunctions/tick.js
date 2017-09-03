export default function tick(elapsed) 
{
  // clear previous frame
  // compute delta time in seconds -- also cap it
  let delta = (elapsed - this.lastTime) / 1000.0;
        // maximum delta of 250 ms
  delta = Math.min(delta, 0.25); 
  this.lastTime = elapsed;
  this.getAll(delta);
  if(this.hero.stats.hp<1)
  {
    this.ctx.fillStyle='#1a1b1a'
    this.ctx.fillRect(0,300,this.ctx.canvas.width,100)
    this.ctx.font='bold 80px Arial'
    this.ctx.fillStyle='white'
    this.ctx.fillText('GAME OVER',20,380,this.ctx.canvas.width)
    this.ticker = window.cancelAnimationFrame(this.tick)
    this.ticker=0
  }
  else
  {
    this.ticker = window.requestAnimationFrame(this.tick);    
  }
}