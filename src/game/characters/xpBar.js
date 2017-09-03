export default function xpBar(who) 
{
  const canvas = document.getElementById('game')
  //draw xp bar
  if(canvas)
  {
  	const ctx = canvas.getContext('2d')
    ctx.fillStyle=who.fill
    ctx.fillRect(...who.coords)
    //outline for the xp bar
    ctx.strokeRect(...who.stroke)
  }
}