import React, {FunctionComponent} from 'react';
import styled from 'styled-components'
import {multiplyGrid} from '../theme';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loginUser} from "../state/actions";
import urls from "../utils/urls";
import {history} from "../utils";
import {PageName, Row, StyledButton} from "../styledComponents";
import {UserType} from "../state/objectTypes";


export const Login: FunctionComponent = () => {
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data: UserType) => {
        dispatch(loginUser(data));
        history.push(urls['dashboard']);
    };

    return (
        <Canvas>
            <PageName>Login</PageName>
            <Form>
                <Label>Username</Label>
                <InputTextField name="name" defaultValue="test" ref={register({required: true})}/>
                <Label>Password</Label>
                <InputTextField name="password" type="password" ref={register({required: true})}/>
                {errors.name && <span>This field is required</span>}
                {errors.password && <span>This field is required</span>}
            </Form>
            <Row>
                <StyledButton onClick={handleSubmit(onSubmit)}>
                    Submit
                </StyledButton>
                <StyledButton onClick={() => history.push('/')}>Return</StyledButton>
            </Row>

        </Canvas>
    );
}

const InputTextField = styled.input`
width: 100%;
height: ${multiplyGrid(5)};
margin-right: ${multiplyGrid(3)};
padding: 10px;
border: none;
border-radius: 5px;
font-size: 20px;
margin-bottom: ${multiplyGrid(4)};
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

export const Form = styled.form`
display: flex;
flex-direction: column;
`

export const Label = styled.label`
width: 100%;
height: 40px;
`

