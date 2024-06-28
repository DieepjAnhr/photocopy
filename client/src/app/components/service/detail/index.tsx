import React from 'react';
import styles from './index.module.scss';

const ServiceDetail: React.FC<ICategory> = ({ name, content }) => {
    return (
        <div className={styles.serviceDetail}>
            <h1 className={styles.title}><b>{name.toUpperCase()}</b></h1>
            <hr/>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default ServiceDetail;