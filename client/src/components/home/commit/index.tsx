'use client';
import React from 'react';
import styles from './index.module.scss';
import CommitIcon from './icon';
import { Row } from 'antd';

const HomeCommit: React.FC = () => {
    const iconData = [
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-HsB3hXFjVu_8ij7vhhAamWZNzDUYJRQAUA&s',
            content: 'Dịch vụ chuyên nghiệp',
            position: 0
        },
        {
            url: 'https://png.pngtree.com/png-vector/20210904/ourlarge/pngtree-best-quality-icon-png-image_3869630.jpg',
            content: 'Chất lượng vượt trội nhất',
            position: 1
        },
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoTP0FnM-KG7892ckuxMGdTqRwZJftWGzvNA&s',
            content: 'Giá thành hợp lý nhất',
            position: 2
        },
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE_d6ChqEiGsydCJrEC0nEMfaVQrMzHiULHw&s',
            content: 'Thời gian nhanh nhất',
            position: 3
        }
    ]
    const icons = iconData.sort((a, b) => a.position - b.position).map((item, index) => {
        return <CommitIcon key={index} {...item}/>
    })
    return <div className={styles.homeCommit}>
        <div className={styles.title}>PHOTOCOPY 99</div>
        <div className={styles.content}>
            Với định hướng “phát triển thương hiệu PHOTOCOPY99 trở thành đơn vị tiên phong ứng dụng công nghệ & thiết bị in tiên tiến nhất Việt Nam” chúng tôi cam kết:
        </div>
        <Row gutter={[16, 16]} justify="center" align="middle">
            {icons}
        </Row>
    </div>
};

export default HomeCommit;
