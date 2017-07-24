import styled from 'styled-components'

const Button = styled.button`
    width:200px;
    background: ${props => props.primary ? '#8F6690' : 'white'};
    color: ${props => props.primary ? 'white' : '#8F6690'};
    font-size: 1em;
    margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid #2a2254;
    border-radius: 3px;
    :focus {
        outline: -webkit-focus-ring-color;
    }
`;

export default Button