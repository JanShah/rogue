import React from 'react'
import Div from './style'
import {SlideDiv} from './style'

function div(props) {
	if(props.id==='slide') 
	return <SlideDiv
		
		bg={props.bg} 
		pad={props.pad} 
		width={props.width}
		height={props.height}
		align={props.align}
		>
		<Div height={30}></Div>
		{props.children}
		</SlideDiv>
	else
	return <Div 
		bg={props.bg} 
		margin={props.margin} 
		pad={props.pad} 
		width={props.width}
		height={props.height}
		align={props.align}
		>{props.children}</Div>
}



export default div