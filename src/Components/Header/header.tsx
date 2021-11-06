import * as React from 'react';
import {Link} from 'react-router-dom';

import {Button, Avatar} from 'antd';
import styled from 'styled-components';

import { observer } from 'mobx-react-lite';

import AuthHeader from './auth-header';

interface ISAuth {
    isAuth: boolean,
    onLogOut: () => void,
    username: string
}
const styles = {
    backgroundColor:'steelblue',
    color: '#fff'
}

function Header({isAuth, onLogOut, username}:ISAuth) {


    return(
            <Container className="container">
                <Link to="/">
                    <img src="./logo192.png" className="logo header__logo"></img>
                </Link>
                <Nav className="nav header__nav">
                    <Ul className="nav__block">
                        {
                        !isAuth 
                            ? (<li className="nav__item">
                                <Button style={styles} type='primary'><Link to="/register/" >Sign up</Link></Button>
                              </li>
                              )
                            : null
                        }
                        <li className="nav__item">
                            {
                                isAuth 
                                    ? <AuthHeader>
                                        <Button onClick={onLogOut} type='primary'>log out</Button>
                                        <Avatar size={40}>{username}</Avatar>
                                    </AuthHeader>
                                    : <Button style={styles} type='primary' ghost><Link to="/login/" >log in</Link></Button>
                            }
                        </li>
                    </Ul>
                </Nav>
            </Container>
    )
}

export default observer(Header);

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    .logo {
        height:100%;
    }
`;
const Nav = styled.nav`
    flex: 0 1 20%;
    align-self: center;
`;

const Ul = styled.ul`
    display: flex;
    justify-content: space-around;
    .nav__item {
        display: inline-grid;
        grid-auto-flow: column;
        column-gap: 0.7em;
        align-items: center;
        border: 1px solid #101010;
        border-radius: 10px;
        line-height: 2rem;
    }
    .nav__link {
        padding: 10px 10px;
        white-space: nowrap;
    }
    .nav__item:hover {
        background: #101010;
        cursor: pointer;
    }
`;

