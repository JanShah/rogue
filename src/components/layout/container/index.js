import React from 'react'
import Container from './style'
import { grid } from '../../../constants/'
function container(props) {
    return <Container 
    id={props.detail} 
    rows={props.rows} 
    cols={props.cols} 
    grid={grid} 
    stretch={props.stretch}
    template={props.template}
    >{props.children}</Container>
}

export default container