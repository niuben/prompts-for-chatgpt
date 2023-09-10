// 顶部tool
import React, { useState } from 'react';
import '@/style/Tool.scss';
import Select from './Select.js';
import ButtonSelect from "./ButtonSelect.js";
import emitter from "@/utils/emitter.js";
import {Tone, WriteStyle, Action} from "@/data/condition.js"
import {Language} from "@/data/language.js"
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
        title="Language"
        data = {Language}
        className="mr10"
        default={'English'}
        onChange={(language) => {
          
          onSelect("Language", language);
          // setPage(0);
        }}
      />
      
      <Select
        title="Tone"
        data = {Tone}
        className="mr10"
        default={'Default'}
        onChange={(tone) => {
          onSelect("Tone", tone);
        }}
      />

      <Select
        title="Write Style"
        data = {WriteStyle}
        default={'Default'}
        className="mr10"
        onChange={(writeStyle) => {
          onSelect("WriteStyle", writeStyle);
        }}
      />

      {
        isChatStatus && <ButtonSelect
          title="&nbsp;"
          data = {Action}
          defaultValue='Continue'
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
