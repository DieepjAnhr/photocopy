'use client';
import React, { useState } from 'react';
import { Menu, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './index.module.scss';
import { SERVICES } from '@/constant/services';

const { Item } = Menu;

const Header: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div className={styles.menuContainer}>
        <div className={styles.mobileMenuButton}>
          <Button type="primary" onClick={showDrawer} icon={<MenuOutlined />} />
        </div>
        <div className={styles.desktopMenu}>
          <Menu mode="horizontal">
            {SERVICES.map((item) => <Item key={item.key}><Link href={item.path}>{item.label}</Link></Item>)}
          </Menu>
        </div>
      </div>

      <Drawer
        title="Menu"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <Menu mode="vertical">
          {SERVICES.map((item) => <Item key={item.key}><Link href={item.path} onClick={onClose}>{item.label}</Link></Item>)}
        </Menu>
      </Drawer>
    </>
  );
};

export default Header;
