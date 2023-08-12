import React, { useEffect, useState } from 'react';

import public_data from '@/data/github_data.js';
import useData, {getSearchData, getRangeData, getTopicData} from '@/hooks/useData.js';

import Toolbar from "@/component/ToolBar.js";
import Template from '@/component/Template';

import emitter from "@/utils/emitter.js";

emitter.on("pagination", (a, b, c) => {
    console.log("pagination", a, b, c);
})

emitter.emitEvent("pagination", [1, 2, 3]);

const Public = ({ currentPrompt, onSetPrompt }) => {
    // 用于数据操作
    const [data, setTopicData, setSearchData] = useData(public_data);
    // useEffect(()=>{
    //     console.log("data change", data);
    // }, [data]);

    return (
        <div>
            <Toolbar onSearch={(query, topic) => {                
                setSearchData(query, topic);                
            }} onSelectTopic={(topic) => {
                setTopicData(topic);
            }} />
            <Template data={data} currentPrompt={currentPrompt} onChoosePrompt={(prompt) => {
                onSetPrompt(prompt)
            }} />
        </div>)
};

export default Public;