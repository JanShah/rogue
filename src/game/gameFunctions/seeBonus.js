export default function seeBonus(x,y) 
{
  //alternative to addHitRegion, 
  //check the xy co-ordinates of the menu to see if there is an overlap of the mouse coordinates
  let ret = this.menuPaths.filter((coords,ref)=>{
    let rule = 
      x>=coords.t[0]&&
      y>=coords.t[1]&&
      x<coords.b[0]&&
      y<coords.b[1]
      //if it passes, return it's reference
    if(rule)
      return ref
  })
  return ret
}
