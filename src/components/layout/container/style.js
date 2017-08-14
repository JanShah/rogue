import styled from 'styled-components'

let Container = styled.div`
    display:grid;
    ${props=>props.templateCols?'grid-template-columns:'+props.templateCols+';':'grid-template-columns:repeat('+props.cols+',1fr);'}
    ${props=>props.template?'grid-template-rows:'+props.template+';':'grid-template-rows:repeat('+props.rows+',1fr);'}
    ${props=>props.gap?'grid-gap:'+props.gap+'px;':'grid-gap:0;'}
    ${props=>props.stretch?'justify-items:'+props.stretch:'stretch'};
    align-items: center;
    grid-template-areas: ${props=>props.cols>3?props.grid[3]:props.grid[props.cols-1]};

`

export default Container