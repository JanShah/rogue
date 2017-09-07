import rw from '../../../general/functions/rw'
import { bonusNames } from '../../../constants/'

export default class Stats {
  constructor(props) {
  // console.log(bonusNames())
    this.hp=rw(0,100)
    if(!props) {
    this.maxHP = 150;
    this.hp=150
    this.bonuses={14:5,17:1,10:1,22:1,29:1,27:5}
    this.capacity=this.bonuses[14]*bonusNames()[14][4]
    this.killed = 0
    this.pickedBonuses = 0
    // this.weapons=[]

    
    this.carrying=()=>Object.keys(this.bonuses).map(key=>{
      return this.bonuses[key]
    }).reduce((a,b)=>a+b)
    }
    //9 for maps
    this.xp=10
    this.strength=this.strength()
  }
  strength() {

    let weapons = Object.keys(bonusNames()).filter(a=>{
      let num = bonusNames()[a][2]
      let value = num===4&&Object.keys(this.bonuses).includes(a)?bonusNames()[a]:null
      console.log(value)
      return value
    })
    
    console.log(weapons)
    return this.xp
  }
}
