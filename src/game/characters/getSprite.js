export default function getSprite (who) 
{
  this.sprite=
  [
    who.image,
    ...this.rotations,
    who.width,
    who.height,
    who.screenX - who.width / 2,
    who.screenY - who.height / 2,
    who.width, who.height
  ]
}