import tilesquares from '../../assets/tiles.png'
import ranger_m from '../../assets/ranger_m.png'
import mage_m from '../../assets/mage_m.png'
import healer_m from '../../assets/healer_m.png'
import ninja_m from '../../assets/ninja_m.png'
import ranger_f from '../../assets/ranger_f.png'
import mage_f from '../../assets/mage_f.png'
import healer_f from '../../assets/healer_f.png'
import ninja_f from '../../assets/ninja_f.png'
import screen from '../../assets/screen.png'
import enemies41 from '../../assets/enemies/_enemy_41.png'
import enemies42 from '../../assets/enemies/_enemy_42.png'
import enemies43 from '../../assets/enemies/_enemy_43.png'
import enemies44 from '../../assets/enemies/_enemy_44.png'
import enemies45 from '../../assets/enemies/_enemy_45.png'
import enemies46 from '../../assets/enemies/_enemy_46.png'
import enemies47 from '../../assets/enemies/_enemy_47.png'
import enemies48 from '../../assets/enemies/_enemy_48.png'
import floor from '../../assets/floor.png'
import dpad from '../../assets/dpad.png'

let images = {
  tiles: tilesquares,
  mage_m: mage_m,
  ninja_m: ninja_m,
  ranger_m: ranger_m,
  healer_m: healer_m,
  mage_f: mage_f,
  ninja_f: ninja_f,
  ranger_f: ranger_f,
  healer_f: healer_f,
  enemies41: enemies41,
  enemies42: enemies42,
  enemies43: enemies43,
  enemies44: enemies44,
  enemies45: enemies45,
  enemies46: enemies46,
  enemies47: enemies47,
  enemies48: enemies48,
  screen: screen,
  floor:floor,
  dpad:dpad
}

export default class Loader {
  constructor(props) {
    this.images={}
    this.sourceFile = {}
    let loadImage = (key,src)=> {
      let img = new Image()
      const d = new Promise((resolve,reject)=> {
        img.onload=()=>{
          this.images[key]=img
          this.sourceFile[key]=src
          resolve(img)
        }
        img.onerror=()=> {
          reject('not loaded '+src)
        }
      })

      img.src=src
      return d;
    }

    this.preload=()=>{
      let no = 0
      let len = Object.keys(images).length
      return Object.keys(images).forEach((image,index)=>{
      new Promise((resolve,reject)=>{
        let loadedImage = loadImage(image,images[image])
          resolve(loadedImage)
          reject(err=>console.error(err))
        }).then(()=>{
          no+=1
          let loaderDom = document.getElementById('loader')
          let perc = Math.round(no/len*10000)/100
          loaderDom.style.color='white'
          loaderDom.style.position='relative'
          loaderDom.style.width=perc+'%'
          loaderDom.style.transition='all .3s ease-in'
          loaderDom.style.height='10vh'
          loaderDom.style.background=`hsla(${perc-30},80%,50%,1)`
          loaderDom.innerHTML = 'loading assets '+perc+'%'
          if(perc===100)
          {
            setTimeout(()=>{

              loaderDom.style.background=`hsla(${perc},100%,50%,0)`
              loaderDom.style.visibility='hidden'
              loaderDom.style.height='0px'
            },1000)
            this.loaded = true
          }
          return true
        })
      })
    }
    this.getURL = image => {
      return  this.sourceFile[image];
    }
    this.getImage = (key)=> {
      return this.images[key];
    };

  }
}
