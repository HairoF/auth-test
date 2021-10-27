import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export default class Header extends React.Component {

    render() {
        return(
            <Head className="header">
                <Link to="/">
                    <img src="./logo192.png" className="logo header__logo"></img>
                </Link>
                <Nav className="nav header__nav">
                    <Ul className="nav__block">
                        <li className="nav__item">
                            <Link to="/reg/" className="nav__link">sign up</Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/auth/" className="nav__link">log in</Link>
                        </li>
                    </Ul>
                </Nav>
            </Head>
        )
    }
}


const Head = styled.header`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    color: #fff;

    .logo {
        height:100%;
    }
`;
const Nav = styled.nav`
    flex: 0 1 23%;
    align-self: center;
`;

const Ul = styled.ul`
    display: flex;
    justify-content: space-around;
    .nav__item {
        border: 1px solid #101010;
        border-radius: 10px;
        padding: 2px 10px;
    }
    .nav__item:hover {
        background: #101010;
        cursor: pointer;
    }
`;