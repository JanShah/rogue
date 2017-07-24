import React from 'react'
import Button from './style'

function button(props) {
    return (
    <Button primary={props.primary} onClick={props.fn}>{props.text}</Button>
    )
}

export default button