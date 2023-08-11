/*
 * 下拉框组件, 展示传入值，选中选项后
 */
import React, { useState } from 'react';

/*
* options数据结构是  
* [{
    key: "" 
    val: ""
},{

}]
*/
import topicOptions from '@/data/topic.js';
import { toSelect } from '@/utils/toSelect.js';


export default function Select({ title, defaultValue, onChange }) {
  const [dropdownValue, setDropdownValue] = useState(defaultValue);

  var options = toSelect(topicOptions, {
    key: 'name',
    val: 'name',
  });

  return (
    <div className="dropdown-container left">
      <label className="dropdown-label">{title}:</label>
      <select
        className="dropdown"
        value={dropdownValue}
        onChange={(e) => {
          var val = e.value;
          setDropdownValue(val);
          onChange && onChange(e.target.value);
        }}
      >
        {options.map((item, index) => {
          return (
            <option key={index} value={item.key}>
              {item.val}
            </option>
          );
        })}
      </select>
    </div>
  );
}
