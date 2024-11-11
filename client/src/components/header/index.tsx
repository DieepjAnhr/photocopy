'use client';
import React, { useState } from 'react';
import { Menu, Button, Drawer, MenuProps } from 'antd';
import { MenuOutlined, HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './index.module.scss';
import { CATEGORIES } from '@/constant/category-list';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const homeMenuItem = {
    key: 'home',
    label: (
      <Link href="/" className={styles.menuItem}>
        <HomeOutlined style={{ fontSize: '30px', fontWeight: 'bolder' }} />
      </Link>
    ),
  };
  const homeServicesItem = {
    key: 'services',
    label: (
      <Link href="/dich-vu" className={styles.menuItem}>
        Dịch vụ
      </Link>
    ),
  };

  const menuDesktopItems: MenuProps['items'] = [
    homeMenuItem,
    homeServicesItem,
    ...CATEGORIES.map((item, index) => ({
      key: index,
      label: (
        <Link href={`/${item.path}`} className={styles.menuItem}>
          {item.label}
        </Link>
      ),
      children: item?.childrens.length === 0 ? null : item.childrens.map((childItem, childIndex) => ({
        key: `${index}-${childIndex}`,
        label: (
          <Link href={`/${childItem.path}`} className={styles.menuItem}>
            {childItem.label}
          </Link>
        ),
      })),
    })),
  ];

  const menuMobileItems: MenuProps['items'] = [
    homeMenuItem,
    ...CATEGORIES.map((item, index) => ({
      key: index,
      label: (
        <Link href={`/${item.path}`} className={styles.menuItem} onClick={onClose}>
          {item.label}
        </Link>
      ),
      children: item?.childrens.length === 0 ? null : item.childrens.map((childItem, childIndex) => ({
        key: `${index}-${childIndex}`,
        label: (
          <Link href={`/${childItem.path}`} className={styles.menuItem}>
            {childItem.label}
          </Link>
        ),
      })),
    })),
  ];

  return (
    <>
      <div className={styles.menuContainer}>
        <div className={styles.desktopMenu}>
          <Menu mode="horizontal" items={menuDesktopItems} />
        </div>
        <div className={styles.mobileMenuButton}>
          <Button type="primary" icon={<MenuOutlined />} onClick={showDrawer} />
        </div>
      </div>

      <Drawer title="Menu" placement="right" maskClosable={true} onClose={onClose} open={open}>
        <Menu mode="vertical" items={menuMobileItems} />
      </Drawer>
    </>
  );
};

export default Header;
