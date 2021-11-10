import * as React from "react";
import { Link } from "react-router-dom";

import { Button, Avatar } from "antd";

import { Container, Ul, Nav, MyButton } from "./header-style";

import { observer } from "mobx-react-lite";

interface ISAuth {
    isAuth: boolean;
    onLogOut: () => void;
    username: string;
}
interface AuthHeaderProps {
    children: React.ReactNode;
}

function Header({ isAuth, onLogOut, username }: ISAuth) {
    const AuthHeader = (props: AuthHeaderProps) => <>{props.children}</>

    return (
        <Container className="container">
            <Link to="/">
                <img src="./logo192.png" className="logo header__logo"></img>
            </Link>
            <Nav className="nav header__nav">
                <Ul className="nav__block">
                    <li className="nav__item nav__item--rightSpace">
                        <MyButton type="primary">
                            <Link to="/about/">About</Link>
                        </MyButton>
                    </li>
                    {!isAuth ? (
                        <li className="nav__item">
                            <MyButton type="primary" ghost>
                                <Link to="/register/">Sign up</Link>
                            </MyButton>
                        </li>
                    ) : null}
                    <li className="nav__item">
                        {isAuth ? (
                            <AuthHeader>
                                <Button onClick={onLogOut} type="primary">
                                    log out
                </Button>
                                <Avatar size={40}>{username}</Avatar>
                            </AuthHeader>
                        ) : (
                            <MyButton type="primary" ghost>
                                <Link to="/login/">log in</Link>
                            </MyButton>
                        )}
                    </li>
                </Ul>
            </Nav>
        </Container>
    );
}

export default observer(Header);
