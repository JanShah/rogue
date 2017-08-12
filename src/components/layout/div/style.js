import styled from 'styled-components'

let Div = styled.div`
	${props=>props.bg?'background:'+props.bg:null}
	${props=>props.pad?'padding:'+props.pad:null}
	${props=>props.width?'width:'+props.width:null}
	${props=>props.height?'height:'+props.height:null}
	${props=>props.align?'text-align:'+props.align:null}
	
`

let SlideDiv  = Div.extend`
	transition:all 1s;
	${props=>props.height?'max-height:'+props.height:null}

`

export default Div

export {SlideDiv}