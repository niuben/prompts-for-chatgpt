import React, { useEffect, useState } from 'react';

import useMyData from '@/hooks/useMyData.js';
import useData from '@/hooks/useMyData.js';

import Toolbar from "@/component/ToolBar.js";
import Template from '@/component/Template';


const My = ({ currentPrompt, onSetPrompt }) => {

    // 用于个人信息增删操作
    const [myData, addMyData, updateMyData, removeMyData] = useMyData();

    // 用于数据操作
    const [data, setTopicData, setSearchData] = useData(myData);

    return (
        <div>
            <Toolbar onSearch={(query) => {
                setSearchData(query);
            }} onSelectTopic={(topic) => {
                setTopicData(topic);
            }} />
            <Template currentPrompt={currentPrompt} data={data} />
        </div>)
};

export default My;