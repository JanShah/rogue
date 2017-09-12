import Hero from    '../characters/hero/Hero'
import Camera from  '../../gameBoard/Camera'
import Keyboard from  './Keyboard'
import gameNotes from './gameNotes'

export default function initialize(props) 
{
  let nap = {
    width:props.canvas.width,
    height:props.canvas.height
  }
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
  //tileAtlas includes wall, floors, bonuses etc  
  this.tileAtlas = this.loader.getImage('tiles');
  this.floorTile = this.loader.getImage('floor');
  //screen menu is the box on the right
  this.screenMenu = this.loader.getImage('screen')
  this.hero = new Hero({
    hero:props.hero,
    loader:this.loader, 
    map:props.map,
    updateMap:props.updateMap.bind(this),
    drawStats:this.drawStats.bind(this),
    notifier:props.notifier,
    x:2400, y:2400,
    enemies:this.enemies
  });
  this.gameNotes = gameNotes.bind(this)
  props.notifier('Hero is on the move')
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