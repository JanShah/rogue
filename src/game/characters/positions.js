export default function positions(){
    let left = this.x - this.width / 2;
    let right = this.x + this.width / 2 - 1;
    let top = this.y - this.height / 2;
    let bottom = this.y + this.height / 2 - 1;
    return {top:top,left:left,right:right,bottom:bottom}
  }