export default function drawBonus(props,layer,tile,x,y,ctx)
{
  
  ctx.drawImage(
    this.tileAtlas, // image
    (tile - 1) * props.map.tsize, // source x
    layer===3?64:0, // source y
    props.map.tsize, // source width
    props.map.tsize, // source height
    Math.round(x),  // target x
    Math.round(y), // target y
    props.map.tsize, // target width
    props.map.tsize // target height
  );
  //add transparent box and hit region if ctx is not this.ctx (ctx is menu canvas)
  if(ctx!==this.ctx) 
  {
    this.menuPaths[tile]=
    {
      t:[x,y],
      b:[x+props.map.tsize,y+props.map.tsize],
      id:tile
    }
    //transparent box, fillrect might not have worked for mouseover path detection
    //it didn't work for addHitRegion, hence..
    ctx.strokeStyle="rgba(0,0,0,0)";
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+props.map.tsize,y);
    ctx.lineTo(x+props.map.tsize,y+props.map.tsize);
    ctx.lineTo(x,y+props.map.tsize);
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}