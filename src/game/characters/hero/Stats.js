import rw from '../../../general/functions/rw'
import { bonusNames } from '../../../constants/'

export default class Stats {
  constructor(props) {
  console.log(bonusNames())
    this.hp=rw(0,100)
    if(!props) {
    this.maxHP = 150;
    this.hp=150
    this.bonuses={14:5,17:1,9:2}
    this.capacity=this.bonuses[14]*bonusNames()[14][4]
    this.killed = 0
    this.pickedBonuses = 0
    // this.weapons=[]
    this.carrying=4;
    }
    //9 for maps
    this.xp=10
    this.strength=this.strength()
  }
  strength() {

  }
}
