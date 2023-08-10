import { useState } from "react";

var getPrompt = function (data, _id) {
    var promptArr = data.filter((prompt, index) => prompt.id == _id);

    //暂时用index代替
    if (typeof promptArr == 'object' && promptArr.length == 1) {
        return promptArr[0];
    }
    return null;
};


export const usePrompts = (initData)=> {
    
    
}