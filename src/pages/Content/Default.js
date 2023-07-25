import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './style/App.scss';
import './utils/history.js';

import {insertBefore, createAddBtn} from './utils/dom';

import App from './App.js';
import './style/Dark.scss';

window.addEventListener('replaceState', function (e) {
  setTimeout(judgeUrl, 100);
});
window.addEventListener('pushState', function (e) {
  setTimeout(judgeUrl, 100);
});

//根据url判断当前状态
function judgeUrl() {
  // if (location.href.indexOf('?model=') == -1) return;
  init();
}

/*
* 判断页面，几种类型
* 1. 首页（没有对话框）
* 2. 对话框（
    2.1 刚提交对话框 
    2.2 打开页面对话框）
*/

/*
 * 缓存机制: 当第1次获取dom节点时，缓存起来
 * 全局变量，第一次有chatGPT标题时，缓存起来;
 */
var h1Eles;
function getElements() {
  var mainEle = document.querySelector('main.relative.h-full.w-full'); //右边整体内容
  var chatGPTInforEle = document.querySelector('div.text-gray-800'); // 右边chatGPT内容（包括标题、Examples、Capabilities和Limitations)
  var contentEle = mainEle != null ?  mainEle.querySelector('div.flex.flex-col') : null; // 右边容器用于放App
  var chatGPTBtmEle = mainEle != null ?  mainEle.querySelector('.flex-shrink-0') : null ; // 右边底部区域
  var editBtns = mainEle != null ?  mainEle.querySelectorAll(".p-1.rounded-md") : null;


  var scrollEle = document.querySelector(
    '.react-scroll-to-bottom--css-zgqss-1n7m0yu'
  ); //右边滚动区域
  var groupEle = mainEle != null ? mainEle.querySelector('div.group.w-full.text-gray-800') : null;

  // 容错判断
  if (
    chatGPTInforEle == null ||
    contentEle == null ||
    chatGPTBtmEle == null ||
    mainEle == null
  ) {
    if (h1Eles == undefined && document.querySelectorAll('h1').length != 0) {
      h1Eles = document.querySelectorAll('h1');
    }
    var h1Ele = null;

    // 获取以chatGPT为标题元素
    if (h1Eles != undefined) {
      for (var item of h1Eles) {
        if (item.innerHTML.toLocaleLowerCase() == 'chatgpt') {
          h1Ele = item;
        }
      }
    }

    if (h1Ele != null) {
      chatGPTInforEle = h1Ele.parentNode;
      contentEle = chatGPTInforEle.parentNode;
      mainEle = document.querySelector('main');
    }
  }

  return {
    mainEle: mainEle,
    chatGPTInforEle: chatGPTInforEle,
    chatGPTBtmEle: chatGPTBtmEle,
    contentEle: contentEle,
    scrollEle: scrollEle,
    groupEle: groupEle,
    editBtns: editBtns
  };
}

function judgePage() {
  // 对话框页面
  var { groupEle, chatGPTInforEle } = getElements();
  if (groupEle != null) {
    return 'chat';
  }

  // 首页chatGPT提示;
  if (chatGPTInforEle != null) {
    return 'index';
  }
}

function createTpl(fn) {
  var { chatGPTBtmEle, contentEle } = getElements();
  var appEle = document.createElement('div');
  appEle.setAttribute('id', 'chatGTP_prompts');
  // contentEle.appendChild(appEle);
  contentEle.insertBefore(appEle, chatGPTBtmEle);

  ReactDOM.render(
    <App
      onDel={() => {
        isAppExist = false;
      }}
      onHide={() => {
        removeTpl();
        showChatGPT();
        // console.log("onHide");
      }}
    />,
    appEle,
    () => {
      fn && fn();
    }
  );
}
function removeTpl() {
  var promptsTemplate = document.getElementById('chatGTP_prompts');
  if (promptsTemplate != null) {
    promptsTemplate.remove();
  }
}

function hideChatGPT() {
  var { chatGPTInforEle } = getElements();

  // chatGPTInforEle.style.height = "1px";
  // chatGPTInforEle.style.overflow = "hidden";
  chatGPTInforEle.style.display = 'none';
}
function showChatGPT() {
  var { chatGPTInforEle } = getElements();
  chatGPTInforEle.style.display = 'block';
}

function isHaveTpl() {
  return document.getElementById('chatGTP_prompts') != null;
}

function init() {
  console.log('init');

  // 判断App模块是否存在;
  var isTplCreating = false;
  var isTplCreated = false;

  var callback = function (mutationList, observer) {
    var { mainEle, chatGPTInforEle, contentEle, editBtns } = getElements();
    console.log("change!")

    // 初始化时
    if (mainEle == null) return;
    
    //  chatGPT对话框
    if (chatGPTInforEle == null) {        
        return;
    };

    if (contentEle == null) return;

    //如果是对话页面，则去掉模板列表页
    if (judgePage(mainEle) == 'chat') {
      try {
        // observer && observer.disconnect();
        editBtns.forEach((editBtn)=>{
          // insertBefore(createAddBtn(), editBtn);
          $("<button class='addPrompt'>add</button>").insertBefore(editBtn);
          console.log("editBtn", editBtn);
        });
        isHaveTpl() && removeTpl();
      } catch (e) {}
      return;
    }

    // 如果是首页则展示模板列表
    if ( isHaveTpl() == false && isTplCreating != true &&  isTplCreated == false && judgePage(mainEle) == 'index') {
      hideChatGPT();
      isTplCreating = true;
      // 创建卡片dom节点
      createTpl(() => {
        isTplCreating = false;
        isTplCreated = true;
      });
    }
  };
  var config = {
    subtree: true,
    childList: true,
  };
  // var rootEle = document.getElementById("__next");

  var { mainEle } = getElements();
  if (mainEle != null) {
    var Observer = new MutationObserver(callback);
    Observer.observe(mainEle, config);
  }


  callback();
}
init();
