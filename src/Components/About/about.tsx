import * as React from 'react';
import { Image } from 'antd';



export default function About({data}:any) {

    let {avatar, about, id, username} = data

    return (
        <div
            style={{textAlign: 'center'}}
        >
            <p>{id}: {username}</p>
            <Image
                width={200}
                src={avatar}
            />
            <p>{about}</p>
        </div>

    )
}