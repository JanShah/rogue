import Hero from    '../characters/hero/Hero'
import Camera from  '../../gameBoard/Camera'
import { bonusNames } from  '../../constants/'
import Keyboard from  './Keyboard'

function gameNotes()
{
let notes={
  xp:this.hero.stats.xp,
  hp:this.hero.stats.hp,
  kills:this.hero.stats.killed,
  items:this.hero.stats.carrying()+'/'+this.hero.stats.capacity,
}
let bonuses = this.hero.stats.bonuses
let bonusTotals = []
Object.keys(bonuses).forEach(bonus=>{
  let bonusCategory = bonusNames()[bonus][2]
  let bonusName = bonusNames()[bonus][1]
  let bonusValue = bonusNames()[bonus][4]
  let qty = bonuses[bonus]
  if(!bonusTotals[bonusCategory]&&qty>0)
  {
    bonusTotals[bonusCategory]=[bonusName,bonusValue,qty]   
  }
  else if(bonusTotals[bonusCategory]&&bonusValue>bonusTotals[bonusCategory][1]&&qty>0)
  {
    bonusTotals[bonusCategory]=[bonusName,bonusValue,qty]
  }

})
let canvas = document.getElementById('stats')
if(canvas)
{
  let ctx = canvas.getContext('2d')
  canvas.width = this.ctx.canvas.width
  canvas.height=37
  canvas.style.background='blue'
  ctx.fillStyle='#333'
  ctx.fillRect(0,0,ctx.canvas.width,canvas.height)
  Object.keys(notes).forEach((note,index)=>{
    // console.log(gap)
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

export default function initialize(props) 
{
  // console.log('initialise game: ',props)
  let nap = {
    width:props.canvas.width,
    height:props.canvas.height
  }
  //keyboard event listeners active
  Keyboard.listenForEvents([
    Keyboard.LEFT, 
    Keyboard.RIGHT, 
    Keyboard.UP, 
    Keyboard.DOWN,
    Keyboard.LEFT1, 
    Keyboard.RIGHT1, 
    Keyboard.UP1, 
    Keyboard.DOWN1
  ]);
  //load the major assets
  //tileAtlas includes wall, floors, bonuses etc  
  this.tileAtlas = this.loader.getImage('tiles');
  this.floorTile = this.loader.getImage('floor');
  //screen menu is the box on the right
  this.screenMenu = this.loader.getImage('screen')
  //initial hero
  this.hero = new Hero({
    hero:props.hero,
    loader:this.loader, 
    map:props.map,
    updateMap:props.updateMap.bind(this),
    drawStats:this.drawStats.bind(this),
    notifier:props.notifier,
    x:2400, y:2400,
    enemies:this.enemies
  });
  this.gameNotes = gameNotes.bind(this)
  props.notifier('Hero is on the move')
  //camera setup
  this.camera = new Camera({
    map:props.map, 
    width:nap.width, 
    height:nap.height
  });
  props.notifier('Camera view is active')
  this.camera.follow(this.hero);
  this.position=()=>{
    return [this.hero.x,this.hero.y];
  }
}