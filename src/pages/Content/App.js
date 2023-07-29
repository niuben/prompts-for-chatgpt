import React, { useEffect, useState } from 'react';

import './style/Common.scss';
import './style/App.scss';
import './style/pagination.scss';
import './style/Close.scss';
import './style/Icon.scss';
import './style/Input.scss';
import './style/Tool.scss';
import './style/Tab.scss';

import Template from './modules/component/Template';
import TabComponent from './modules/component/TabComponent';

import {setPlaceHolder} from "./platform/chatGPT/dom";
import {setAppPrompt} from "./platform/chatGPT/proxyFetch";

const App = ({ onDel, onHide }) => {
  var [prompt, setPrompt] = useState({ id: -1 });
  // 是否移除prompts模板，模板只移除一次;

  return (
    <div className="outerWrap">
      <div
        className="close-button"
        href="javascript:void(0)"
        onClick={() => {
          setPrompt(null);
          setAppPrompt(null);
          setPlaceHolder(null);
          onHide && onHide();
        }}
      ></div>
      <Template
        pompt={prompt}
        setPrompt={(prompt) => {
          setPrompt(prompt);
          setAppPrompt(prompt);
          setPlaceHolder(prompt);
        }}
      />

      {/* 
        <TabComponent>
            <Template tabTitle="个人模板" pompt={prompt} setPrompt={(prompt) => {
                setPrompt(prompt);
                appPrompt = prompt;
                setPlaceHolder(prompt);
            }} />
            <Template tabTitle="公共模板" pompt={prompt} setPrompt={(prompt) => {
                setPrompt(prompt);
                appPrompt = prompt;
                setPlaceHolder(prompt);
            }} />
            <div tabTitle="个人模板" key="1">1</div>
            <div tabTitle="公共模版" key="2">2</div>
          </TabComponent> 
      */}
    </div>
  );
};

export default App;
