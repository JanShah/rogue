export default function renderAll(sprite) 
{
  //save the canvas state
  this.ctx.save()
  // draw map background layer
  this.drawLayer(0);
  // draw map rooms
  this.drawLayer(1);
  //draw bonuses
  this.drawLayer(2);
  // draw enemy markers
  this.drawLayer(3)
  //draw the enemies as they spawn
  this.drawEnemies()
  //draw mini map
  // this.miniCanvas()
  // draw main character
  this.drawSprite(sprite)
  //shadow surrounding the player
}