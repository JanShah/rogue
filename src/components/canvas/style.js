import styled from 'styled-components'



let Canvas = styled.canvas`
${props=>props.dt==='player'?
('data-id:'+props.dt):null
};
z-index:3;
`

let GameCanvas = Canvas.extend`
margin-top:10px;
background:#777;
`

let PlayerMenuCanvas = Canvas.extend`
${props=>props.height?'height:'+props.height+'px;':null}
${props=>props.width?'width:'+props.width+'px;':null};
margin-top:2px;
background:#333;
`

export default Canvas

export {GameCanvas}

export {PlayerMenuCanvas}