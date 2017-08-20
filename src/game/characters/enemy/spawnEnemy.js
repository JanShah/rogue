import Enemy from './Enemy'

export default function spawnEnemy(props,enemy)
{
  let aNewEnemy = new Enemy(
  {
    map:props.map,
    loader:this.loader, 
    x:enemy.x,
    y:enemy.y,
    id:enemy.id,
    ref:enemy.ref
  })
  let enCount = 0
  if(!enCount) {
    enCount+=1
    this.enemies.push(aNewEnemy)
    props.notifier('an enemy has spawned')
    props.notifier('there are now '+this.enemies.length+' Enemies')
  }
}