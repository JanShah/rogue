import bonusTotal from './bonusTotal'

export default function gameNotes() {
  let notes={
    xp:this.hero.stats.xp,
    hp:this.hero.stats.hp,
    kills:this.hero.stats.killed,
    items:this.hero.stats.carrying()+'/'+this.hero.stats.capacity,
  }
  let bonusTotals = bonusTotal(this.hero.stats.bonuses)
 
  let canvas = document.getElementById('stats')
  if(canvas) {
    let ctx = canvas.getContext('2d')
    canvas.width = this.ctx.canvas.width
    canvas.height=50
    canvas.style.background='blue'
    ctx.fillStyle='#333'    
    ctx.fillRect(0,0,ctx.canvas.width,canvas.height)
    Object.keys(notes).forEach((note,index)=>{
      ctx.fillStyle='#fff'
      ctx.font = 'bold 16px Arial'
      ctx.fillText(note+' : '+notes[note],30+(80*index),ctx.canvas.height-10,150)
    })
    bonusTotals.forEach((bonus,index)=>{
      ctx.font = 'bold 16px Arial'
      if(index===3) {
        if(bonus[2]>=this.hero.coinsNeeded) {
          ctx.font = 'bold 18px Arial'
          ctx.fillStyle='#60e052'
          ctx.fillText('An Exit has appeared, find it and win!!',30,15,350)      
        } else {
          ctx.fillText(bonus[0]+' qty: '+bonus[2]+' / '+this.hero.coinsNeeded,30,12,250)      
        }
        ctx.fillStyle='#fff'        
      } else if(index===4) {
        ctx.fillText('Best Weapon: '+bonus[0]+' Power: '+bonus[1],canvas.width-400,30,300)      
      }
      else if(index===5) {
        ctx.fillText('Best Defence: '+bonus[0]+' Power: '+bonus[1],canvas.width-400,46,300)      
      } 
    })

  }

}
