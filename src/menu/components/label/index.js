import React, { Component } from 'react'
import Label from './style'

function label(props) {
    let size = props.size
    return <Label size={size}>{props.label}</Label>
}

export default label