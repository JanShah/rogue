import { bonusNames } from '../../constants/'


export default function reduceBonuses(props) 
{
  let stats = this.hero.stats.bonuses
  if(stats[9]||stats[10]||stats[11]||stats[12])
    this.bonusTimer--
  if(this.bonusTimer<0) 
  {
    props.notifier('a map bonus has depleted')
    this.bonusTimer=100
    //reduce one bonus at a time, whichever found first from last to first
    for(let i = 12;i>=9;i--)
    {
      if(stats[i])
      { 
        this.bonusTimer = bonusNames()[i][4] //get the timer value of the last bonus
        this.hero.stats.bonuses[i]-=1; 
        this.drawStats() 
        return;
      }
    }
  }
}