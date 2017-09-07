import heroMove from '../game/characters/hero/heroMove'
import drawLayer from '../game/gameFunctions/drawLayer'
import veil from '../game/characters/hero/veil'
import initialize from '../game/gameFunctions/initialize'
import visibility from '../game/gameFunctions/visibility'
import miniCanvas from '../game/gameFunctions/miniCanvas'
import run from '../game/gameFunctions/run'
// // import getXP from '../characters/getXP'
import getAll from '../game/gameFunctions/getAll'
import tick from '../game/gameFunctions/tick'
import drawEnemies from '../game/characters/enemy/drawEnemies'
import getSprite from '../game/characters/getSprite'
import drawSprite from '../game/characters/hero/drawSprite'
import animateSprite from '../game/characters/animateSprite'
import renderAll from '../game/gameFunctions/renderAll'
import spawnEnemy from '../game/characters/enemy/spawnEnemy'
import drawStats from '../game/gameFunctions/drawStats'
import statNumbers from '../game/gameFunctions/statNumbers'
import reduceBonuses from '../game/gameFunctions/reduceBonuses'  
import whatIsBonus from '../game/gameFunctions/whatIsBonus'  
import seeBonus from '../game/gameFunctions/seeBonus'
import drawBonus from '../game/gameFunctions/drawBonus'
import drawFloor from '../game/gameFunctions/drawFloor'


export default class {
  constructor(props) {
    // console.log('game props',props)
    this.enemies=[]
    this.menuPaths=[]
    this.loader= props.loader
  //   this.load = load
    this.init = initialize.bind(this,props)
    this.tick = tick.bind(this)
    this.run=run.bind(this)
    //initial sprite rotation
    this.rotations = [0,72]
    // this.getXP=getXP.bind(this)
    this.getAll=getAll.bind(this)
    this.drawEnemies=drawEnemies.bind(this,props)
    this.drawFloor=drawFloor.bind(this,props)
    this.getSprite=getSprite.bind(this)
    this.sa=0
    this.skipCount=0
    this.bonusTimer=600
    //animate sprite when walking
    this.animateSprite=animateSprite.bind(this)
    this.reduceBonuses=reduceBonuses.bind(this,props)   
    //main renders
    this.render = renderAll.bind(this)
    this.heroMove = heroMove.bind(this)
    this.spawnEnemy=spawnEnemy.bind(this,props)
    this.whatIsBonus = whatIsBonus.bind(this)
    this.seeBonus = seeBonus.bind(this)
    this.drawStats=drawStats.bind(this) 
    this.statNumbers=statNumbers.bind(this)
    this.drawSprite=drawSprite.bind(this)
    this.visibility=visibility.bind(this)
    this.veil = veil.bind(this)
    // this.miniCanvas=miniCanvas.bind(this,props)
    this.drawBonus= drawBonus.bind(this,props)
    let nap = {
      rows:props.map.rows,
      cols:props.map.cols
    }
    this.removeMarker=(x,y,layer)=>{
      // console.log('removing marker',x,y)
      props.updateMap([y*nap.cols+x],layer)
    }
     this.drawLayer =  drawLayer.bind(this,props)
  }

  //constructor end
}
