import { bonusNames } from '../../../constants/'
import { startBonus } from '../../../constants/'

export default class Stats {
  constructor(props) {
    this.maxHP = 200;
    this.hp=200
    this.xp=5
    if(props)
    {
      this.bonuses=startBonus(props.split('_')[0])   
      // console.log(startBonus(props.split('_')[0]))
    }
    else
    {
      this.bonuses={9:1,14:1}      
    }
    this.capacity=this.bonuses[14]*bonusNames()[14][4]
    this.killed = 0
    this.pickedBonuses = 0
    this.carrying=()=>Object.keys(this.bonuses).map(key=>{
      return this.bonuses[key]
    }).reduce((a,b)=>a+b)
  }
}
