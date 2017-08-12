import styled from 'styled-components'


let Box = styled.div`
    grid-row: ${props=>props.detail[1]}/span ${props=>props.detail[2]};
    grid-column: ${props=>props.detail[3]} / span ${props=>props.detail[4]};
    background-color: ${props=>props.detail[5]};
    text-align:center;
    grid-area: ${props=>props.detail[0]};
`
export default Box

