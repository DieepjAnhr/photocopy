import React from 'react';
import { Card } from 'antd';
import styles from './index.module.scss';

interface IProps {
    name: string,
    image: string,
    description: string,
    path: string,
    is_leaf: boolean,
    childrens: IProps[]
}

const CategoryCard: React.FC<IProps> = ({ image, name }) => {
    return (
        <Card
            className={styles.cardContainer}
            hoverable
            style={{ textAlign: 'center', position: 'relative' }}
            cover={
                <div className={styles.imageContainer}>
                    <img className={styles.image} src={image} />
                </div>
            }
        >
            <div className={styles.content}>{name.toUpperCase()}</div>
        </Card>
    );
};

export default CategoryCard;
