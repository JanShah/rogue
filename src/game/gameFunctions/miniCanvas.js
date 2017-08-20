// import nap from '../../constants/nap'


export default function miniCanvas(props) 
{
  let nap={
    width:800,
    height:600
  }
      const canvas = document.getElementById('miniMap')
      if(canvas){
        const sourceCanvas = document.getElementById('tiles')
        let destinationCtx;
        canvas.setAttribute('style', 
        `position:absolute; bottom:5px; left:10px; z-index:2; background-color:#fff`)     
      if(this.hero.stats.bonuses[9]) 
      {
        props.miniMap(true)
        if(canvas)
        {
        //let maxWidth = nap.width/4
          canvas.width = nap.width/3.5
          canvas.height = nap.height/3.5
          destinationCtx = canvas.getContext('2d');

          //get the destination context
          let miniMap = 2
          let sc = this.hero.stats.bonuses[9]>1
            ?3.5
            :miniMap
          //scale the output according to bonus level 2 and 4, more maps means it lasts longer
          destinationCtx.scale(1/sc,1/sc)
          //draw the image
          destinationCtx.drawImage(sourceCanvas, 0, 0);
        } 
      } 
      else 
      {
        canvas.width=0
      }
    }
}