import React from 'react'
import Container from './style'

function container(props) {
    return <Container id={props.detail} cols={props.cols}>{props.children}</Container>
}

export default container