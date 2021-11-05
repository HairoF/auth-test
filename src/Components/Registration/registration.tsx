import * as React from 'react';
// import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';


export default function Registration() {
    // let contain = useRef<HTMLInputElement & Input>(null)

    function onButtonClick(value:string): void {
        
    }

    return (
        <Regis className="regis">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        { required: true, message: 'Please input your Username!' }
                    ]}
                >
                    <Input 
                        onChange={(field)=> {
                            onButtonClick(field.target.value)
                            
                        }}
                        prefix={<MailOutlined className="site-form-item-icon" />} 
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your Password!' }
                    ]}
                >
                    <Input.Password
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
                <Form.Item style={{ textAlign: "center" }}>
                    <Link to="/login/" className="link link__auth">already registred?</Link>
                    <Button  type="primary" htmlType="submit" className="login-form-button">
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
        </Regis>
    )
}

const Regis = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .link {
        display: block
    }
    .link__auth {
        margin: 10px auto;
    }
`;