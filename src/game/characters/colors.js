export default function colors(digits) 
{
  const range = [
    "#F70D28", "#EF1927", "#E72526", 
    "#E03225", "#D83E24", "#D04B23", 
    "#C95722", "#C16421", "#B97020", 
    "#B27D1F", "#AA891F", "#A3961E", 
    "#9BA21D", "#93AF1C", "#8CBB1B", 
    "#84C81A", "#7CD419", "#75E118", 
    "#6DED17", "#66FA17"]
  let colour = Math.ceil(digits/10)-1
  return range[colour]
}

