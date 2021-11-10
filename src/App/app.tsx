import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './app.css';

import { Layout } from "antd";
const { Header: AntHeader, Content } = Layout;

import Header from '../Components/Header/header';
import Preview from '../Components/Preview/preview';
import About from '../Components/About/about';
import Registration from '../Components/Registration/registration';
import Login from '../Components/Login/login';

import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

const main = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
} as React.CSSProperties

function App() {
    const { store } = useContext(Context);
    const [redirect, changeRedirect] = useState(false)
    const data = toJS(store.user);

    useEffect(() => {

        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    useEffect(() => {

        if (localStorage.getItem('token')) {
            store.checkAuth()
        }

    }, [store.isAuth])

    function handleRedirect(bool: boolean) {
        changeRedirect(bool)
        setTimeout(() => changeRedirect(false), 2000)
    }



    return (
        <Router>
            <AntHeader >
                <Header isAuth={store.isAuth} onLogOut={store.logout} username={store.user.username} />
            </AntHeader>
            <Content style={main}>
                <Switch>
                    <Route path="/about">
                        {!store.isAuth ? <Redirect to='/' /> : null}
                        {store.isAuth ? <About data={data} /> : null}
                    </Route>
                    <Route path="/" exact>
                        <Preview isAuth={store.isAuth} />
                    </Route>
                    <Route path="/register/" exact>
                        {
                            redirect
                                ? <Redirect to='/login' />
                                : <Registration redirect={handleRedirect} />
                        }

                    </Route>
                    <Route path="/login/" exact>
                        {
                            store.isAuth
                                ? <Redirect to='/' />
                                : <Login />
                        }
                    </Route>
                </Switch>
            </Content>
        </Router>
    )
}

export default observer(App);

