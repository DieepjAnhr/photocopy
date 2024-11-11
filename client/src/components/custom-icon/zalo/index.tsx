import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js', 
});

const ZaloOutlined: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => (
  <IconFont type="icon-zalo" {...props} />
);

export default ZaloOutlined;