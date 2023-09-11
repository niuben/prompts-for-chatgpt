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

import { toSelect } from '@/utils/toSelect.js';

export default function Select({ title, className, data, defaultValue, onChange }) {
  const [dropdownValue, setDropdownValue] = useState(defaultValue);
    
  let options = toSelect(data, {
    key: 'name',
    val: 'name',
  });

  

  let dynamicClassName = "dropdown-container left"
  if(className) {
    dynamicClassName += ` ${className}`;
  }


  return (
    <div className={dynamicClassName}>
      <div><label className="dropdown-label">{title}</label></div>
      <div>
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
    </div>
  );
}
