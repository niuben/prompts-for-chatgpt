// 顶部tool
import React, { useState } from 'react';
import '@/style/Tool.scss';
import Select from './Select.js';
import emitter from "@/utils/emitter.js";
import topicOptions from '@/data/topic.js';


let handle;
let DropdownsAndInput = ({isSelect,  isSearch, onSelectTopic, onSearch }) => {
  const [topic, setTopic] = useState('全部');
  const [query, setQuery] = useState('');

  return (
    <div className="toolbar">      
      {isSelect !== false && (
        <Select
          title="分类"
          default={'全部'}
          data = {topicOptions}
          onChange={(topic) => {
            console.log('topic', topic);
            setTopic(topic);
            onSelectTopic(topic);
            emitter.emitEvent("onSelectTopic")
            // setPage(0);
          }}
        />
      )}
      {/* <div
        className="circle"
        onClick={() => {
          setPopupStatus(true);
          onOpenPopup && onOpenPopup();
        }}
      >
        <div className="plus"></div>
      </div> */}
      {
        isSearch !== false && <div>        
          <div><label className="dropdown-label">&nbsp;</label></div>
          <div> 
            <input
              placeholder="搜索"
              className="right mr20"
              onChange={(e) => {
                var query = e.target.value;
                if (handle != undefined) {
                  clearTimeout(handle);
                  handle = undefined;
                }
                handle = setTimeout(() => {
                  setQuery(query);
                  onSearch(query, topic);
                  emitter.emitEvent("onSearch");
                  handle == undefined;
                }, 150);
              }}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default DropdownsAndInput;
