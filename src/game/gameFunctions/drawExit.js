export default function(props,layer,tile,x,y,ctx)
{
  ctx.drawImage(
    this.exitTile, // image
    0, // source x
    0, // source y
    props.map.tsize, // source width
    props.map.tsize, // source height
    Math.round(x),  // target x
    Math.round(y), // target y
    props.map.tsize, // target width
    props.map.tsize // target height 
  ); 
}
