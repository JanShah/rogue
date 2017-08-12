import styled from 'styled-components'

const Button = styled.button`
    /* Adapt the colours based on primary prop */
    width:100%;
	background: ${props => props.primary ? '#8F6690' : 'white'};
	color: ${props => props.primary ? 'white' : '#8F6690'};
	font-size: 1em;
	height:30px;
	border: 2px solid #2a2254;
    border-radius: 3px;
    :focus {
        outline: -webkit-focus-ring-color;
    }
`;

export default Button