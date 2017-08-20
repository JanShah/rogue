export default function tick(elapsed) 
{
  // clear previous frame
  // compute delta time in seconds -- also cap it
  let delta = (elapsed - this.lastTime) / 1000.0;
        // maximum delta of 250 ms
  delta = Math.min(delta, 0.25); 
  this.lastTime = elapsed;
  this.getAll(delta);
  this.ticker = window.requestAnimationFrame(this.tick);

}