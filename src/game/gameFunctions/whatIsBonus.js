import { bonusNames } from '../../constants/'

export default function whatIsBonus(ctx,region) 
{
  //show what each bonus is.
  let r = region[0].id
  //console.log(bonusNames[r][0])
  ctx.fillStyle='#fff'
  ctx.font='1.2em Arial'
  ctx.fillText(bonusNames()[r][1],10,18)
  ctx.font='0.7em Arial'
  ctx.fillText(bonusNames()[r][3]+' Value: '+bonusNames()[r][4],10,35)

}