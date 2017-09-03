export default class Camera {
  constructor(props) {
    this.y=0
    this.x=0
    let scale =1
    //adding some height and width to camera to prevent edge jerking
    this.width    = scale*(props.width+props.map.tsize)
    this.height   = scale*(props.height+props.map.tsize)
    this.maxX     = scale*(props.map.rows * props.map.tsize - props.width)
    this.maxY     = scale*(props.map.cols * props.map.tsize - props.height)
    this.follow   = (sprite)=>{
      this.following  = sprite
      sprite.screenX  =0
      sprite.screenY  =0
    }
    this.update   = ()=> {
      this.following.screenX = this.width / 2;
      this.following.screenY = this.height / 2;

      // make the camera follow the sprite
      this.x = this.following.x - this.width / 2;
      this.y = this.following.y - this.height / 2;
      // clamp values
      this.x = Math.max(0, Math.min(this.x, this.maxX));
      this.y = Math.max(0, Math.min(this.y, this.maxY));

      // in map corners, the sprite cannot be placed in the center of the screen
      // and we have to change its screen coordinates

      // left and right sides
      if (this.following.x < this.width / 2 ||
          this.following.x > this.maxX + this.width / 2) {
          this.following.screenX = this.following.x - this.x;
      }
      // top and bottom sides
      if (this.following.y < this.height / 2 ||
          this.following.y > this.maxY + this.height / 2) {
          this.following.screenY = this.following.y - this.y;
      }

    }
  }
}
