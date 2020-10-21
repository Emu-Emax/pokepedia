import React, {useEffect, useState} from 'react';
import {history} from "../utils";
import {Spinner} from "../styledComponents";
import {Route} from 'react-router-dom';
import urls from "../utils/urls";
import {useSelector} from "react-redux";
import {RootStore} from "../state/store";


export const PrivateRoute = ({children}: any) => {
    const [authorized, setAuthorized] = useState(false);
    const user = useSelector((state: RootStore) => state.userReducer);

    useEffect(() => {
        const token = user.token;
        if (token) {
            setAuthorized(true);
        } else {
            history.push(urls['home']);
        }
    }, [])

    return (
        <Route>
            {authorized ? children : <Spinner/>}
        </Route>

    )
}
