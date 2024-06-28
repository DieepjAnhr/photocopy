'use client';
import React from 'react';
import styles from './index.module.scss';
import { Col } from 'antd';

interface IProps {
    url: string,
    content: string
}
const CommitIcon: React.FC<IProps> = ({url, content}) => {
    return <Col className={styles.commitIcon}
                xs={12} 
                sm={12} 
                md={6} 
                lg={6}
                xl={6}
                xxl={6}>
        <img className={styles.image} src={url}/>
        <div className={styles.content}>{content}</div>
    </Col>
};

export default CommitIcon;