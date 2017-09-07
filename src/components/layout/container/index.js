import React from 'react'
import Container from './style'
import { grid } from '../../../constants/'
function container(props) {
    return <Container 
    id={props.detail} 
    rows={props.rows} 
    cols={props.cols} 
    grid={grid} 
	gap={props.gap} 

    stretch={props.stretch}
    template={props.template}
    templateCols={props.templateCols}
    templateRows={props.templateRows}
    >{props.children}</Container>
}

export default container