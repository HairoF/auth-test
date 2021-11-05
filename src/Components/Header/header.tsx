import * as React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
import styled from 'styled-components';

interface ISAuth {
    isAuth: boolean
}
const styles = {
    backgroundColor:'steelblue',
    color: '#fff'
}

export default function Header({isAuth}:ISAuth) {


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
                                    ? <Button type='primary'>log out</Button>
                                    : <Button style={styles} type='primary' ghost><Link to="/login/" >log in</Link></Button>
                            }
                        </li>
                    </Ul>
                </Nav>
            </Container>
    )
}
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

