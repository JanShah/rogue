export default function run (canvas) 
{
  this.ctx=canvas.getContext('2d');
  //change scale to see more //change camera scale to match as multiple
  // this.ctx.scale(.3,.3)
  this.lastTime = 0
  
  this.init();
  let start=()=>
  {
    this.ticker= window.requestAnimationFrame(this.tick);
  }
  start()
  this.endGame = () =>{
  this.ticker = window.cancelAnimationFrame(this.ticker);
  this.ticker=0
  }
}
