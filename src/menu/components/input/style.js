import styled from 'styled-components'

const Input = styled.input`
    padding: 5px 11px;
    color: ${props=>props.background?'#fff':'#8F6690'};
    background:${props=>props.background?'#8F6690':'#fff'};
    font-size: 1em;
    border: 1px solid #ABB8A3;
    ::-webkit-input-placeholder { 
    /* Chrome/Opera/Safari */
        color: ${props=>props.background?'#fff':'#8F6690'}
    }
}
`;

export default Input