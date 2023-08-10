import { useState } from "react";
import { PROMPTS_ID } from '@/hooks/constant';
import { rangeObjectsById } from '@/utils/utils.js';

// 将使用过模板放在最前面
function getRangeData(data){
    // 将使用过模板放在最前面
    var prompts_id = getFromLocalStorage(PROMPTS_ID);
    if (prompts_id == null) prompts_id = [];
    var rangeData = rangeObjectsById(prompts_id, data, (item) => {
      item.isUsed = true;
      return item;
    });
    
    return rangeData;
}

// 设置分类数据
function getTopicData(data, topic){
    let topicData = [];
    data.map((item) => {
        if (item.topic == topic) {
            topicData.push(item);
        }
    });
    return data;
}

// 设置搜索数据
function getSearchData(data, query){
    var searchData = data;
    if (query != '' && query != undefined) {
      searchData = [];
      data.map((item) => {
        item.title += '';
        item.content += '';
        if (
          item.title.indexOf(query) != -1 ||
          item.content.indexOf(query) != -1
        ) {
          searchData.push(item);
        }
      });
    }
    return searchData;
}



export const useAllData = (initData)=> {
  
    // 把使用过数据排在最前面
    var rangeData = setRangeData(initData);
    var [data, setData] = useState(rangeData);
    
    // 设置
    let setTopicData = function(topic){
        let topicData = getTopicData(rangeData, topic);
        setData(topicData);
    }

    let setSearchData = function(query){
        let topicData = getTopicData(rangeData, topic);
        let searchData = getSearchData(topicData, query);
        setData(searchData);
    }

    return [data, setTopicData, setSearchData];
}


