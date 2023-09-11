import { useState } from "react";
import { PROMPTS_ID } from '@/hooks/constant';
import { rangeObjectsById } from '@/utils/utils.js';
import { getFromLocalStorage } from '../utils/localStorage';

// 将使用过模板放在最前面
export function getRangeData(data) {
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
export function getCategoryData(data, category) {
  
  let categoryData = [];
  data.map((item) => {
    if (item.category == category || category == "All") {
      categoryData.push(item);
    }
  });
  return categoryData;
}

// 设置搜索数据
export function getSearchData(data, query) {
  var searchData = data;
  if (query != '' && query != undefined) {
    searchData = [];
    data.map((item) => {
      item.prompt_title += '';
      item.teaser += '';
      if (
        item.prompt_title.indexOf(query) != -1 ||
        item.teaser.indexOf(query) != -1
      ) {
        searchData.push(item);
      }
    });
  }
  return searchData;
}

// 获取当前数据
export function getCurrentData(data, page, pageLimite) {
  // var totalData = getTotalData();
  var start = page * pageLimite;
  var end = start + pageLimite;
  return data.slice(start, end);
}

let useAllData;
export default useAllData = (initData) => {

  // 把使用过数据排在最前面
  var rangeData = getRangeData(initData);
  var [data, setData] = useState(rangeData);


  // 设置
  let setCategoryData = function (category) {
    let categoryData = getCategoryData(rangeData, category);
    setData(categoryData);
  }

  let setSearchData = function (query, category) {
    let categoryData = getCategoryData(rangeData, category);
    let searchData = getSearchData(categoryData, query);
    setData(searchData);
  }

  return [data, setCategoryData, setSearchData];
}


