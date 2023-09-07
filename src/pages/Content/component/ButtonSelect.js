// 顶部tool
import React, { useState } from 'react';
import "@/style/buttonSelect.scss";
import {toSelect, getKeyByVal} from '@/utils/toSelect.js';

let ButtonSelect = ({title, className, data, defaultValue, onSelect}) => {    
    
    const [dropdownValue, setDropdownValue] = useState(defaultValue);    

    let options = toSelect(data, {
        key: 'name',
        val: 'name',
    });


    let dynamicClassName = "toolbar buttonSelect"
    if(className) {
        dynamicClassName += ` ${className}`;
    }

    return (
       <div className={dynamicClassName}>
        <div><label className="dropdown-label">{title}</label></div>
        <div>
            <button type="button" className='left' onClick={(e)=>{
                e.preventDefault();
                e.stopPropagation();
                onSelect && onSelect(dropdownValue);
            }} >{ dropdownValue}</button>
            <select
            className="dropdown leftNoneRadius"
            style={{"width": "37px"}}
            value={dropdownValue}
            onChange={(e, val) => {
                var val = e.target.value;
                setDropdownValue(val);
                onSelect && onSelect(val);
             }}
            >
            {options.map((item, index) => {
            return (
                <option key={index} value={item.key}>
                {item.key}
                </option>
            );
            })}
        </select>
        </div>
    </div>
    );
};

export default ButtonSelect;
