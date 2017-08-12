import styled from 'styled-components'



let Canvas = styled.canvas`
${props=>props.dt==='player'?
('data-id:'+props.dt):null
};
background:#333;
`

let GameCanvas = Canvas.extend`
position:${props=>props.position||'relative'};
top: 0;
left: 0;
z-index: -1;
`

let PlayerMenuCanvas = Canvas.extend`
width:200px;
margin-top:2px;
height:160px;
background:#666;
`

export default Canvas

export {GameCanvas}

export {PlayerMenuCanvas}