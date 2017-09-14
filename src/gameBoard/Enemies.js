import rw from '../general/functions/rw'

export default class {
  constructor(props) {
    let odds = 100-(props[1]-2)
    this.cells = JSON.parse(JSON.stringify(props[0]))
    .map((a,b)=>{
      return (a>=100&&a<=120)?
      rw(0,100)>odds?(rw(41,49)):0
      :0
    })
  }
}
