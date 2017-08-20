export default function visibility() 
{
  let bonus = this.hero.stats.bonuses[10]
      //set the visible range
  switch (bonus) 
  {
    case 0:
      this.hero.visibility = 200;
      break;
    case 1:
      this.hero.visibility = 230;
      break;
    case 2:
      this.hero.visibility = 240        
      break;
    case 3:
      this.hero.visibility = 260        
      break;
    case 4:
      this.hero.visibility = 300        
      break;
    case 5:
      this.hero.visibility = 350        
      break;
    case 6:
      this.hero.visibility = 400        
      break;
    case 7:
      this.hero.visibility = 600        
      break;
    default:
      break;
  }
  if(bonus>7) this.hero.visibility = 900

}