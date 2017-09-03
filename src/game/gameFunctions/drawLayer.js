// import nap from '../../constants/nap'

export default function drawLayer(props,layer)
{
      //draws the layer visible within the camera dimensions
  let startCol = Math.floor(this.camera.x / props.map.tsize);
  let endCol = startCol + (this.camera.width / props.map.tsize);
  let startRow = Math.floor(this.camera.y / props.map.tsize);
  let endRow = startRow + (this.camera.height / props.map.tsize);
  let offsetX = -this.camera.x + startCol * props.map.tsize;
  let offsetY = -this.camera.y + startRow * props.map.tsize;
  //console.log('get nap:',props.map.cols)
  let nap = {
    rows:props.map.rows,
    cols:props.map.cols
  }
  for (let c = startCol; c <= endCol; c++) 
  {
    for (let r = startRow; r <= endRow; r++) 
    {
      //get the tile reference for that col/row/layer (4 layers in total at the moment, but it's dynamic)
      let tile = props.map.getTile(layer, c, r);
      let x = (c - startCol) * props.map.tsize + offsetX;
      let y = (r - startRow) * props.map.tsize + offsetY;
      if (tile>=100&&tile<=120) 
      { // floor tile
            this.drawFloor(layer,tile,x,y,this.ctx)
      } 
      else if (tile !== 0&&tile<40) 
      { // 0 => empty tile
        this.drawBonus(layer,tile,x,y,this.ctx)
      }
      //41 to 46 are the 6 main enemies     
      else if (tile>40&&tile<47) 
      {
        //if the ref is between 41 and 50, this can be used to render a static enemy but.... 
        //we spawn a new enemy instead
        // c and r are actual coordinates for original enemy marker
        this.spawnEnemy(
        {
          x:(c*props.map.tsize+32),
          y:r*props.map.tsize+32,
          id:Math.floor(c*nap.cols+c),
          ref:tile
        })
        //remove enemy spawn marker, enemy will span once from that location only
        this.removeMarker(c,r,3)
      }
    }
  }
}; 