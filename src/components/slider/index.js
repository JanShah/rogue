import React from 'react'
import Slider from './style'
import './customStyle.css'



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