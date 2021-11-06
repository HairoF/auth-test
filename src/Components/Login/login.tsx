import * as React from 'react';
import {useState, useContext, useEffect} from 'react';

import {Link} from 'react-router-dom';

import styled from 'styled-components';

import { Form, Input, Button, Alert } from 'antd';
import { LockOutlined, UserOutlined} from '@ant-design/icons';

import {Context} from '../../index';
import { observer } from 'mobx-react-lite';

import validate from '../helpers/index';

const alertStyle = {
    marginBottom: '10px'
}

function Login() {
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context)
    const {error, message} = store.loginError;

    useEffect(()=> {
        console.log('login re-render',store.isAuth);
        
    },[error])

    return (
        <Autht className="auth">
        {
            error
                ? <div style={alertStyle}><Alert message={message} type="error" /></div>
                : null
        }
        <Form
            onFinish={()=> store.login(username, password)}
            name="normal_login"
            className="login-form"
            
        >
            <Form.Item
                hasFeedback
                name="username"
                rules={[
                    { required: true, message: 'Please input your Email!' },
                    () => ({
                        validator(_, value) {
                            if (!value || validate('username', username)) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Name should be longer than 4 simbols'));
                        },
                    }),
                ]}
            >
                <Input 
                    onChange={event => setUserName(event.target.value)}
                    value={username}
                    prefix={<UserOutlined className="site-form-item-icon" />} 
                    placeholder="Username" 
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    { required: true, message: 'Please input your Password!' },
                    
                ]}
            >
                <Input
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />

            </Form.Item>
            <Form.Item style={{textAlign:"center"}}>
                <Link to="/register/" className="link link__auth">register now</Link>
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="login-form-button submit__button"
                >
                    Log in
                </Button>
            </Form.Item>
        </Form>
    </Autht>
    )
}

export default observer(Login);

const Autht = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .link {
        display: inline-block;
        margin-bottom: 10px;
    }
    .submit__button {
        display: block;
        margin: 0 auto;
    }
`;