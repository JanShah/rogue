// import Stats from './Stats'
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
    this.changeDirection=rw(50,250)
    this.map= props.map
    this.hp = rw(this.heroMax-50,this.heroMax)
    this.id=props.id
    this.x= props.x
    this.y = props.y
    this.frameWidth=96
    this.frameHeight=188
    this.width= 32
    this.height= 47
    this.xp = rw(20,90)
    this.image=props.loader.getImage('enemies'+props.ref)
    this.SPEED=rw(150,300)
    this.positions = positions.bind(this)
    this.healthWarning = ()=>this.hp<30

    //this fight is called by the hero.
    this.fight = function (hero) 
    {
      xpBar(this.getHP({hp:this.hp,x:this.screenX,y:this.screenY}))
      this.move(...this.mover)
      let p  = this.positions()

      // console.log(p,hero)
      let rt = p.top<=hero.bottom //hit from top
      let rb = p.bottom>=hero.top //hit from bottom
      let rl = p.right>=hero.left //from right
      let rr = p.left<=hero.right //from left
      // console.log(p,rt,rb,rl,rr)
      let rules = 
      rt&&
      rb&&
      rl&&
      rr

      // console.log(rl,rt,rr,rb)
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
        if(this.x<hero.xy[0]&&(hero.xy[1]-20<this.y&&hero.xy[1]+20>this.y)) 
        {
          console.log('enemy is left',this.healthWarning())
          this.move(newDelta,-10,0) //bounce off
          if(this.healthWarning())
          {
            this.mover=[newDelta,-3,0] //run away
          }
          else 
          {
            this.mover=[newDelta,3,0] //run towards
          }        
        }
        else if(this.x>hero.xy[0]&&(hero.xy[1]-20<this.y&&hero.xy[1]+20>this.y)) 
        {
          console.log('enemy is Right')
          this.move(newDelta,20,0)
          if(this.healthWarning())
          {
            console.log('running away')
            this.mover=[newDelta,3,0] //run away
           }
          else 
          {
            console.log('moving left')
            this.mover=[newDelta,3,0] //run away

          }
        }
        
        if(rr) 
        {
          this.move(newDelta,-2,0)
          if(this.healthWarning())
          {
            this.mover=[newDelta,-1,0] 
          }
          else 
          {
            this.mover=[newDelta,1,0]
          }
        }
        let hitPoints = Math.floor(Math.floor(hero.xp/2))
        console.log('enemy took hit: '+ hitPoints)
        this.hp-=hitPoints
        this.heroMax+=Math.floor(hitPoints/2)

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
          this.changeDirection=rw(20,200)
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
            if(lb&&lt) //left
              this.mover=[0.01,1,0] //move right
            if(lt&&rt) //top
              this.mover=[0.01,0,1] //move down
            if(rb&&lb) //bottom
              this.mover=[0.01,0,-1]
            if(rb&&rt)
              this.mover=[0.01,-1,0]


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