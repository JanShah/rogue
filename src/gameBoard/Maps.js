import Layer from './Layer'
import Rooms from '../game/roomGenerator/Rooms'
import rw from '../general/functions/rw'
class BonusLayer {
  constructor(props) {
    let odds = 100-props[1]
    this.cells = props[0].map(cell=>{
      let newCell
      if(cell>=100&&cell<=120)
      {
        if(rw(0,100)>odds)
        {
          newCell = rw(6,40)
        }
        else
        {
          newCell = cell
        } 
      }
      else if(cell===800)
      {
        newCell = 13 //add the obligatory coin to the centre of each room
      }
      else if(cell===0) 
        {
          newCell = 4      
        }
      else
      {
        newCell = cell        
      }
        return newCell
    })
  }
}

class Enemies {
  constructor(props) {
    let odds = 100-props[1]
    this.cells = JSON.parse(JSON.stringify(props[0]))
    .map((a,b)=>{
      return (a>=100&&a<=120)?
      rw(0,100)>odds?rw(41,48):0
      :0
    })
  }
}

export default class Maps {
  constructor(props)  {
    this.cols=props.detail.grid
    this.rows=props.detail.grid
    let game
    if(!props.detail.game)
    {
      game = new Rooms(props.detail)
    }
    else
    {
      game = props.detail.game
    }

    let dt = props.detail
    this.tsize=64
    this.bsize=23

    this.startingPoint = game.dungeon.startingPoint
    let floorLayer = new Layer({grid:this.cols,no:3})
    let rooms = game.dungeon.render
    console.log(game)
    let bonuses = new BonusLayer([rooms,dt.bonuses]).cells
    let enemies = new Enemies([bonuses,dt.enemies]).cells
    this.roomcount = game.dungeon.length
    this.layers=[floorLayer, rooms, bonuses, enemies]
    this.getTile=(index,col,row)=>{return this.layers[index][row * this.cols + col]}

    this.makeTrail = (x,y)=>{ this.layers[2][x * this.cols + y] = 39}
    this.whatTile=(x,y)=>{
      let col = Math.floor(x / this.tsize);
      let row = Math.floor(y / this.tsize);
      return this.layers.reduce((res, layer, index)=> {
        let tile = this.getTile(index, col, row);
        let thisTile = false;
        //wall tiles
        if(tile ===5) thisTile=true;
        //bonus tiles
        if(tile>5&&tile<39&&tile!==14) thisTile = ['bonus',[(row*this.cols)+col],tile]
        //backpack
        if(tile===14) thisTile = ['backpack',[(row*this.cols)+col],tile]
        return res || thisTile;
      }, false);
    }

  
    this.getCol =(x)=> {
      return Math.floor(x / this.tsize);
    }
    this.getRow = (y)=> {
      return Math.floor(y / this.tsize);
    }
    this.getX   = (col)=> {
      return col * this.tsize;
    }
    this.getY   = (row)=> {
      return row * this.tsize;
    }
  }
}
