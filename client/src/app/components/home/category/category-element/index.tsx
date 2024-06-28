'use client';
import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.module.scss';

interface IProps {
  name: string,
  image: string,
  description: string,
  path: string,
  is_leaf: boolean,
  childrens: IProps[]
}

const HomeCategoryElement: React.FC<IProps> = ({
  name,
  image,
  description,
  childrens
}) => {
  const similarServices = childrens.slice(1, 4).map((item, index) => {
    return <Col key={index}
            span={8}
            xs={24} 
            sm={24} 
            md={24}   
            lg={8}
            xl={8}
            xxl={8}>
      <img className={styles.childRepresentImg} src={item.image}/>
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
          <div className={styles.categoryImage}>{image ? <img src={image}/> : null}</div>
        </Col>
        <Col 
          xs={22} 
          sm={22} 
          md={22} 
          lg={11}
          xl={11}
          xxl={11}>
          <div className={styles.categoryChildren}>
            <Row gutter={[16, 16]} justify="center">
              <Col 
                xs={24} 
                sm={24} 
                md={24} 
                lg={24}
                xl={24}
                xxl={24}>
                <img className={styles.representImg} src={childrens[0]?.image}/>
              </Col>
              <Col
                xs={24} 
                sm={24} 
                md={24} 
                lg={24}
                xl={24}
                xxl={24}>
                <Row gutter={[16, 16]} justify="center">{similarServices}</Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomeCategoryElement;
