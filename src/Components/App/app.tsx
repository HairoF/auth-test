import * as React from 'react';
import  {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './app.css';
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
        console.log(store.isAuth, store.user);

        return () => {
            if(localStorage.getItem('token')) {
                store.checkAuth()
            }
        }
    },[store.isAuth])



    return (
        <Router>
            <AntHeader >
            <Header isAuth={store.isAuth}/>
            </AntHeader>
            <Content style={{height:'100vh'}}>
                <Switch>
                    <Route path="/" exact>
                        <h1 
                            style={{margin:'0 auto', textAlign:'center'}}
                        >
                            About
                            <p>{store.isAuth ? `Сейчас авторизован ${store.user.username}` : 'Авторизуйтесь'}</p>
                        </h1>
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