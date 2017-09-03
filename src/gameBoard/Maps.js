import Layer from './Layer'
import Rooms from '../game/roomGenerator/Rooms'
import rw from '../general/functions/rw'
class BonusLayer {
  constructor(props) {
    this.cells = props.map(cell=>{
      let newCell
      if(cell>=100&&cell<=120)
      {
        if(rw(0,100)>90)
        {
          // console.log('valid cell')
          newCell = rw(6,39)
        }
        else
        {
          newCell = cell
        } 
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
    let odds = 90
    this.cells = JSON.parse(JSON.stringify(props))
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

    console.log(game.dungeon.startingPoint)
    this.tsize=64
    this.bsize=23
    this.startingPoint = game.dungeon.startingPoint
    let floorLayer = new Layer({grid:this.cols,no:1})
    let rooms = game.dungeon.render
    let bonuses = new BonusLayer(rooms).cells
    let enemies = new Enemies(bonuses).cells
    
    this.layers=[floorLayer, rooms, bonuses, enemies]
    this.getTile=(index,col,row)=>{return this.layers[index][row * this.cols + col]}

    this.makeTrail = (x,y)=>{ this.layers[0][x * this.cols + y] = 2}
    this.whatTile=(x,y)=>{
      let col = Math.floor(x / this.tsize);
      let row = Math.floor(y / this.tsize);
      return this.layers.reduce((res, layer, index)=> {
        let tile = this.getTile(index, col, row);
        let thisTile = false;
        //wall tiles
        if(tile >2 && tile <6) thisTile=true;
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
