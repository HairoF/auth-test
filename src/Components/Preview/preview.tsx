import * as React from 'react';
import { Div } from './preview-style';

interface CheckAuth {
    isAuth: boolean
}

export default function Preview({ isAuth }: CheckAuth) {
    return (
        <>
            <h1 style={{ margin: '0 auto', textAlign: 'center' }}>
                Приветствуем
            </h1>
            <p>{`Вы ${isAuth ? 'можете' : 'пока не можете'} просмотреть информацию о себе `}</p>
            { !isAuth ?
                <Div>Авторизуйтесь или зарегистрируйтесь</Div>
                :
                null
            }
        </>
    )
}
