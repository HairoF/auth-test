import * as React from 'react';
import { useState, useContext } from 'react';

import { Link } from 'react-router-dom';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { Regis, MyAlert } from './registration-style';

import validate from '../helpers/index';
import { observer } from 'mobx-react-lite';

import { Context } from '../../index';

interface Regis {
    redirect: (bool: boolean) => void
}

function Registration({ redirect }: Regis) {

    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { store } = useContext(Context);
    const { registerMessage, loginError } = store;

    function handleSubmit() {
        store.registration(username, password)
            .then((res) => {
                if (res) {
                    setTimeout(() => {
                        redirect(true)
                    }, 1500);
                }
            })
            .then(() => {
                setTimeout(() => {
                    store.setLoginError(false)
                }, 1500);
            })
    }

    return (
        <Regis>
            <Form
                onFinish={handleSubmit}
                name="normal_login"
                className="login-form login-form__relative"
                initialValues={{ remember: true }}
            >
                {registerMessage || loginError.error
                    ? <MyAlert
                        message={registerMessage ? registerMessage : loginError.message}
                        type={registerMessage ? 'success' : 'error'}
                    />
                    : null
                }
                <Form.Item
                    name="username"
                    rules={[
                        {
                            type: 'string',
                            message: 'The input is not valid Username!',
                        },
                        { required: true, message: 'Please input your Username!' },
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
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your Password!' }
                    ]}
                >
                    <Input.Password
                        onChange={event => setPassword(event.target.value)}
                        prefix={<LockOutlined className="site-form-item-icon" value='hey' />}
                        type="password"
                        placeholder="Passwordd"
                    />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" value='hey' />}
                        type='password'
                        placeholder="Confirm Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Link to="/login/" className="link link__auth">already registred?</Link>
                    <Button
                        disabled={loginError.error}
                        type="primary"
                        htmlType="submit"
                        className="submit__button"
                    >
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
        </Regis>
    )
};

export default observer(Registration);
