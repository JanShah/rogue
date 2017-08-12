export default function rw(a,b) {
  if(b) {
    return Math.floor(Math.random()*(b-a)+a)
  } else {
    return Math.random()*100
  }
}
