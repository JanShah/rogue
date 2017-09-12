import { bonusNames } from  '../../constants/'

export default function (bonuses)
{
  // let bonuses = this.hero.stats.bonuses
  let bonusTotals = []
  Object.keys(bonuses).forEach(bonus=>{
    let bonusCategory = bonusNames()[bonus][2]
    let bonusName = bonusNames()[bonus][1]
    let bonusValue = bonusNames()[bonus][4]
    let qty = bonuses[bonus]
    if(!bonusTotals[bonusCategory]&&qty>0)
    {
      bonusTotals[bonusCategory]=[bonusName,bonusValue,qty,bonus]   
    }
    else if(bonusTotals[bonusCategory]&&bonusValue>bonusTotals[bonusCategory][1]&&qty>0)
    {
      bonusTotals[bonusCategory]=[bonusName,bonusValue,qty,bonus]
    }

  })
  return bonusTotals;
}