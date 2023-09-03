import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { insertBefore, createAddBtn } from './utils/dom';
import { getElements, createPromptsEle, createBottomToolbar, createAddPromptBtn, removeAddPromptBtn, getPromptsEle, removePrompts, hideChatGPT, showChatGPT } from "./platform/chatGPT/dom";
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
    
    //创建存放底部toolbar div节点;
    createBottomToolbar()
    
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
      removePrompts();
      setTimeout(()=>{
        createAddPromptBtn();
      }, 1000);
    })

  })
});
