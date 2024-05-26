'use client';
import React from 'react';
import { Row, Col } from 'antd';
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { SERVICES } from '@/constant/services';

const Footer: React.FC = () => {
    return (
        <div className={styles.footerContainer}>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6} className={styles.footerSection}>
                    <h3>Company</h3>
                    <p>About Us</p>
                    <p>Careers</p>
                    <p>Press</p>
                </Col>
                <Col xs={24} sm={12} md={6} className={styles.footerSection}>
                    <h3>Các dịch vụ</h3>
                    {SERVICES.map((item)=> <a href={item.path}>{item.label}</a>)}
                </Col>
                <Col xs={24} sm={12} md={6} className={styles.footerSection}>
                    <h3>Liên hệ với Photocopy 99</h3>
                    <p>253 Nữ Dân Công</p>
                    <p>Vĩnh Lộc A, Bình Chánh, Hồ Chí Minh</p>
                    <p>Email: tngaa099@gmail.com</p>
                    <p>Phone: 0868.941.099</p>
                </Col>
                <Col xs={24} sm={12} md={6} className={styles.footerSection}>
                <h3>Follow Us</h3>
                <div className={styles.socialIcons}>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FacebookOutlined />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <TwitterOutlined />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <LinkedinOutlined />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <InstagramOutlined />
                    </a>
                </div>
                </Col>
            </Row>
            <div>
                <p>&copy; 2024 Your Business. All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
