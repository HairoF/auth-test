import styled from "styled-components";
import { Button } from "antd";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  .logo {
    height: 100%;
  }
`;
const Nav = styled.nav`
  flex: 0 1 30%;
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

  .nav__item--rightSpace {
    margin-right: 15px;
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

const MyButton = styled(Button)`
  background-color: steelblue;
  color: #fff;
`;

export { Container, Ul, Nav, MyButton };
