// 顶部tool
import React, { useState } from 'react';
import '@/style/Tool.scss';
import Select from './Select.js';
import ButtonSelect from "./ButtonSelect.js";
import emitter from "@/utils/emitter.js";
import {Language, Tone, WriteStyle, Action} from "@/data/condition.js"

let handle;
let ButtonToolBar = ({isSelect, onSelect, onAction }) => {
  
  return (
    <div className="toolbar">            
      <Select
        title="语言"
        data = {Language}
        className="mr20"
        default={'中文'}
        onChange={(language) => {
          
          onSelect("Language", language);
          // setPage(0);
        }}
      />
      
      <Select
        title="语言风格"
        data = {Tone}
        className="mr10"
        default={'默认'}
        onChange={(tone) => {
          onSelect("Tone", tone);
        }}
      />

      <Select
        title="写作类型"
        data = {WriteStyle}
        default={'默认'}
        className="mr10"
        onChange={(writeStyle) => {
          onSelect("WriteStyle", writeStyle);
        }}
      />

      <ButtonSelect
        title="快捷操作"
        data = {Action}
        defaultValue='继续'
        className="right mr10"
        onSelect={(action) => {
          onAction(action);
        }}
      />


    </div>
  );
};

export default ButtonToolBar;
