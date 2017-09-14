import rw from '../general/functions/rw'

export default class {
  constructor(props) {
    let odds = 100-props[1]
    this.cells = props[0].map(cell=>{
      let newCell
      if(cell>=100&&cell<=120) {
        if(rw(0,100)>=odds) {
          newCell = rw(6,41)
        } else {
          newCell = cell
        } 
      }
      else if(cell===800) {
        newCell = 13 //add the obligatory coin to the centre of each room
      }
      else if(cell===0) {
          newCell = 4      
        }
      else {
        newCell = cell        
      }
        return newCell
    })
  }
}
