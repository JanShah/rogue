// import nap from '../../constants/nap'

export default function drawStats() 
{
  // //draws the stats on the right hand side of screen
  // let canvas = document.getElementById('bonuses')
  // canvas.height=600
  // let ctx =canvas.getContext('2d');
  // //event listener for bonus info
  // canvas.addEventListener('mousemove', (event)=> 
  // {
  //   let bound = canvas.getBoundingClientRect();
  //   let y = event.pageY-30 - bound.top;
  //   let x = event.pageX-10 - bound.left;
  //   let bonusToolTip = this.seeBonus(x,y)
  //   ctx.fillStyle='#000'
  //   ctx.fillRect(0,0,320,50)
  //   if (bonusToolTip.length) 
  //     this.whatIsBonus(ctx,bonusToolTip)
  // },false);

  // ctx.fillStyle='#333'
  // let x = 0
  // let bonuses = this.hero.stats.bonuses
  // let bonusKeys = Object.keys(bonuses)
  // let gap = 17
  // ctx.fillRect(0,0,320,750)
  // ctx.drawImage(this.screenMenu,x,50)
  // ctx.font='1em Arial'
  // ctx.fillStyle='#fff'
  // ctx.fillText('Hero Health: '+Math.round(this.hero.stats.hp),x+gap,40)      
  // ctx.fillText('Hero Defence: '+Math.round(this.hero.defence),x+gap,60)      
  // ctx.fillText('Hero XP: '+Math.round(this.hero.stats.xp),x+gap,80)      
  // if(bonusKeys.length) 
  // { 
    
  //   ctx.fillText('Hero bonuses ',x+gap,100)
  //   bonusKeys.forEach((a,b)=>
  //   {
  //     switch (a) 
  //     {
  //         //Gems (xp, weapon strength and armour strength)
  //       case '6': case '7': case '8':
  //         this.drawBonus(2,a,x+48*(a-6),90,ctx)
  //         this.statNumbers({ctx:ctx, bonus:a, pos: a-5, arca:140, x:x, bPos:a-5, bY:146})
  //        break;
  //       //coins  (wealth)
  //       case '13':
  //         this.drawBonus(2,a,x+48*(a-10),90,ctx)
  //         this.statNumbers({ctx:ctx, bonus:a, pos: a-9, arca:140, x:x, bPos:a-9, bY:146})
  //         break;
  //       //Maps (visibility)
  //       case '9': case '10': case '11': case '12':
  //         this.drawBonus(2,a,x+48*(a-9),170,ctx)
  //         this.statNumbers({ctx:ctx, bonus:a, pos: a-8, arca:220, x:x, bPos:a-8, bY:226})
  //         break;
  //       //backpack (capacity) 
  //       case '14':
  //         this.drawBonus(2,a,x+48*(a-10)+10,170,ctx)
  //         this.statNumbers({ctx:ctx, bonus:a, pos: a-9, arca:220, x:x, bPos:a-9, bY:226})
  //         break;
  //       //Potions
  //       case '26': case '27': case '28':
  //         this.drawBonus(2,a,x+48*(a-26),240,ctx)
  //         this.statNumbers({ctx:ctx, bonus:a, pos: a-25, arca:290, x:x, bPos:a-25, bY:296})
  //         break;
  //       //Swords  
  //       case '15': case '16': case '17':case '18': case '19':
  //         this.drawBonus(2,a,x+54*(a-15),300,ctx)
  //         this.statNumbers({ctx:ctx, bonus:a, pos: a-14, arca:350, x:x, bPos:a-14, bY:356})  
  //         break;
  //       //Hammer
  //       case '20': case '21':
  //         this.drawBonus(2,a,x+48*(a-20),360,ctx)
  //         this.statNumbers({ctx:ctx, bonus:a, pos: a-19, arca:410, x:x, bPos:a-19, bY:416})
  //         break;
  //       //Shields
  //       case '22': case '23': case '24': case '25':
  //         this.drawBonus(2,a,x+48*(a-22),420,ctx)
  //         this.statNumbers({ctx:ctx, bonus:a, pos: a-21, arca:470, x:x, bPos:a-21, bY:476})
  //         break;
  //       //Armour (protection)
  //       case '29': case '30': case '31': case '32':
  //         this.drawBonus(2,a,x+48*(a-29),480,ctx)
  //         this.statNumbers({ctx:ctx, bonus:a, pos: a-28, arca:530, x:x, bPos:a-28, bY:536})
  //         break;
  //       //Axe  
  //       case '33': case '34': case '35':
  //         this.drawBonus(2,a,x+64*(a-33),540,ctx)
  //         this.statNumbers({ctx:ctx, bonus:a, pos: a-32, arca:590, x:x, bPos:a-32, bY:596})
  //         break;
  //       //double handed axe
  //       case '36': case '37': case '38':
  //         this.drawBonus(2,a,x+54*(a-34),360,ctx)
  //         this.statNumbers({ctx:ctx, bonus:a, pos: a-33, arca:410, x:x, bPos:a-33, bY:416})              
  //         break;
  //       default:
  //         break;
  //     }
  //   })
  // }
}