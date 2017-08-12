import styled from 'styled-components'

let Container = styled.div`
    display:grid;
    grid-template-columns:repeat(${props=>props.cols},1fr);
    grid-template-rows:repeat(${props=>props.rows},1fr);
    grid-gap:0;
    justify-items: stretch;
    align-items: center;
    grid-template-areas: ${props=>props.cols>3?props.grid[3]:props.grid[props.cols-1]}
`

export default Container