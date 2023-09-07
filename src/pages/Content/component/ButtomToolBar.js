// 顶部tool
import React, { useState } from 'react';
import '@/style/Tool.scss';
import Select from './Select.js';
import ButtonSelect from "./ButtonSelect.js";
import emitter from "@/utils/emitter.js";
import {Language, Tone, WriteStyle, Action} from "@/data/condition.js"
import {isChatPage} from "@/platform/chatGPT/page";

let handle;
let ButtonToolBar = ({isSelect, prompt, onPromptDel, onSelect, onAction }) => {
  var [isChatStatus, setChatStatus] = useState(isChatPage());
  
  emitter.once("onChat", ()=>{
    setChatStatus(true);
  });
  

  return (
    <div className="toolbar">            
      {
        (prompt!= null && prompt["id"] != -1) && <div className="prompts_tips mb10">        
            {prompt.title}
            <div className='prompts_tips_close' onClick={()=>{
                onPromptDel();
            }}></div>
          </div>
      }
      <div>
        <Select
        title="语言"
        data = {Language}
        className="mr10"
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

      {
        isChatStatus && <ButtonSelect
          title="&nbsp;"
          data = {Action}
          defaultValue='继续'
          className="right mr10"
          onSelect={(action) => {
            onAction(action);
          }}
        />
      }
    </div>

    </div>
  );
};

export default ButtonToolBar;
