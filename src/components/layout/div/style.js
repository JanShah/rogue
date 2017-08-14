import styled from 'styled-components'

let Div = styled.div`
	${props=>props.bg?'background:'+props.bg+';':null}
	${props=>props.pad?'padding:'+props.pad+'px;':null}
	${props=>props.margin?'margin:'+props.margin+';':null}
	${props=>props.width?'width:'+props.width+'px;':null}
	${props=>props.height?'height:'+props.height+'px;':null}
	${props=>props.align?'text-align:'+props.align+';':null}
	
`

let SlideDiv  = Div.extend`
	transition:all 1s;
	${props=>props.height?'max-height:'+props.height+'px;':null}

`

export default Div

export {SlideDiv}