'use client';
import React from 'react';
import { Row, Col } from 'antd';
import { FacebookOutlined, TwitterOutlined} from '@ant-design/icons';
import styles from './index.module.scss';
import { CATEGORIES } from '@/constant/category-list';
import ZaloOutlined from '../custom-icon/zalo';


const Footer: React.FC = () => {
    const time = new Date()
    const services = CATEGORIES.map((item, index)=> {
        return <a key={index} href={`/${item.path}`}>{item.label}</a>
    })
    return (
        <div className={styles.footerContainer}>
            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={12} md={10} className={styles.footerInfomation}>
                    <h3>Liên hệ với Photocopy 99</h3>
                    <p>Địa chỉ: 253 Nữ Dân Công, Vĩnh Lộc A, Bình Chánh, Hồ Chí Minh</p>
                    <p>Email: tngaa099@gmail.com</p>
                    <p>Phone: 0868.941.099</p>
                </Col>

                <Col xs={24} sm={12} md={6} className={styles.footerService}>
                    <h3>Các dịch vụ</h3>
                    {services}
                </Col>
                
                <Col xs={24} sm={12} md={6} className={styles.footerContact}>
                    <h3>Follow Us</h3>
                    <div className={styles.socialIcons}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FacebookOutlined />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <TwitterOutlined />
                            {/* <ZaloOutlined style={{ fontSize: '24px', color: '#1890ff' }}/> */}
                        </a>
                    </div>
                </Col>
            </Row>
            <div className={styles.copyright}>
                <p>Copyright {time.getFullYear()} &copy; in Photocopy99.</p>
            </div>
        </div>
    );
};

export default Footer;
