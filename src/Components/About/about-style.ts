import { Card } from 'antd';
import styled from 'styled-components';
import {CardMetaProps} from 'antd/lib/card/Meta'
const { Meta:AntMeta } = Card;

const Meta: React.FC<CardMetaProps> = styled(AntMeta)`
    color: '#1f1f1f';
    text-align: 'justify';
`;

export { Meta };