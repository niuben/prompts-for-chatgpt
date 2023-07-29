import React, { useState } from 'react';
import '@/style/Tab.scss'; // 引入样式文件

const TemplateTab = () => {
  return <div className="tab-content">这是模版标签的内容</div>; // 使用tab-content类名
};

const PublicTemplateTab = () => {
  return <div className="tab-content">这是公共模版标签的内容</div>; // 使用tab-content类名
};

const TabComponent = ({ templateName, onChange }) => {
  const handleTabChange = (tab) => {
    onChange && onChange(tab);
  };

  return (
    <div>
      <div className="tab-buttons">
        {' '}
        {/* 使用tab-buttons类名 */}
        <button
          className={templateName === 'public' ? 'active' : ''}
          onClick={() => handleTabChange('public')}
        >
          公共模版
        </button>
        <button
          className={templateName === 'my' ? 'active' : ''}
          onClick={() => handleTabChange('my')}
        >
          我的模版
        </button>
      </div>
    </div>
  );
};

export default TabComponent;
