import Keyboard from  '../../gameFunctions/Keyboard'
// import TouchEvents from  '../../gameFunctions/TouchEvents'

export default function heroMove(delta)
{
  // handle hero movement with arrow keys
  let dirx = 0;
  let diry = 0;
  // TouchEvents()
  if (Keyboard.isDown(Keyboard.LEFT)||Keyboard.isDown(Keyboard.LEFT1)) {
    dirx = -1;
    //animatesprite.. it's tuned to the hero sprite
    this.animateSprite('left')
  }
  else if (Keyboard.isDown(Keyboard.RIGHT)||Keyboard.isDown(Keyboard.RIGHT1)) {
    dirx = 1;
    this.animateSprite('right')
  }
  else if (Keyboard.isDown(Keyboard.UP)||Keyboard.isDown(Keyboard.UP1)) {
    this.animateSprite('up')
    diry = -1;
  }
  else if (Keyboard.isDown(Keyboard.DOWN)||Keyboard.isDown(Keyboard.DOWN1)) {
    this.animateSprite('down')
    diry = 1;
  }
  this.hero.move(delta, dirx, diry);
  this.camera.update();
}