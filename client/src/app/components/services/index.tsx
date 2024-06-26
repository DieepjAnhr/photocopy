'use client';
import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.module.scss';

const Services: React.FC = () => {
  return (
    <div className={styles.gridContainer}>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8} lg={6} className={styles.gridText}>
          <div className={styles.gridTitle}>DỊCH VỤ IN & PHOTOCOPY</div>
          <div className={styles.gridContent}>
            Máy in và photocopy kỹ thuật số đen trắng – sử dụng dòng máy của hãng Ricoh từ máy ricoh MP 7500 đến máy ricoh MP 9001 và các máy pro 1107EX cho tốc độ cao, sản lượng in đen trắng – photocopy trên lý thuyết đạt tới 105.000 lượt in trên giờ.
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div className={styles.gridImage}>
            <img src='https://inthienhang.com/wp-content/uploads/2019/01/mayin.png.webp'/>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Services;
