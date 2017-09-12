export default class Layer {
  constructor(data) {
    let layers=[]
    for (var i=0;i<data.grid;i++) {
      for (var j=0;j<data.grid;j++) {
          layers.push(data.no)        
      }
    }
    return layers
  }
}
