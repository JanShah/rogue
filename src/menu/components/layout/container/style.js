import styled from 'styled-components'

let grid = [`"grid" "enemies" "bonuses" "width" "height" "rooms"`,
    `"grid enemies" "bonuses width" "height rooms"`,
    `"grid enemies bonuses" "width height rooms"`,
    `"grid enemies bonuses width height rooms"`]

let Container = styled.div`
    display:grid;
    grid-template-columns:repeat(${props=>props.cols},1fr);
    grid-template-rows:repeat(4,1fr);
    grid-gap:0;
    justify-items: stretch;
    align-items: center;
    grid-template-areas: ${props=>props.cols>3?grid[3]:grid[props.cols-1]}
`

export default Container