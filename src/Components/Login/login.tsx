import * as React from 'react';
import { useState, useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { Autht, MyAlert } from './login-style';

import { Context } from '../../index';
import { observer } from 'mobx-react-lite';

import validate from '../helpers/index';


function Login() {
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { store } = useContext(Context)
    const { error, message } = store.loginError;

    function handleSubmit(): void {
        store.login(username, password)
            .then(() => {
                setTimeout(() => {
                    store.setLoginError(false)
                }, 2000)
            })
    }

    return (
        <Autht className="auth">
            {
                error
                    ? <MyAlert message={message} type="error" />
                    : null
            }
            <Form
                onFinish={handleSubmit}
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
                <Form.Item>
                    <Link to="/register/" className="link link__auth">register now</Link>
                    <Button
                        disabled={error}
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

