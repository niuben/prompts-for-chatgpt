import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import emitter from "@/utils/emitter.js";

import { getElements, createPromptsEle, createBottomToolbar, createAddPromptBtn, removeAddPromptBtn, getPromptsEle, removePrompts, hideChatGPT, showChatGPT, hideElements } from "./platform/chatGPT/dom";
import { isIndexPage, isChatPage } from "./platform/chatGPT/page";
import { onSendMessage} from "./platform/chatGPT/listener";

import './utils/history.js';
import './style/App.scss';

import './style/Dark.scss';
import App from './App.js';

function createApp() {
  ReactDOM.render(
    <App onDel={() => {
      isAppExist = false;
    }}
      onHide={() => {
        removePrompts();
        showChatGPT();
      }}
    />,
    getPromptsEle()[0],
    () => {
      // fn && fn();
    }
  );
}


["replaceState", "pushState", "load"].forEach((eventName) => {
  window.addEventListener(eventName, function (e) {
    
    //删除一些无用的dom
    hideElements(); 

    //创建存放底部toolbar div节点;
    createBottomToolbar()

    // 
    if (isIndexPage()) {
      setTimeout(() => {
        createApp();
        hideChatGPT();  
      }, 1000);    
    }

    if (isChatPage()) {
      
      setTimeout(() => {
        removeAddPromptBtn()
        createAddPromptBtn();               
      }, 1000);
    }
  
    //绑定发送信息事件
    onSendMessage((event)=>{      
      // removePrompts();
      
      // 隐藏prompts模板
      hidePrompts();

      setTimeout(()=>{
        // createAddPromptBtn();
      }, 1000);
    })

  })
});
