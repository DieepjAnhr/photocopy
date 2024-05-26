'use client';
import React from 'react';
import { Carousel } from 'antd';
import styles from './index.module.scss';
import { SLIDER_IMAGES } from '@/constant/slider-image';

const Slider: React.FC = () => {
  return (
    <div className={styles.sliderContainer}>
        <Carousel effect="fade" autoplay className={styles.slider}>
            {SLIDER_IMAGES.map((item) => <div><img className={styles.contentStyle} src={item.url}></img></div>)}
        </Carousel>
    </div>
  );
};

export default Slider;
