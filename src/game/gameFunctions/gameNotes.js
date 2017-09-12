import bonusTotal from './bonusTotal'

export default function gameNotes()
{
  let notes={
    xp:this.hero.stats.xp,
    hp:this.hero.stats.hp,
    kills:this.hero.stats.killed,
    items:this.hero.stats.carrying()+'/'+this.hero.stats.capacity,
  }
  let bonusTotals = bonusTotal(this.hero.stats.bonuses)
 
  let canvas = document.getElementById('stats')
  if(canvas)
  {
    let ctx = canvas.getContext('2d')
    canvas.width = this.ctx.canvas.width
    canvas.height=50
    canvas.style.background='blue'
    ctx.fillStyle='#333'    
    ctx.fillRect(0,0,ctx.canvas.width,canvas.height)
    ctx.fillStyle='#fff'
    ctx.fillText(this.hero.coinsNeeded+' coins required ',30,30,100,100)
    Object.keys(notes).forEach((note,index)=>{
      ctx.fillStyle='#fff'
      ctx.font = 'bold 16px Arial'
      ctx.fillText(note+' : '+notes[note],30+(80*index),ctx.canvas.height-10,150)
    })
    bonusTotals.forEach((bonus,index)=>{
      ctx.font = 'bold 11px Arial'
      if(index===3)
      {
        ctx.fillText(bonus[0]+' qty: '+bonus[2],canvas.width-400,12,150)      
      }
      else if(index===4)
      {
        ctx.fillText('Weapon: '+bonus[0]+' qty: '+bonus[2]+' pow: '+bonus[1],canvas.width-300,10,250)      
      }
      else if(index===5)
      {
        ctx.fillText('Defence: '+bonus[0]+' qty: '+bonus[2]+' pow: '+bonus[1],canvas.width-300,20,250)      
      } 
    })

  }

}
