
export default function (props) { 
  let markedforDeletion;
  if(this.enemies.length) {
    this.enemies.forEach((a,b)=>{ 
      a.screenX = a.x-this.camera.x-a.width/2
      a.screenY = a.y-this.camera.y-a.height/2
      if(a.hp<0) {
        markedforDeletion=b+1
      }
      this.ctx.drawImage(
        a.image,
        ...a.rotations, 
        a.width,a.height, 
        a.x-this.camera.x-a.width/2,a.y-this.camera.y-a.height/2, 
        a.width, a.height)
    })
  }
  if(markedforDeletion) {
    props.notifier('Vanquished an Enemy')
    this.enemies.splice(markedforDeletion-1,1)
    this.hero.stats.killed+=1
    this.hero.stats.xp+=1
  }
}