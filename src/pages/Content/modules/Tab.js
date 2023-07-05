import React, { useState } from 'react';
import './TabComponent.css'; // 引入样式文件

const TemplateTab = () => {
    return <div className="tab-content">这是模版标签的内容</div>; // 使用tab-content类名
};

const PublicTemplateTab = () => {
    return <div className="tab-content">这是公共模版标签的内容</div>; // 使用tab-content类名
};

const TabComponent = () => {
    const [activeTab, setActiveTab] = useState('template');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <div className="tab-buttons"> {/* 使用tab-buttons类名 */}
                <button
                    className={activeTab === 'template' ? 'active' : ''}
                    onClick={() => handleTabChange('template')}
                >
                    我的模版
                </button>
                <button
                    className={activeTab === 'publicTemplate' ? 'active' : ''}
                    onClick={() => handleTabChange('publicTemplate')}
                >
                    公共模版
                </button>
            </div>
            <div>
                {activeTab === 'template' && <TemplateTab />}
                {activeTab === 'publicTemplate' && <PublicTemplateTab />}
            </div>
        </div>
    );
};

export default TabComponent;
