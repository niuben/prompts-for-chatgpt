import { useState } from "react";

// 获取具体prompt对象
function getPrompt(data, _id) {
    let promptArr = data.filter((prompt, index) => prompt.id == _id);

    //暂时用index代替
    if (typeof promptArr == 'object' && promptArr.length == 1) {
        return promptArr[0];
    }
    return null;
};

// 设置promptsw
export const usePrompts = ()=> {
    let [prompt, setPrompt] = useState({id: -1});
    
    return [prompt, setPrompt];
}