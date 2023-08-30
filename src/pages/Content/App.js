import React, { useEffect, useState } from 'react';

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

import { setPlaceHolder } from "./platform/chatGPT/dom";
import { setAppPrompt } from "./platform/chatGPT/proxyFetch";

const App = ({ onDel, onHide }) => {
  var [prompt, setPrompt] = useState({ id: -1 });
  var [popupStatus, setPopupStatus] = useState(false);
  // 是否移除prompts模板，模板只移除一次;
  
  return (
    <div className="outerWrap">
      <div className="mainInner">
        <h2 className="title">ChatGPT 提示词</h2>
        {/* <div
          className="close-button"
          href="javascript:void(0)"
          onClick={() => {
            setPrompt(null);
            setAppPrompt(null);
            setPlaceHolder(null);
            onHide && onHide();
          }}
        ></div> */}
        <Tab>
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
        )}
      </div>
    </div>
  );
};

export default App;