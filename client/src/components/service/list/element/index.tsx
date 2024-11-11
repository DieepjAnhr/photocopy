import React from 'react';
import styles from './index.module.scss';
import { Card } from 'antd';

const ServiceListElement: React.FC<ICategory> = ({ image, name, description }) => {
    return (
        <Card
            className={styles.serviceContainer}
            hoverable
            style={{ textAlign: 'center', position: 'relative' }}
            cover={
                <div className={styles.imageContainer}>
                    <img className={styles.image} src={image} />
                </div>
            }
        >
            <div className={styles.content}>
                <div className={styles.title}>{name.toUpperCase()}</div>
                <div className={styles.description}>{description}</div>
            </div>
        </Card>
    );
};

export default ServiceListElement;