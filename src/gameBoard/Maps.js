import Layer from './Layer'
import Rooms from '../game/roomGenerator/Rooms'
import rw from '../general/functions/rw'
class BonusLayer {
  constructor(props) {
    this.cells = props.map(cell=>{
      let newCell
      if(cell===1||cell===2||cell===3)
      {
        if(rw(0,100)>85)
        {
          // console.log('valid cell')
          newCell = rw(6,9)
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
    let odds = 55
    this.cells = JSON.parse(JSON.stringify(props))
    .map((a,b)=>{
      return (a===1)?
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
      game = new Rooms(props.detail).dungeon.render
    }
    else
    {
      game = props.detail.game.dungeon.render
    }
    this.tsize=64
    this.bsize=23
    let floorLayer = new Layer({grid:this.cols,no:1})
    let rooms =game
    props.notifier('generated rooms')
    let bonuses = new BonusLayer(rooms).cells
    props.notifier('generated bonuses')
    let enemies = new Enemies(bonuses).cells
    props.notifier('generated enemies')

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
