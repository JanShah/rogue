import React, { Component } from 'react'
import Box from './style'

function box(props) {
    console.log(props)
    return <Box id={props.detail[0]} detail={props.detail}>{props.children}</Box>
}

export default box