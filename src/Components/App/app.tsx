import * as React from 'react';
import  {useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './app.css';
import styled from 'styled-components';

import { Layout } from "antd";
const { Header: AntHeader,  Content } = Layout;

import Header from '../Header/header';
import About from '../About/about';
import Registration from '../Registration/registration';
import Login from '../Login/login';

import {Context} from '../../index';
import { observer } from 'mobx-react-lite';
import {toJS} from 'mobx';

function App() {
    const {store} = useContext(Context);
    const data = toJS(store.user);
    
    useEffect( () => {

        if(localStorage.getItem('token')) {
            store.checkAuth()
        }
    },[])

    useEffect(() => {

        if(localStorage.getItem('token')) {
            store.checkAuth()
        }

    },[store.isAuth])



    return (
        <Router>
            <AntHeader >
            <Header isAuth={store.isAuth} onLogOut={store.logout} username={store.user.username}/>
            </AntHeader>
            <Content style={{height:'100vh'}}>
                <Switch>
                    <Route path="/" exact>
                        <h1 style={{margin:'0 auto', textAlign:'center'}}>
                            About
                        </h1>
                        {!store.isAuth ? <P>Авторизуйтесь</P> : null}
                        {store.isAuth ? <About data={data}/> : null}
                    </Route>
                    <Route path="/register/" exact>
                        <Registration/>
                    </Route>
                    <Route path="/login/" exact>
                    {
                        store.isAuth 
                            ? <Redirect to='/'/> 
                            : <Login/>
                    }
                    </Route>
                </Switch>
            </Content>
        </Router>
    )
}

export default observer(App);

const P = styled.p`
    width: 100px;
    text-align:center;
    margin: 0 auto;
    text-shadow: 1px 1px 1px red;
    border-bottom: 1px solid grey;
    border-top: 1px solid grey;

`;