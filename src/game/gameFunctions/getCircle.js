export default function () {
  let x = Math.floor(this.hero.screenX)
  let y = Math.floor(this.hero.screenY)
  let color = this.hero.seenByEnemy?'rgba(200,0,0,0.2)':'rgba(0,200,0,0.1)'
  this.ctx.fillStyle=color
  this.ctx.beginPath();
  this.ctx.arc(x, y,60, 0, 2*Math.PI, false);
  this.ctx.fill(); //circle of safety
}