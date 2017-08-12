import React from 'react'
import Input from './style'
function input(props) {
    return <Input type='text' background={props.background} placeholder={props.placeHolder}></Input>
}
export default input