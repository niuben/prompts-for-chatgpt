import React, { useState } from 'react';
import '@/style/Tool.scss';
import Select from './Select.js';

var DropdownsAndInput = ({isSelect,  isSearch, onSelectTopic, onSearch }) => {
  const [topic, setTopic] = useState('全部');
  const [query, setQuery] = useState('');
  

  return (
    <div className="toolbar">      
      {isSelect !== false && (
        <Select
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
      {
        isSearch !== false && <input
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
      }
    </div>
  );
};

export default DropdownsAndInput;
