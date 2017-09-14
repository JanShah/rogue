import rw from '../../../general/functions/rw'
import positions from '../positions'
import getHP from '../getHP'
import hpBar from '../hpBar'
let newDelta;
export default class Enemy {
  constructor(props) {
    this.doMove =()=>{
      let validMoves = [
        [0,-1],
        [0,1],
        [1,0],
        [-1,0],
        [0,0]
      ]
      return validMoves[rw(0,4)]
    }
    this.heroMax = 90
    this.getHP = getHP.bind(this)

    let move = this.doMove()
    this.seenHero = false
    this.mover = [0.01,...move]
    this.changeDirection=rw(60,250)
    this.map= props.map
    this.hp = rw(this.heroMax-30,this.heroMax)
    this.id=props.id
    this.x= props.x
    this.y = props.y
    this.rotations=[0,0]
    this.frameWidth=96
    this.frameHeight=188
    this.width= 32
    this.height= 47
    this.xp = rw(6,15)
    this.image=props.loader.getImage('enemies'+props.ref)
    this.SPEED=rw(240,290)
    this.skip = 7 //skip frames to slow down walking animation
    this.positions = positions.bind(this)
    this.visibility = rw(150,220)
    this.stuck=false
    this.healthWarning = ()=>this.hp<30
    //this fight is called by the hero.

    this.whichDirection=directions=>{
      let a = directions[0]
      let b = directions[1]
      let xdif = Math.floor(a[0]-b[0])
      let ydif = Math.floor(a[1]-b[1])
      if(ydif>26&&ydif<42) {
        return [0.01,0,-1] //above
      }
      if(ydif>-42&&ydif<-26) {
        return [0.01,0,1] //below
      }
      if(xdif>-42&&xdif<-26) {
        return [0.01,1,0]  //right
      }
      if(xdif>26&&xdif<42) {
        return [0.01,-1,0]  //left
      }  
    }
    this.seeHero = (heroPos)=>{
      let one = Math.abs(heroPos[0]-this.x)
      let two = Math.abs(heroPos[1]-this.y)
      if(one<this.visibility&&two<this.visibility) {
        this.seenHero=true
        let x = heroPos[0]>this.x?1:-1
        x = one>10?x:0
        let y = x?0:heroPos[1]>this.y?1:-1
        this.mover=[0.01,x,y]
      } else {
        this.seenHero = false
      }
    }
    this.fight = function (hero) {
      hpBar(this.getHP({hp:this.hp,x:this.screenX+30,y:this.screenY+25,xp:this.xp}))
      this.move(...this.mover)
      let p  = this.positions()
      let rt = p.top<hero.bottom // from top
      let rb = p.bottom>hero.top //hit from bottom
      let rl = p.right>hero.left //from right
      let rr = p.left<hero.right //from left
      if(!this.healthWarning()&&!this.stuck) {
        this.seeHero(hero.xy)
      } else {
        this.seenHero = false;
      }
      let rules = rt&&rb&&rl&&rr
      if(rules) {
        let hits = {
          top:p.top,
          left:p.left,
          right:p.right,
          bottom:p.bottom,
          xy:[this.x,this.y]
        }
        let movement = this.whichDirection([[this.x,this.y],hero.xy])
        if(movement){
          if(!this.healthWarning()) {
            this.mover=movement
          } else {
            let move = this.doMove()
            this.mover=[0.01,...move]
          }
        }
        this.heroMax+=1
        this.hp-=Math.floor(hero.xp*.5)
        return {hit:rules,...hits,hitPoints:this.xp}
      } else {
        return {hit:rules}
      }
    }
    this.collide = function (dirx, diry) {
      this.changeDirection-=1
      if(!this.changeDirection) {
        this.stuck = false          
        this.mover=[newDelta,...this.doMove()]
        this.changeDirection=rw(100,250)
      }
      var row, col;
      let p  = this.positions()
      let lt = this.map.whatTile(p.left, p.top)
      let rt = this.map.whatTile(p.right, p.top)
      let rb = this.map.whatTile(p.right, p.bottom)
      let lb = this.map.whatTile(p.left, p.bottom)
      var collision = lt||rt||rb||lb
      if (!collision||
          collision[0]=== 'bonus'||
          collision[0]=== 'backpack') { 
          return; 
      } else {
        this.stuck = true
        let move = this.doMove()
        this.mover=[newDelta,...move]
        this.changeDirection= 20                
      }
      if (diry > 0) {
        row = this.map.getRow(p.bottom);
        this.y = -this.height / 2 + this.map.getY(row);
      } else if (diry < 0) {
        row = this.map.getRow(p.top);
        this.y = this.height / 2 + this.map.getY(row + 1);
      } else if (dirx > 0) {
        col = this.map.getCol(p.right);
        this.x = -this.width / 2 + this.map.getX(col);
      } else if (dirx < 0) {
        col = this.map.getCol(p.left);
        this.x = this.width / 2 + this.map.getX(col + 1);
      }
    };
    this.move=(delta,dirX,dirY)=> {
      newDelta = delta
      this.skip-=1
      if(dirX>0) {
        this.rotations[1]=94
      } else if(dirX<0) {
        this.rotations[1]=47
      } else if(dirY>0) {
        this.rotations[1]=0        
      } else if(dirY<0) {
        this.rotations[1]=141
      }
      if(this.skip<=0&&(dirY!==0||dirX!==0)) {
        this.rotations[0]+=32
        this.skip=7
      }
      if(this.rotations[0]>=96) {
        this.rotations[0]=0
      }
      this.x+= dirX * this.SPEED * delta
      this.y+= dirY * this.SPEED * delta
      this.collide(dirX,dirY)
      var maxX = this.map.cols * this.map.tsize;
      var maxY = this.map.rows * this.map.tsize;
      this.x = Math.max(0, Math.min(this.x, maxX));
      this.y = Math.max(0, Math.min(this.y, maxY));
    }
  }    
}