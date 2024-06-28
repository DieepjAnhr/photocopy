import React from 'react';
import styles from './index.module.scss';
import HomeCategoryElement from './category-element';
import { CATEGORIES } from '@/constant/category-content';

const HomeCategory: React.FC = () => {
    const homeCategories = CATEGORIES.map((category, index) => {
        return <HomeCategoryElement key={index} {...category} />
    })
    return (
        <div className={styles.homeCategories}>
            <h1 className={styles.title}><b>DỊCH VỤ IN ẤN CHẤT LƯỢNG CAO</b></h1>
            <hr/>
            {homeCategories}
        </div>
    );
};

export default HomeCategory;

  