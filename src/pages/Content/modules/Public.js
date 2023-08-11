import React, { useEffect, useState } from 'react';

import public_data from '@/data/github_data.js';
import useData from '@/hooks/useData.js';

import Toolbar from "@/component/ToolBar.js";
import Template from '@/component/Template';


const Public = () => {
    // 用于数据操作
    const [data, setTopicData, setSearchData] = useData(public_data);

    return (
        <div>
            <Toolbar onSearch={(query) => {
                setSearchData(query);
            }} onSelectTopic={(topic) => {
                setTopicData(topic);
            }} />
            <Template data={data} onChoosePrompt={() => {

            }} />
        </div>)
};

export default Public;