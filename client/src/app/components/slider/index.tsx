'use client';
import React from 'react';
import { Carousel } from 'antd';
import styles from './index.module.scss';
import { SLIDER_IMAGES } from '@/constant/slider-image';

const Slider: React.FC = () => {
  const imageSliders = SLIDER_IMAGES.map((item, index) => {
    return <div key={index} className={styles.contentStyle}>
      <img src={item.url}/>
    </div>
  })
  return (
    <div className={styles.sliderContainer}>
        <Carousel className={styles.slider} effect="fade" autoplay>
            {imageSliders}
        </Carousel>
    </div>
  );
};

export default Slider;
