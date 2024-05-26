'use client';
import React, { useState } from 'react';
import { Menu, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './index.module.scss';

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
            <Item key="home">
              <Link href="/">Home</Link>
            </Item>
            <Item key="about">
              <Link href="/about">About</Link>
            </Item>
            <Item key="contact">
              <Link href="/contact">Contact</Link>
            </Item>
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
          <Item key="home">
            <Link href="/" onClick={onClose}>Home</Link>
          </Item>
          <Item key="about">
            <Link href="/about" onClick={onClose}>About</Link>
          </Item>
          <Item key="contact">
            <Link href="/contact" onClick={onClose}>Contact</Link>
          </Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default Header;
