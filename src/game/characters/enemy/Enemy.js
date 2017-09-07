import rw from '../../../general/functions/rw'
import positions from '../positions'
import getHP from '../getHP'
import xpBar from '../xpBar'
let newDelta;

export default class Enemy {
  constructor(props) 
  {
    
    this.heroMax = 90
    this.getHP = getHP.bind(this)
    this.moveY = ()=>rw(-1,1)
    this.moveX = ()=>this.moveY===0?1:0
    this.mover = [0.01,this.moveX(),this.moveY()]

    if(!this.mover[1]&&!this.mover[2]) 
    {
      this.mover[1] = -1
    }
    this.changeDirection=rw(100,250)
    this.map= props.map
    this.hp = rw(this.heroMax-50,this.heroMax)
    this.id=props.id
    this.x= props.x
    this.y = props.y
    this.rotations=[0,0]
    this.frameWidth=96
    this.frameHeight=188
    this.width= 32
    this.height= 47
    this.xp = rw(20,90)
    this.image=props.loader.getImage('enemies'+props.ref)
    this.SPEED=rw(150,200)
    this.skip = 7 //skip frames to slow down walking animation
    this.positions = positions.bind(this)
    this.visibility = 150
    this.healthWarning = ()=>this.hp<30
    //this fight is called by the hero.

    this.whichDirection=directions=>{
      let a = directions[0]
      let b = directions[1]
      let xdif = Math.floor(a[0]-b[0])
      let ydif = Math.floor(a[1]-b[1])
      if(ydif>26&&ydif<42)
      {
        return [0.01,0,-1] //above
      }
      if(ydif>-42&&ydif<-26)
      {
        return [0.01,0,1] //below
      }
      if(xdif>-42&&xdif<-26)
      {
        return [0.01,1,0]  //right
      }
        
      if(xdif>26&&xdif<42)
      {
        return [0.01,-1,0]  //left
      }  
    }


    this.seeHero = (heroPos)=>{
      let one = Math.abs(heroPos[0]-this.x)
      let two = Math.abs(heroPos[1]-this.y)
      if(one<this.visibility&&two<this.visibility)
      {
        // console.log('seen on XY')
        let x = heroPos[0]>this.x?1:-1
        x = one>10?x:0
        let y = x?0:heroPos[1]>this.y?1:-1
        this.mover=[0.01,x,y]
      }
        // console.log(heroPos,this.x,this.y)

    }


    this.fight = function (hero) 
    {

      xpBar(this.getHP({hp:this.hp,x:this.screenX+30,y:this.screenY+25}))
      this.move(...this.mover)
      let p  = this.positions()
      // console.log(p,hero)
      let rt = p.top<hero.bottom // from top
      let rb = p.bottom>hero.top //hit from bottom
      let rl = p.right>hero.left //from right
      let rr = p.left<hero.right //from left
      // console.log(p,rt,rb,rl,rr)

      if(!this.healthWarning()) 
      {
        this.seeHero(hero.xy)
      }

      let rules = rt&&rb&&rl&&rr
      if(rules) 
      {
        let hits = 
        {
          top:p.top,
          left:p.left,
          right:p.right,
          bottom:p.bottom,
          xy:[this.x,this.y]
        }
        let movement = this.whichDirection([[this.x,this.y],hero.xy])
        if(movement)
        {
          if(!this.healthWarning()) {
            this.mover=movement
          } else {
            this.mover=[0.01,-movement[1],-movement[2]]
          }
        }
        // this.whichDirection([[this.x,this.y],hero.xy])
        let hitPoints = Math.floor(Math.floor(hero.xp/2))
        // console.log('enemy took hit: '+ hitPoints)
        this.hp-=hitPoints

        return {hit:rules,...hits,xp:this.xp,hitPoints:Math.floor(hitPoints)}
      } 
      else 
      {
        return {hit:rules}
      }
    }
    this.collide = function (dirx, diry) 
    {
        this.changeDirection-=1
        if(!this.changeDirection) 
        {
          let moveX = this.moveX()
          let moveY =this.moveY()
          this.mover=[newDelta,moveX,moveY]
          
          if(!this.mover[1]&&!this.mover[2]) 
          {
            this.mover[1] = 2
          }
          this.changeDirection=rw(200,250)
        }
        var row, col;
        let p  = this.positions()
        let lt = this.map.whatTile(p.left, p.top)
        let rt = this.map.whatTile(p.right, p.top)
        let rb = this.map.whatTile(p.right, p.bottom)
        let lb = this.map.whatTile(p.left, p.bottom)

        var collision = lt||rt||rb||lb
        
          if (
          !collision||
          collision[0]=== 'bonus'||
          collision[0]=== 'backpack') 
          { 
            return; 
          } 
          else 
          {
            if(lb&&lt){
              
              this.mover=[newDelta,1,0] //move right
            } //left
            if(lt&&rt) {
              // this.rotations=[64,94]
              this.mover=[newDelta,0,1] //move down

            } //top
            if(rb&&lb){
              // this.rotations=[96,0]
              
              this.mover=[newDelta,0,-1]
            }
              //bottom
            if(rb&&rt) {
              this.mover=[newDelta,-1,0]

            }


          }

        if (diry > 0) 
        {
            row = this.map.getRow(p.bottom);
            this.y = -this.height / 2 + this.map.getY(row);
        }
        else if (diry < 0) 
        {
            row = this.map.getRow(p.top);
            this.y = this.height / 2 + this.map.getY(row + 1);
        }
        else if (dirx > 0) 
        {
            col = this.map.getCol(p.right);
            this.x = -this.width / 2 + this.map.getX(col);
        }
        else if (dirx < 0) 
        {
            col = this.map.getCol(p.left);
            this.x = this.width / 2 + this.map.getX(col + 1);
        }
    };
    this.move=(delta,dirX,dirY)=> 
    {
     
      newDelta = delta
      this.skip-=1
      if(dirX>0)
      {
        this.rotations[1]=94
        //moving down
        // console.log(dirX)
      }
      else if(dirX<0)
      {
        this.rotations[1]=47
      }
      else if(dirY>0)
      {
        this.rotations[1]=0        
      }
      else if(dirY<0)
      {
        this.rotations[1]=141
        
      }
      
      if(this.skip<=0)
      {
        this.rotations[0]+=32
        this.skip=7
      }

      if(this.rotations[0]>=96)
      {
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