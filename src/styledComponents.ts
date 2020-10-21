import styled from "styled-components";
import {theme} from './theme'
import {multiplyGrid} from './theme';

const pokeball =  require('./assets/images/pokeball.png')

export const StyledButton = styled.button`
min-height: ${multiplyGrid(5)};
padding: 10px;
margin: 10px;
background: ${theme.mainColor};
border-radius: 5px;
cursor: pointer;
color: white;
font-size: 20px;
border: none;
transition: 0.5s;

a {
text-decoration: none;
color: white;
}

&:hover {
background: black;
}
`;


export const PokemonName = styled.h2`
font-size: 30px;
font-weight: bold;
`;

export const HeaderTwo = styled.h3`
margin-bottom: ${multiplyGrid(3)};
font-size: 20px;
font-weight: bold;
`;

export const Label = styled.div`
padding: 5px;
margin-right: ${multiplyGrid(1.5)};
border-radius: 5px;
background: ${theme.mainColor};
color: white;
font-weight: bold;
`

export const Bold = styled.span`
margin-right: ${multiplyGrid(1.5)};
font-weight: bold;
`

export const PageName = styled.h1`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
font-size: 40px;
font-weight: bold;
color: white;
`

export const Spinner = styled.div`
width: 100px;
height: 100px;
margin: 40px;
background: url(${pokeball});
background-size: contain;
background-repeat: no-repeat;

-webkit-animation:spin 4s linear infinite;
    -moz-animation:spin 4s linear infinite;
    animation:spin 4s linear infinite;
    
    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`

export const Row = styled.div`
display: flex;
`
