import React, { useState } from 'react';
import '@/style/Tab.scss'; // 引入样式文件

const TemplateTab = () => {
  return <div className="tab-content">这是模版标签的内容</div>; // 使用tab-content类名
};

const PublicTemplateTab = () => {
  return <div className="tab-content">这是公共模版标签的内容</div>; // 使用tab-content类名
};

const TabComponent = ({ children, templateName, onChange }) => {
  
  console.log("children", children);

  const handleTabChange = (tab) => {
    onChange && onChange(tab);
  };
  let [tabIndex, setTabIndex] = useState(0)

  return (
    <div>
      <div className="tab-buttons">
        {
          children.map((child, index) => (
            <button 
            key={index}
            className={tabIndex === index ? 'active' : ''}
            onClick={() => setTabIndex(index)}
            >
              {child.props.name}
            </button>
          )
        )}   
      </div>      
        {
          children.map((child, index) => {
              if(tabIndex == index) return child;
          })
        }
    </div>
  );
};

export default TabComponent;
