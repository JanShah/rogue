import React from 'react'
import Container from './style'
import { grid } from '../../../constants/'
function container(props) {
    return <Container id={props.detail} rows={props.rows} cols={props.cols} grid={grid}>{props.children}</Container>
}

export default container