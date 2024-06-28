'use client';
import React, { useState } from 'react';
import { Menu, Button, Drawer, MenuProps } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './index.module.scss';
import { SERVICES } from '@/constant/services';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const menuDesktopItems: MenuProps['items'] = SERVICES.map((item, index) => ({
    key: index,
    label: <Link href={item.path} className={styles.menuItem}>
        {item.label}
    </Link>
  }))
  const menuMobileItems: MenuProps['items'] = SERVICES.map((item, index) => ({
    key: index,
    label: <Link href={item.path} className={styles.menuItem} onClick={onClose}>
        {item.label}
    </Link>
  }))

  return (
    <>
      <div className={styles.menuContainer}>
          <div className={styles.desktopMenu}>
              <Menu mode="horizontal" items={menuDesktopItems}/>
          </div>
          <div className={styles.mobileMenuButton}>
              <Button type="primary" icon={<MenuOutlined/>} onClick={showDrawer}/>
          </div>
      </div>

      <Drawer title="Menu" placement="right" maskClosable={true} onClose={onClose} open={open}>
          <Menu mode="vertical" items={menuMobileItems}/>
      </Drawer>
    </>
  );
};

export default Header;
