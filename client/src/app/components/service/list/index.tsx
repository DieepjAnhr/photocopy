import React from 'react';
import styles from './index.module.scss';
import ServiceListElement from './element';
import Link from 'next/link';
import { Col, Row } from 'antd';

interface IProps {
    name: string,
    services: ICategory[]
}

const ServiceList: React.FC<IProps> = ({ name, services }) => {
    const serviceList = services.map((service, index) => {
        return <Col key={index}
                    span={12}
                    xs={20} 
                    sm={10} 
                    md={10}   
                    lg={7}
                    xl={7}
                    xxl={7}>
            <Link href={`/${service.path}`} key={index}>
                <ServiceListElement key={index} {...service} />
            </Link>
        </Col>
        
    })
    return (
        <div className={styles.serviceList}>
            <h1 className={styles.title}><b>{name.toUpperCase()}</b></h1>
            <hr/>
            <Row className={styles.content} gutter={[30, 30]} justify="center" align="middle">
                {serviceList}
            </Row>
        </div>
    );
};

export default ServiceList;