// import nap from '../../constants/nap'


export default function miniCanvas(props) 
{
      const canvas = document.getElementById('miniMap')
      if(canvas){
        const sourceCanvas = document.getElementById('game')
        let destinationCtx;
        let width = sourceCanvas.width
        let height = sourceCanvas.height
        canvas.setAttribute('style', 
        `position:absolute; bottom:5px; left:10px; z-index:2; background-color:#fff`)     
      if(this.hero.stats.bonuses[9]) 
      {
        props.miniMap(true)
        if(canvas)
        {
          canvas.width = width/3.5
          canvas.height = height/3.5
          destinationCtx = canvas.getContext('2d');
          console.log(this.hero)
          //get the destination context
          let count = this.hero.stats.bonuses[9]
          let scale = count===1?1.5:count===2?2:count===3?3:count===4?3.5:3.5
          // let sc = this.hero.stats.bonuses[9]>1
          //   ?3.5
          //   :miniMap
          //scale the output according to bonus level 2 and 4, more maps means it lasts longer
          destinationCtx.scale(1/scale,1/scale)
          //draw the image
          if(count===2) destinationCtx.translate(-this.hero.screenX/2,-this.hero.screenY/2)
          if(count===1) destinationCtx.translate(-canvas.width-40,-canvas.height-40)
          destinationCtx.drawImage(sourceCanvas, 0, 0);
        } 
      } 
      else 
      {
        canvas.width=0
      }
    }
}