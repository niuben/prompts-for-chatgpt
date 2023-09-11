// 顶部tool
import React, { useState } from 'react';
import '@/style/Tool.scss';
import Select from './Select.js';
import emitter from "@/utils/emitter.js";
// import topicOptions from '@/data/topic.js';
import {Category, UseCase} from '@/data/category.js';
import {strArrToObjArr} from "@/utils/toSelect.js";


let handle;
let DropdownsAndInput = ({isSelect,  isSearch, onSelectCategory, onSearch }) => {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  let categoryOption = strArrToObjArr(Category);

  return (
    <div className="toolbar">      
      {isSelect !== false && (
        <Select
          title="Category"
          default={'All'}
          data = {categoryOption}
          onChange={(category) => {
            // console.log('category', category);
            setCategory(category);
            onSelectCategory(category);
            emitter.emitEvent("onSelectCategory")
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
              placeholder="Search"
              className="right mr20"
              onChange={(e) => {
                var query = e.target.value;
                if (handle != undefined) {
                  clearTimeout(handle);
                  handle = undefined;
                }
                handle = setTimeout(() => {
                  setQuery(query);
                  onSearch(query, category);
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
