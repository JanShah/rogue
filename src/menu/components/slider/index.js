import React, { Component } from 'react'
import Slider from './style'
import './customStyle.css'
import Label from '../label/'



function slider(props) {
    let changeValue =event=>{           
        props.alter([event.target.id,event.target.value])
    }
    return <Slider 
        id={props.what.name}
        type='range' 
        onChange={changeValue.bind(this)}
        value={props.val} 
        min={props.what.min} 
        max={props.what.max}
    />
}

export default slider