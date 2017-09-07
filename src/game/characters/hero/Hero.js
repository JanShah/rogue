import Stats from './Stats'
import { bonusNames } from '../../../constants/'
import positions from '../positions'
import getHP from '../getHP'
import xpBar from '../xpBar'
let newDelta


export default class Hero {
  constructor(props) 
  {
    let startPoint = props.map.startingPoint
    this.stats=new Stats()
    this.map= props.map
    this.x= startPoint.x*props.map.tsize
    this.y = startPoint.y*props.map.tsize
    this.frameWidth=96
    this.frameHeight=144
    this.width= 32
    this.height= 36
    this.visibility=200
    this.defence=0;
    this.image=props.loader.getImage(props.hero)
    this.SPEED=256
    this.positions = positions.bind(this)
    let timer=200;
    this.heal=()=>{
      timer--
      if(!timer)
      {
        console.log('healing')
        this.stats.hp+=1
        timer=200          
      }
    }

    this.counts={
      potions:false,
      shield:false,
      armour:false

    }
    this.bonusUses={
      defPotion:0,
      shield:0,
      armour:0
    }
    this.hitCounter = 0
    this.weaponBonus=function()
    {
      //console.log(this.stats.weapons)
      
    }

    this.useHealthPots = function()
    {
      if(this.stats.bonuses[26]) {
        if(this.stats.hp+35<this.stats.maxHP)
        {
          props.notifier('used Healing Pot for 35')
          this.stats.hp+=35;
          if(this.stats.hp===this.stats.maxHP)
          {
            props.notifier('Fully Healed!')
          }
           this.stats.bonuses[26]-=1
        }
      }
    }

    this.useGems = function()
    {
      if(this.stats.bonuses[6]) 
      {
        props.notifier('Blue Gem: increased Max HP by 10')
        this.stats.maxHP+=10;
        this.stats.hp+=10;
        this.stats.bonuses[6]-=1
      }
      if(this.stats.bonuses[7]) 
      {
        if(this.stats.hp+20<this.stats.maxHP)
        {
          props.notifier('Green Gem: restored HP by 20')
          this.stats.hp+=20;
          this.stats.bonuses[7]-=1
        }
      }
      if(this.stats.bonuses[8]) 
      {
        props.notifier('Red Gem: increased XP by 5')
        this.stats.xp+=5
        this.stats.bonuses[8]-=1
      }
    }


    this.defenceBonus = function() 
    {
      //console.log('called for defence Bonus',this.defence)
      const bon = bonusNames()

      //defence pots
      if(this.stats.bonuses[27]) 
      {
        props.notifier('Potion  :'+bon[27][0]+' for '+bon[27][4]+ ' defence');
        console.log(this.bonusUses)
        this.bonusUses.defPotion+=1
        this.counts.potions=true
        if(!this.bonusUses.defPotion)
        {
          this.defence += bon[27][4]
          //console.log('adding potion',this.defence)
        }
        if(this.bonusUses.defPotion>5) 
        {
          props.notifier(bon[27][0]+'emptied. Dropped')          
          this.stats.bonuses[27]-=1
          this.defence -= bon[27][4]
          this.bonusUses.defPotion=0;

          //console.log('removing potion',this.defence)
          
          
        }
      } else 
      {
        this.counts.potions = false;
      }
      //end defence potions

      for(let i = 25; i>=22;i--) 
      {
        // console.log('called for shields')
        if(this.stats.bonuses[i]) 
        {
          this.counts.shield=true
          if(!this.bonusUses.shield)
          {
            this.defence += bon[i][2]
          }
          this.bonusUses.shield+=1
          props.notifier('shield:'+bon[i][0]+'  '+bon[i][2]+ ' def. uses: ' +this.bonusUses.shield+'/10');
          if(this.bonusUses.shield>=10) 
          {
            props.notifier(bon[i][0]+ ' depleted. Dropped');
            this.defence -= bon[i][2]
            this.stats.bonuses[i]-=1
            this.bonusUses.shield=0
            return;
          }
          return //break the loop
        } 
        else 
        {
          this.counts.shield=false
        }
      }
      //end defence shields

      for(let j = 32; j>=29;j--) 
      {
        //console.log('called for armour')
        if(this.stats.bonuses[j]) 
        {
          this.counts.armour=true
          if(!this.bonusUses.armour)
          {
            // console.log(bon)
            this.defence += bon[j][2]
          }
          this.bonusUses.armour+=1
          props.notifier('armour  :'+bon[j][0]+' for '+bon[j][2]+ ' defence');
          if(this.bonusUses.armour>12) 
          {
            props.notifier(bon[j][0]+' is too damaged. dropped')          
            this.stats.bonuses[j]-=1
            this.defence -= bon[j][2]
            //console.log('defence here ',this.defence )
            this.bonusUses.armour=0
            return;
          }
          return;
        } 
        else 
        {
          this.counts.armour=false
        }
        
      }
      //end defence armour
    }
  
    //moving is called by getAll()
    this.moving = function(enemies,props)
    {
      // heal if 20 points lost
      if(this.stats.maxHP>this.stats.hp) 
      {
        this.heal()
      }
      if(this.stats.bonuses[11])
      {
      let mapX = this.map.getRow(this.y)
      let mapY = this.map.getCol(this.x)
      this.map.makeTrail(mapX,mapY)
      }
      this.useHealthPots();
      this.useGems();

    

      enemies.forEach(enemy=>{
        xpBar(getHP({maxHP:this.stats.maxHP,hp:this.stats.hp,x:this.screenX,y:this.screenY}))

        let fought = enemy.fight({...this.positions(),xp:this.stats.xp,xy:[this.x,this.y]})
        if(fought.hit)
        {
          // this.weaponBonus()
          this.defenceBonus();
          this.hitCounter+=1
          // console.log('my x y : ',
          // this.x,this.y,
          // 'enemy:' ,fought.xy)
          if(fought.xy[0]<this.x&&(fought.xy[1]-20<this.y&&fought.xy[1]+20>this.y))
          {
            // console.log('left')
            this.move(newDelta,2,0)
          }
          else if(fought.xy[0]>this.x&&(fought.xy[1]-20<this.y&&fought.xy[1]+20>this.y))
          {
            // console.log('right')
            this.move(newDelta,-2,0)
          }
          else if(fought.top)
          {
            // console.log('top')
            this.move(newDelta,0,-2)
          }
          else if(fought.bottom)
          {
            // console.log('bottom')
            this.move(newDelta,0,2)
          }
          //each hit is hardcoded 12
          //defence is currently between 2 and 14
          //xp is gained through attacks and improves attack
          
          console.log(this.defence)
          let enemyHit = 8 - this.defence

          let hitCalculate = enemyHit<1?0:enemyHit

          //console.log('enemy hit :',fought.hitPoints,hitCalculate,'XP Gained: ',xpGained)
          this.stats.hp-=hitCalculate

          // console.log(this.stats.xp)
        } 
      })
    }

    this.collide = function (dirx, diry) 
    {
        let p  = this.positions()
        var row, col;
        // -1 in right and bottom

        var collision =
          this.map.whatTile(p.left, p.top) ||
          this.map.whatTile(p.right, p.top) ||
          this.map.whatTile(p.right, p.bottom) ||
          this.map.whatTile(p.left, p.bottom);
          if (!collision) { return; } 

          else if (collision[0]=== 'bonus'||collision[0]=== 'backpack'){
            // console.log(collision)
            let bon = bonusNames()[collision[2]][0]
            //collision 1 is the new map.. 
            //pack doesnt' increase carry load
           if(collision[0]=== 'backpack') {
              this.stats.capacity+=10;
              props.notifier('capacity increased to '+this.stats.capacity);
              props.updateMap(collision[1],2)
              this.stats.pickedBonuses+=1
              props.drawStats();
            }
            //only add to carrying if not full and not a backpack
            if(this.stats.capacity>this.stats.carrying()&&collision[0]!== 'backpack') {
              // console.log('bonus: ',collision,props )
              this.stats.pickedBonuses+=1
              // console.log(collision)
              if(this.stats.bonuses[collision[2]])
              {
                this.stats.bonuses[collision[2]]+=1
              }
              else
              {
                this.stats.bonuses[collision[2]]=1
              }
              props.notifier('picked up : '+bon);
              props.notifier('you have '+this.stats.carrying()+' of '+this.stats.capacity+' capacity');
              props.updateMap(collision[1],2)
              props.drawStats();
             
            } else  return
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
