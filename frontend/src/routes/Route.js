import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default function RouteCustom({
    component:Component,
    isPrivate=false,
    isAuth=false,
    ...rest
}) {
    const signed = localStorage.getItem("token");

    if(!signed && isPrivate) {
        return <Redirect to="/" />
    }

    if(signed && isAuth){
        return <Redirect to="/profile" />
    }

    return (
        <Route {...rest} render={props => (
            <Component {...props}/>
        )}/>
    )
}