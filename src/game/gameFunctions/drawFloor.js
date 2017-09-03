export default function drawFloor(props,layer,tile,x,y,ctx)
{
  // console.log(tile)
	// console.log('floor',tile)
	//
	let tl = tile-100
	tl=Math.min(tl,16)
	//got 0 to 20
	let xpos = tl%4
	let ypos =tl<4?0:Math.floor(tl/4)-1

  ctx.drawImage(
    this.floorTile, // image
    xpos * props.map.tsize, // source x
    ypos * props.map.tsize, // source y
    props.map.tsize, // source width
    props.map.tsize, // source height
    Math.round(x),  // target x
    Math.round(y), // target y
    props.map.tsize, // target width
    props.map.tsize // target height 
  ); 
}