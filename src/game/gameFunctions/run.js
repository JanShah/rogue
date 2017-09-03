export default function run (canvas) 
{
  this.ctx=canvas.getContext('2d');
  //change scale to see more //change camera scale to match as multiple
  // this.ctx.scale(.3,.3)
  this.lastTime = 0
  let p = ()=>this.loader.images
  
  this.init();
  let start=()=>
  {
    this.ticker= window.requestAnimationFrame(this.tick);
  }
  start()
  this.endGame = () =>{
  //  console.log('ending game',cancelAnimationFrame(this.ticker))
  this.ticker = window.cancelAnimationFrame(this.ticker);
  this.ticker=0
  }
  // this.drawStats() 

  // console.log(this.loader.images)

  // Promise.all(p).then(function () 
  // {
  
  //   //initialise a new game
  //   //this is outside animation loop so updates are manual.. 
  // }.bind(this));
}
