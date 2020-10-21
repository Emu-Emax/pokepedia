import React, {FunctionComponent} from 'react';
import styled from 'styled-components'
import {history} from "../utils";
import {HeaderTwo, StyledButton} from "../styledComponents";
import {multiplyGrid} from '../theme';
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../state/store";
import {logoutUser} from "../state/actions";

const slowpoke = require('../assets/images/slowpoke.png')


function useHandleLogout() {
    const dispatch = useDispatch();
    return () => {
        dispatch(logoutUser());
        history.push('/');
    }
}

export const Dashboard: FunctionComponent = () => {
    const user = useSelector((state: RootStore) => state.userReducer);
    const handleLogout = useHandleLogout();

    return (
        <Canvas>
            <Slowpoke/>
            <HeaderTwo>Welcome {user.name}</HeaderTwo>
            <StyledButton onClick={handleLogout}>Logout</StyledButton>
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

