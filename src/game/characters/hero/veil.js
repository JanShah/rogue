
export default function veil()
{
  let nap = {
    width:800,
    height:600
  }
  //get the hero position
  let x = Math.floor(this.hero.screenX)
  let y = Math.floor(this.hero.screenY)
  //limited visibility
  let vis = this.hero.visibility
  let ao= this.hero.stats.hp/100     
  this.ctx.fillStyle='rgba(50,50,50,0)'
  this.ctx.shadowBlur = 10;
  //fill the entire screen black 
  this.ctx.fillRect(0,0,nap.width,nap.height)
  this.ctx.shadowColor = '#000';
  this.ctx.shadowBlur = 30;
  //mask inner circle destionation-out or atop both seem to work
  this.ctx.globalCompositeOperation = 'destination-in'
  this.ctx.beginPath();
  //as the hero loses energy, the circle area will become darker.
  this.ctx.fillStyle='rgba(0,0,0,'+(ao+0.2)+')'
  //cut out a circle
  this.ctx.arc(x, y,vis, 0, 2*Math.PI, false);
  this.ctx.fill();
  this.ctx.restore();
}