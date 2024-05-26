'use client';
import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.module.scss';

const Services: React.FC = () => {
  return (
    <div className={styles.gridContainer}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div className={styles.gridItem}>Item 1</div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div className={styles.gridItem}>Item 2</div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div className={styles.gridItem}>Item 3</div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div className={styles.gridItem}>Item 4</div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div className={styles.gridItem}>Item 5</div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div className={styles.gridItem}>Item 6</div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div className={styles.gridItem}>Item 7</div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div className={styles.gridItem}>Item 8</div>
        </Col>
      </Row>
    </div>
  );
};

export default Services;
