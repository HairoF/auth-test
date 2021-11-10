import styled from 'styled-components';
import {Autht} from '../Login/login-style';
import {Alert} from 'antd';
import { AlertProps } from "antd/lib/alert/index";


const Regis = styled(Autht)`
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
.login-form__relative {
    position: relative;
}
`;

const MyAlert: React.FC<AlertProps> = styled(Alert)`
    position: absolute;
    top: -65px;
    width: 100%;
`;

export { Regis, MyAlert };