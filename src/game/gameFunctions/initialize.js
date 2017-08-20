import Hero from    '../characters/hero/Hero'
import Camera from  '../../gameBoard/Camera'
import Keyboard from  './Keyboard'

export default function initialize(props) 
{
  let nap = {
    width:800,
    height:600
  }
  //keyboard event listeners active
  Keyboard.listenForEvents([
    Keyboard.LEFT, 
    Keyboard.RIGHT, 
    Keyboard.UP, 
    Keyboard.DOWN,
    Keyboard.LEFT1, 
    Keyboard.RIGHT1, 
    Keyboard.UP1, 
    Keyboard.DOWN1
  ]);
  //load the major assets
  //tileAtlas includes wall, floors, bonuses etc  
  this.tileAtlas = this.loader.getImage('tiles');
  //screen menu is the box on the right
  this.screenMenu = this.loader.getImage('screen')
  //initial hero
  this.hero = new Hero({
    loader:this.loader, 
    map:props.map,
    updateMap:props.updateMap.bind(this),
    drawStats:this.drawStats.bind(this),
    notifier:props.notifier,
    x:400, y:400,
    enemies:this.enemies
  });
  props.notifier('Hero is on the move')
  //camera setup
  this.camera = new Camera({
    map:props.map, 
    width:nap.width, 
    height:nap.height
  });
  props.notifier('Camera view is active')
  this.camera.follow(this.hero);
  this.position=()=>{
    return [this.hero.x,this.hero.y];
  }
    

}