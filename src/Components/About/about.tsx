import * as React from 'react';
import { Image, Card } from 'antd';
import { Meta } from './about-style';

export default function About({ data }: any) {
    let { avatar, about, id, username } = data

    return (
        <Card
            hoverable
            style={{ width: 240, margin: '0 auto', marginTop: '30px', }}
            cover={<Image src={avatar} />}
        >
            <Meta title={`Username: ${username}`} description={about} />
        </Card>
    )
}