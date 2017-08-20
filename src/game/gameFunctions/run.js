export default function run (canvas) 
{
  this.ctx=canvas.getContext('2d');
  //change scale to see more //change camera scale to match as multiple
  //this.ctx.scale(.5,.5)
  let ticker
  this.lastTime = 0
  let p = this.load();
  Promise.all(p).then(function () 
  {
    this.endGame = () =>{
    window.cancelAnimationFrame(this.ticker);
  }
    //initialise a new game
    this.init();
    //this is outside animation loop so updates are manual.. 
    this.ticker= window.requestAnimationFrame(this.tick);
    this.drawStats() 
  }.bind(this));
}
