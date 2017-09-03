export default function animateSprite(dir)
{
  this.skipCount++
  if(this.skipCount>4)
  {
    this.drawStats()
    this.sa<64?this.sa+=32:this.sa=0
    this.skipCount=0
  }
  if (dir==='up')
    this.rotations=[this.sa,0]
  if (dir==='left')
    this.rotations=[this.sa,108]
  if (dir==='right')
    this.rotations=[this.sa,36]
  if (dir==='down')
    this.rotations=[this.sa,72]
}