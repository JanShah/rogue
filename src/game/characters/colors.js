export default function colors(digits) 
{
  const range = 
  [
    "#F9151A",
    "#F63E12",
    "#F36D10",
    "#F09C0E",
    "#EDCB0C",
    "#DCEB09",
    "#A8E807",
    "#74E505",
    "#41E203",
    "#0FDF01",
    "#00DD22"
  ]
  let colour = Math.floor(digits/10)>10?10:Math.floor(digits/10)
  return range[colour]
}
