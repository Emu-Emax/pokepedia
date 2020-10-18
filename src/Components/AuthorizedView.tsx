import React, {FunctionComponent, useEffect, useState} from 'react';
import styled from 'styled-components'
import {history} from "../utils";
import {HeaderTwo, StyledButton} from "../globalStyles";
import {multiplyGrid} from '../theme';

const slowpoke =  require('../assets/images/slowpoke.png')


export const AuthorizedView: FunctionComponent = () => {
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setAuthorized(true);
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        history.push('/');
    }

    return (
        <Canvas>
            {authorized ?
                <>
                    <Slowpoke/>
                    <HeaderTwo>Welcome to private access ;)</HeaderTwo>
                    <StyledButton onClick={() => handleLogout()}>Logout</StyledButton>
                </>
                :
                'unauthorized'
            }
            <StyledButton onClick={() => history.push('/')}>Return</StyledButton>
        </Canvas>
    )
}

const Slowpoke = styled.div`
width: ${multiplyGrid(20)};
height: ${multiplyGrid(20)};
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
height: ${multiplyGrid(50)};
margin: ${multiplyGrid(3)};
border-radius: 10px;
color: black;

`

