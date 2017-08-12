import styled from 'styled-components'

let Label = styled.div`
    float:left;
    ${props=>props.size==='small'
    ?(
        `position: relative;
        font-size: 0.8em;
        top: 0;`
    ):(
        `font-size: 1.2em;
        padding: 0 11px;
        margin-top: -3px;
        color: #fef;
        font-weight:bold;`
    )}
`

export default Label