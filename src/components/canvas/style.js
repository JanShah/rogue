import styled from 'styled-components'



let Canvas = styled.canvas`
${props=>props.dt==='player'?
('data-id:'+props.dt):null
};
background:#333;
z-index:3;
`

let GameCanvas = Canvas.extend`
position:${props=>props.position||'relative'};
top:${props=>props.top||'0'};
left: 0;
z-index: 10;
`

let PlayerMenuCanvas = Canvas.extend`
${props=>props.height?'height:'+props.height+'px;':null}
${props=>props.width?'width:'+props.width+'px;':null};
margin-top:2px;
background:#666;
`

export default Canvas

export {GameCanvas}

export {PlayerMenuCanvas}