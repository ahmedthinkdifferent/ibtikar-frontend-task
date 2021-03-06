import React from 'react';
import {BrowserRouter, Redirect, Switch} from "react-router-dom";
import MustBeLoginAuth from "./guard/MustBeLoginGuard";
import MustBeGuestGuard from "./guard/MustBeGuestGuard";
import LoginScreen from "./screens/auth/login/LoginScreen";
import HomeScreen from "./screens/home/HomeScreen";
import './App.css';
import RegisterScreen from "./screens/auth/register/RegisterScreen";

function App() {
    return <BrowserRouter>
        <Switch>
            <MustBeGuestGuard path={"/auth/login"} component={LoginScreen}/>
            <MustBeGuestGuard path={"/auth/register"} component={RegisterScreen}/>
            <MustBeLoginAuth path={"/home"} component={HomeScreen}/>
            <Redirect to={'/home'}/>
        </Switch>
    </BrowserRouter>
}

export default App;
