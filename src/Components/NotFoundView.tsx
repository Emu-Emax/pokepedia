import React, {FunctionComponent} from 'react';
import styled from 'styled-components'
import {history} from "../utils";
import {HeaderTwo, StyledButton} from "../globalStyles";
import {multiplyGrid} from '../theme';

const slowpoke =  require('../assets/images/slowpoke.png')


export const NotFoundView: FunctionComponent = () => {
    return (
        <Canvas>
            <Slowpoke/>
            <HeaderTwo>404: Page not found :(</HeaderTwo>
            <StyledButton onClick={() => history.push('/')}>Back to homepage</StyledButton>
        </Canvas>
    )
}

const Slowpoke = styled.div`
width: ${multiplyGrid(25)};
height: ${multiplyGrid(25)};
background: url(${slowpoke});
background-size: contain;
background-repeat: no-repeat;
`

const Canvas = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 100%;
height: ${multiplyGrid(100)};
border-radius: 10px;
margin: ${multiplyGrid(3)};
color: black;
`

