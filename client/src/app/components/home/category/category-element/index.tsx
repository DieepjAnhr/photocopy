'use client';
import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.module.scss';
import CategoryCard from './category-card';
import Link from 'next/link';

const HomeCategoryElement: React.FC<ICategory> = ({
  name,
  image,
  image_configs: {
    display_in_pages
  },
  description,
  childrens
}) => {
  const similarServices = childrens.slice(0, 4).map((item, index) => {
    return <Col key={index}
            span={12}
            xs={24} 
            sm={24} 
            md={24}   
            lg={12}
            xl={12}
            xxl={12}>
        <Link href={item.path}><CategoryCard key={index} { ...item } /></Link>
    </Col>
  })
  return (
    <div className={styles.categoryContainer}>
      <Row gutter={[16, 16]} justify="center" align="middle">
        <Col className={styles.categoryContent} 
          xs={22} 
          sm={22} 
          md={22} 
          lg={11}
          xl={11}
          xxl={11}>
          <div className={styles.categoryTitle}><b>{name.toUpperCase()}</b></div>
          <div className={styles.categoryDescription}>{description}</div>
          <div className={styles.categoryImage}>
            {image && display_in_pages.includes('home') ? <img src={image}/> : null}
          </div>
        </Col>
        <Col 
          xs={22} 
          sm={22} 
          md={22} 
          lg={11}
          xl={11}
          xxl={11}>
          <div className={styles.categoryChildren}>
              <Row gutter={[16, 16]} justify="center">{similarServices}</Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomeCategoryElement;
