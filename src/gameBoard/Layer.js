export default class Layer {
  constructor(data) {
    let layers=[]
    for (var i=0;i<data.grid;i++) {
      for (var j=0;j<data.grid;j++) {
        //top wall,left wall
        if(i===0||j===0) {
          layers.push(data.no)
          //right wall
        } else if (j===data.grid-1) {
          layers.push(data.no)
          //bottom wall
        } else if (i===data.grid-1) {
        layers.push(data.no)
        //inner cells
        }  else  {
          layers.push(data.no)
        }
      }
    }
    return layers
  }
}
