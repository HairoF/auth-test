import * as React from 'react';
import styled from 'styled-components';

interface CheckAuth {
    isAuth: boolean
}

export default function Preview({isAuth}:CheckAuth) {
    return (
        <>
            <h1 style={{ margin: '0 auto', textAlign: 'center' }}>
                Приветствуем
            </h1>
            <p>{`Вы ${isAuth ? 'можете' : 'пока не можете'} просмотреть информацию о себе `}</p>
            { !isAuth ? <Div>Авторизуйтесь или зарегистрируйтесь</Div> : null}
        </>
    )
}

const Div = styled.div`
    width: 300px;
    text-align:center;
    margin: 0 auto;
    text-shadow: 1px 1px 1px red;
    border-bottom: 1px solid grey;
    border-top: 1px solid grey;

`;