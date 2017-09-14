import Stats from './Stats'
import { bonusNames } from '../../../constants/'
import positions from '../positions'
import getHP from '../getHP'
import hpBar from '../hpBar'
import bonusTotal from '../../gameFunctions/bonusTotal'
let newDelta


export default class Hero {
  constructor(props) {
    this.wins = false
    this.coinsNeeded = props.map.roomcount<5?2:Math.max(props.map.roomcount-4,3)
    let startPoint = props.map.startingPoint
    this.stats=new Stats(props.hero)
    this.seenByEnemy = false
    this.map= props.map
    this.x= startPoint.x*props.map.tsize
    this.y = startPoint.y*props.map.tsize
    this.frameWidth=96
    this.frameHeight=144
    this.width= 32
    this.height= 36 
    this.visibility=200
    this.defence=0
    this.attack=0
    this.image=props.loader.getImage(props.hero)
    this.SPEED=256
    this.positions = positions.bind(this)
    let timer=200
    this.heal=()=>{
      timer--
      if(!timer&&this.stats.hp < this.stats.maxHP){
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
      armour:0,
      weapon:0
    }
    this.hitCounter = 0

    this.weaponBonus=function(use){ 
      let weapon = bonusTotal(this.stats.bonuses)[4]
      if(weapon&&use){
        props.notifier('Weapons: added '+weapon[1]+' damage')
        this.bonusUses.weapon+=1
        if(this.bonusUses.weapon>10){
          props.notifier(weapon[0]+' destroyed ')
          this.stats.bonuses[weapon[3]]-=1
          this.bonusUses.weapon = 0
        }

      } else {
        return weapon?weapon[1]:0
      }
    }

    this.useHealthPots = function() {
      if(this.stats.bonuses[26]) {
        if(this.stats.hp+35<this.stats.maxHP) {
          props.notifier('Potions: used Healing Pot for 35')
          this.stats.hp+=35;
          if(this.stats.hp===this.stats.maxHP){
            props.notifier('Fully Healed!')
          }
          this.stats.bonuses[26]-=1
        }
      }
    }

    this.useGems = function() {
      if(this.stats.bonuses[6]) {
        props.notifier('Gem: Blue increased Max HP by 10')
        this.stats.maxHP+=10;
        this.stats.hp+=10;
        this.stats.bonuses[6]-=1
      }
      if(this.stats.bonuses[7]) {
        if(this.stats.hp+20<this.stats.maxHP) {
          props.notifier('Gem: Green restored HP by 20')
          this.stats.hp+=20;
          this.stats.bonuses[7]-=1
        }
      }
      if(this.stats.bonuses[8]) {
        props.notifier('Gem: Red increases XP by 3')
        this.stats.xp+=3
        this.stats.bonuses[8]-=1
      }
    }


    this.defencePotion = function() {
      const bon = bonusNames()
      if(this.stats.bonuses[27]) {
        props.notifier('Potions: '+bon[27][0]+' for '+bon[27][4]+ ' defence');
        if(!this.bonusUses[27]){
          this.bonusUses[27] = 1
        } else {
          this.bonusUses[27] += 1
        }
        if(this.bonusUses[27]>10) {
          delete this.bonusUses[27]
          this.stats.bonuses[27]-=1
          props.notifier('Potions: '+bon[27][0]+' emptied. Dropped')        

        }
        return bon[27][4]
      } else {
        return 0
      }
    }
    this.defenceShields = function() {
      const bon = bonusNames()
      let bestShield = 0
      let returnShield = 0
      for(let shield = 25; shield>=22;shield--) {
        if(this.stats.bonuses[shield]) {
          if(bon[shield][4]>bestShield){
            bestShield = bon[shield][4]
            returnShield = shield
          }
        }
      }
      if(returnShield) {
      props.notifier('Shield: '+bon[returnShield][0]+' for '+bon[returnShield][4]+ ' defence');
        // console.log('bestShield: ',bestShield,returnShield )
        if(!this.bonusUses[returnShield]) {
          this.bonusUses[returnShield]  = 1           
        }
        this.bonusUses[returnShield]+=1
        if(this.bonusUses[returnShield]>10){
          delete this.bonusUses[returnShield]
          this.stats.bonuses[returnShield]-=1
          props.notifier('Shield: '+bon[returnShield][0]+' damaged, dropped');
        }
        return bestShield
      } else {
        return 0
      }
    }
    this.defenceArmour = function() {
      const bon = bonusNames()
      let bestArmour = 0
      let returnArmour = 0
      for(let armour = 32; armour>=29;armour--) {
        if(this.stats.bonuses[armour]) {
          // console.log('got armour--------------------------')
          if(bon[armour][4]>bestArmour) {
            bestArmour = bon[armour][4]
            returnArmour = armour
          }
        }
      }
      if(returnArmour) {
      props.notifier('Armour: '+bon[returnArmour][0]+' for '+bon[returnArmour][4]+ ' defence'+this.bonusUses[returnArmour]+'/10');
        
        // console.log('bestShield: ',bestShield,returnArmour )
        if(!this.bonusUses[returnArmour]) {
          this.bonusUses[returnArmour]  = 1           
        }
        this.bonusUses[returnArmour]+=1
        if(this.bonusUses[returnArmour]>10) {
          delete this.bonusUses[returnArmour]
          this.stats.bonuses[returnArmour]-=1
          props.notifier('Armour: '+bon[returnArmour][0]+' damaged, dropped');
        }
        return bestArmour
      }
      else 
      {
        return 0
      }
    }
    //moving is called by getAll()
    this.moving = function(enemies,props) {

      // heal if points lost
      if(this.stats.maxHP>this.stats.hp) {
        this.heal()
      }
      if(this.stats.bonuses[11]) {
      let mapX = this.map.getRow(this.y)
      let mapY = this.map.getCol(this.x)
      this.map.makeTrail(mapX,mapY)
      }
      this.useHealthPots();
      this.useGems();
      enemies.some(enemy=>{
        this.seenByEnemy = enemy.seenHero
        return enemy.seenHero
      })
      enemies.forEach(enemy=>{
        hpBar(getHP({maxHP:this.stats.maxHP,hp:this.stats.hp,x:this.screenX-10,y:this.screenY}))

        let totalFight = this.stats.xp + this.weaponBonus();
        let fought = enemy.fight({...this.positions(),xp:totalFight,xy:[this.x,this.y]})
        if(fought.hit) {
          this.defence = this.defencePotion() + this.defenceShields() + this.defenceArmour()
          this.hitCounter+=1
          this.weaponBonus(true)
          if(fought.xy[0]<this.x&&(fought.xy[1]-20<this.y&&fought.xy[1]+20>this.y)) {
            this.move(newDelta,4,0)
          } else if(fought.xy[0]>this.x&&(fought.xy[1]-20<this.y&&fought.xy[1]+20>this.y)) {
            this.move(newDelta,-4,0)
          } else if(fought.xy[1]>this.y&&(fought.xy[0]-20<this.x&&fought.xy[0]+20>this.x)) {
            this.move(newDelta,0,-4)
          } else {
            this.move(newDelta,0,4)
          }
          //each enemy hit is set according to the enemy xp.
          //xp is gained through kills and red gems and improves attack
          let enemyHit = Math.max(fought.hitPoints-this.defence,1)
          this.stats.hp-=enemyHit
        } 
      })
    }

    this.collide = function (dirx, diry) {
      let p  = this.positions()
      let row, col;
      // -1 in right and bottom
      let collision =
        this.map.whatTile(p.left, p.top) ||
        this.map.whatTile(p.right, p.top) ||
        this.map.whatTile(p.right, p.bottom) ||
        this.map.whatTile(p.left, p.bottom);
        let exitFalse = (!this.stats.bonuses[13]||this.stats.bonuses[13]<this.coinsNeeded)&&collision==='exit'
        let exitTrue = this.stats.bonuses[13]>=this.coinsNeeded&&collision==='exit'
        if (!collision) { return; } 
        else if (exitFalse) { return; } 
        else if (exitTrue) { 
          this.wins = true
          return; 
        } 
        
        else if (collision[0]=== 'bonus'||collision[0]=== 'backpack'){
          // console.log(collision)
          let bon = bonusNames()[collision[2]][0]
          //collision 1 is the new map.. 
          //pack doesnt' increase carry load
          if(collision[0]=== 'backpack') {
            this.stats.capacity+=10;
            props.notifier('Cap: increased to '+this.stats.capacity);
            props.updateMap(collision[1],2)
            this.stats.bonuses[collision[2]]+=1
            this.stats.pickedBonuses+=1
            props.drawStats();
          }
          //only add to carrying if not full and not a backpack
          if(this.stats.capacity>this.stats.carrying()&&collision[0]!== 'backpack') {
            // console.log('bonus: ',collision,props )
            this.stats.pickedBonuses+=1
            // console.log(collision)
            if(this.stats.bonuses[collision[2]]) {
              this.stats.bonuses[collision[2]]+=1
            } else {
              this.stats.bonuses[collision[2]]=1
            }
            props.notifier('Picked up : '+bon);
            props.updateMap(collision[1],2)
            props.drawStats();
          } else {
            return
          }
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
    this.move=(delta,dirX,dirY)=>{
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
