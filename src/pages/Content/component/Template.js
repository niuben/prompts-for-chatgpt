import React, { useRef, useEffect, useState, createElement } from 'react';

// import data from "./data/data.js"
import Pagination from './Paginnation.js';
import Select from './Select.js';

import Tab from './Tab.js';
import Popup from './Popup.js';

import public_data from '@/data/github_data.js';
import useMyData from '@/hooks/useMyData.js';

import topicOptions from '@/data/topic.js';
import { toSelect } from '@/utils/toSelect.js';
import {
  throttled as createThrottled,
  rangeObjectsById,
} from '@/utils/utils.js';
import { getFromLocalStorage } from '@/utils/localStorage';
import { PROMPTS_ID } from '@/utils/constant';

// import Toast from "./Toast";
var handle;

const Template = ({ currentPrompt, setPrompt, onOpenPopup }) => {
  // const [id, setId] = useState(null);
  const [page, setPage] = useState(0);
  const [pageLimite, setPageLimite] = useState(16);
  const [topic, setTopic] = useState('全部');
  const [query, setQuery] = useState('');
  

  const [myData, addMyData, updateMyData, removeMyData] = useMyData();

  let [templateName, setTemplateName] = useState('public');

  console.log('myData', myData);

  // const [isToast, setToast] = useState(false);
  // const mainInnerRef = useRef();

  var options = toSelect(topicOptions, {
    key: 'name',
    val: 'name',
  });

  var getTotalData = function () {
    // 判断使用哪个数据
    var data = templateName == 'my' ? myData : public_data;

    // 将使用过模板放在最前面
    var prompts_id = getFromLocalStorage(PROMPTS_ID);
    if (prompts_id == null) prompts_id = [];
    var rangeData = rangeObjectsById(prompts_id, data, (item) => {
      item.isUsed = true;
      return item;
    });

    var topicData = rangeData;
    // 获取当前分类数据
    if (topic != '全部' && templateName == 'public') {
      topicData = [];
      rangeData.map((item) => {
        if (item.topic == topic) {
          topicData.push(item);
        }
      });
    }

    // 获取搜索过滤值
    var searchData = topicData;
    if (query != '' && query != undefined) {
      searchData = [];
      topicData.map((item) => {
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
  };

  var getCurrentData = function (data) {
    // var totalData = getTotalData();
    var start = page * pageLimite;
    var end = start + pageLimite;
    return data.slice(start, end);
  };

  var getPrompt = function (_id) {
    var promptArr = data.filter((prompt, index) => prompt.id == _id);

    //暂时用index代替
    // var promptArr = data.filter((prompt, index) => index == _id);
    if (typeof promptArr == 'object' && promptArr.length == 1) {
      return promptArr[0];
    }
    return null;
  };

  var resetPrompt = function () {
    // setId(null);
    setPrompt(null);
  };

  //截取文字
  var substr = function (str, length) {
    if (typeof str != 'string') {
      return '';
    }
    return str.substr(0, length);
  };

  useEffect(() => {
    setData(getTotalData());
  }, [templateName, popupStatus, query, myData]);

  // 用于节流时间句柄
  var handle;
  const [data, setData] = useState(getTotalData());
  return (
    <div className="mainInner">
      <h2 className="title">ChatGPT 提示词</h2>
      <Tab
        templateName={templateName}
        onChange={(templateName) => {
          // console.log("templateName", templateName);
          setTemplateName(templateName);
          updateMyData();
        }}
      />
      {templateName != 'my' && (
        <Select
          options={options}
          title="分类"
          default={'全部'}
          onChange={(value) => {
            console.log('value', value);
            setTopic(value);
            setPage(0);
          }}
        />
      )}
      <div
        className="circle"
        onClick={() => {
          setPopupStatus(true);
          onOpenPopup && onOpenPopup();
        }}
      >
        <div className="plus"></div>
      </div>
      <input
        placeholder="搜索"
        className="right mr20"
        onChange={(e) => {
          var val = e.target.value;
          if (handle != undefined) {
            clearTimeout(handle);
            handle = undefined;
          }
          handle = setTimeout(() => {
            setQuery(val);
            handle == undefined;
          }, 150);
        }}
      />
      <div className="cardsWrap clear">
        <div className="cardsWrapInner">
          {getCurrentData(data).map((prompt) => (
            <div
              className={
                'card' +
                (currentPrompt != null && prompt.id == currentPrompt.id
                  ? ' active'
                  : '') +
                ' ' +
                (prompt.isUsed == true ? 'isUsed' : '')
              }
              key={prompt.id}
              onClick={() => {
                //当id == 当前prompt.id，证明再次点击已选的prompt, 这是设置取消;
                if (currentPrompt == null || currentPrompt.id != prompt.id) {
                  // setId(prompt.id);
                  setPrompt(prompt);
                } else {
                  resetPrompt();
                }
              }}
            >
              <div className="cardContent">
                <h3>{substr(prompt.title, 50)}</h3>
                {templateName == 'my' && (
                  <a
                    className="delete"
                    onClick={() => {
                      removeMyData(prompt.id);
                      updateMyData();
                    }}
                  >
                    x
                  </a>
                )}

                <p>
                  <span className="icon icon_topic">{prompt.topic}</span>
                  <span className="icon icon_author">{[prompt.author]}</span>
                  {prompt.isUsed && (
                    <span className="icon icon_pin">已使用</span>
                  )}
                </p>
                {/* <p>{keyword[prompt.topic]}</p> */}
                {/* <p></p> */}
                <div
                  title={prompt.content}
                  className="multiLineEllipsis"
                  style={{ width: 'auto' }}
                >
                  {prompt.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {data.length > pageLimite && (
        <Pagination
          style={{ float: 'right' }}
          itemsPerPage={pageLimite}
          currentPage={page}
          totalItems={data.length}
          paginate={(page) => {
            console.log('page', page);
            setPage(page);
          }}
        />
      )}
      {/* <Tool getPrompt={getPrompt} id={id} onEntry={(prompt) => {
                // copy(prompt);
            }} /> */}
     
    </div>
  );
};

export default Template;
