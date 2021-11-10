import styled from "styled-components";
import { Alert } from "antd";
import { AlertProps } from "antd/lib/alert/index";

const Autht = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .link {
    display: block;
    text-align: center;
    margin-bottom: 10px;
  }
  .submit__button {
    display: block;
    margin: 0 auto;
  }
`;

const MyAlert: React.FC<AlertProps> = styled(Alert)`
  margin-bottom: 10px;
`;

export { Autht, MyAlert };
