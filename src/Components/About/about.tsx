import * as React from 'react';
import { Image,Card } from 'antd';

const { Meta } = Card;

export default function About({ data }: any) {

    let { avatar, about, id, username } = data

    return (
        <Card
            hoverable
            style={{ width: 240, margin: '0 auto', marginTop: '30px', }}
            cover={<Image src={avatar}/>}
        >
            <Meta style={{color: '#1f1f1f', textAlign: 'justify'}} title={`Username: ${username}`} description={about} />
        </Card>
    )
}