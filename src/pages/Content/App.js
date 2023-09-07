import React, { useEffect, useState } from 'react';
import ReactDOM  from 'react-dom';
import $ from "jquery";

import './style/Common.scss';
import './style/App.scss';
import './style/Close.scss';
import './style/Icon.scss';
import './style/Input.scss';
import './style/Tool.scss';
import './style/Tab.scss';

import Tab from './component/Tab';
import Popup from './component/Popup';
// import TabComponent from './modules/component/TabComponent';

import My from "./modules/My";
import Public from "./modules/Public";

import ButtomToolBar  from "./component/ButtomToolBar";

import { setPlaceHolder, quickAction } from "./platform/chatGPT/dom";
import { setAppPrompt, setCondition, getCondition} from "./platform/chatGPT/proxyFetch";
import { getTemplateHeight } from "./platform/chatGPT/page";

import emitter from "@/utils/emitter.js";



const App = ({ onDel, onHide }) => {
  var [prompt, setPrompt] = useState({ id: -1 });
  var [popupStatus, setPopupStatus] = useState(false);
  var [isShow, setIsShow] = useState(true); 
  // 是否移除prompts模板，模板只移除一次;

  var _className = `mainInner ${isShow ? "" : "hide"}`;
  
  // 当进入对话模式时，隐藏所有模板
  emitter.once("onChat", () => {
    setIsShow(false);
  })


  return (
    <div className="outerWrap">
      <div className="sidebarIcon" onClick={()=>{
        setIsShow(!isShow);
      }}></div>
      <div className={_className} style={{"height": getTemplateHeight() + "px"}}>
        <h2 className="title">ChatGPT 提示词</h2>
        <Public name="公共模板" currentPrompt={prompt} onSetPrompt={(prompt) => {
            setPrompt(prompt);
            setAppPrompt(prompt);
            setPlaceHolder(prompt);
            emitter.emitEvent("")
          }} />

        <div
          className="close-button"
          href="javascript:void(0)"
          onClick={() => {
            setIsShow(false);
            // setPrompt(null);
            // setAppPrompt(null);
            // setPlaceHolder(null);
            // onHide && onHide();
          }}
        ></div>
        {/* <Tab>
          <Public name="公共模板" currentPrompt={prompt} onSetPrompt={(prompt) => {
            setPrompt(prompt);
            setAppPrompt(prompt);
            setPlaceHolder(prompt);
          }} />
          <My name="我的" currentPrompt={prompt} onSetPrompt={(prompt) => {
            setPrompt(prompt);
            setAppPrompt(prompt);
            setPlaceHolder(prompt);
          }} />
        </Tab>
        {popupStatus && (
          <Popup
            onClose={() => {
              setPopupStatus(false);
            }}
            onSave={() => {
              
              updateMyData();
              setTemplateName('my');
            }}
          />
        )} */}              
      </div>
      {
        ReactDOM.createPortal(<ButtomToolBar prompt={prompt} onPromptDel={()=>{
          setPrompt(null);
          setAppPrompt(null);
          setPlaceHolder(null);

        }} onSelect={(key, value)=>{
            setCondition(key, value); 
            getCondition();           
        }} onAction={(action)=>{
          quickAction(action);
        }}/>, 
          $("#promptsToolbar")[0]
        )
      }
    </div>
  );
};

export default App;