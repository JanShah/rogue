import React from 'react'
import Canvas from './style'
import {GameCanvas} from './style'
import {PlayerMenuCanvas} from './style'

function canvas(props) 
{
	if(props.id==='game') 
	{
		return <GameCanvas 
		id={props.id} 
		position={props.position}
		width={props.width}
		height={props.height}
		top={props.top}


		/>
	} 
	else if(props.id.startsWith('pm')) 
	{
		return <PlayerMenuCanvas 
			id={props.id} 
			onClick={props.onClick} 
			onMouseOver={props.onMouseOver}
			width={props.width}
			height={props.height}
			/>
	} 
	else 
	{
		return <Canvas id={props.id}/>
	}
}

export default canvas