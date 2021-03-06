import React from 'react'
import Box from './style'

function box(props) {
    return <Box color={props.color} background={props.background} id={props.detail[0]} detail={props.detail}>{props.children}</Box>
}

export default box