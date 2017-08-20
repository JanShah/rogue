export default function statNumbers(details) 
{
  //return a red circle with the bonus quantities inside
  let bonuses = this.hero.stats.bonuses
  details.ctx.beginPath()
  details.ctx.arc(details.x+48*(details.pos)+5,details.arca,10,0,2*Math.PI);
  details.ctx.fillStyle='red'
  details.ctx.fill();
  details.ctx.fillStyle= 'white'
  let bPos = 48
  let bY = details.bY
  let bX = details.x+bPos*(details.bPos)
  if (bonuses[details.bonus]>9) {
    details.ctx.font = '.7em Arial'; 
    bY-=2
    bX-=2
  } 
  else 
  {
    details.ctx.font = '1em Arial'; 
  }
  details.ctx.fillText(bonuses[details.bonus],bX,bY)
} 