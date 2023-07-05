import React, { useEffect, useState } from 'react'

import './style/Common.scss'
import './style/App.scss'
import './style/pagination.scss'
import './style/Close.scss'
import './style/Icon.scss'
import "./style/Input.scss"


import Template from './modules/Template'
import fetchHook from './utils/fetch-hook'

import { getFromLocalStorage, saveToLocalStorage } from "./utils/localStorage";
import { PROMPTS_ID } from "./utils/constant";
import { insertNumberToFront } from "./utils/utils";
import Popup from './modules/Popup'
import Tab from './modules/Tab'


var appPrompt = null;
fetchHook((url, options) => {

    console.log("fetchHook!!!!");

    // 判断是否对话
    if (url.indexOf("conversation") == -1) {
        return options;
    }

    // 判断是否请求对话
    if (!options.body) {
        return options;
    }

    console.log("conversation");

    /*
    * 提交prompt的id存到storage中;
    */

    if (appPrompt != null) {
        var promptsID = getFromLocalStorage(PROMPTS_ID);
        promptsID = promptsID == null ? [appPrompt.id] : insertNumberToFront(appPrompt.id, promptsID);
        saveToLocalStorage(PROMPTS_ID, promptsID);
    }

    // if (isRemoveTpl == false) {
    //     isRemoveTpl = true;
    //     var promptsTemplate = document.getElementById("chatGTP_prompts");
    //     if (promptsTemplate != null) {
    //         promptsTemplate.remove();
    //         onDel();
    //     }
    // }

    try {

        var bodyData = typeof options.body == "string" ? JSON.parse(options.body) : options.body;

        if (bodyData.messages == undefined ||
            bodyData.messages[0] == undefined ||
            bodyData.messages[0].content == undefined ||
            bodyData.messages[0].content.parts == undefined ||
            appPrompt == null
        ) {
            return options;
        }

        var message = bodyData.messages[0];
        var part = message.content.parts[0];

        // 如果有prompt字段（更新详细的描述），使用prompt字段;
        var content = appPrompt.prompt || appPrompt.content;
        message.content.parts[0] = content.replace(/\[placeholder\]/g, part);
        options.body = JSON.stringify(bodyData);

    } catch (e) {
        console.log("error", e);
    }

    return options;
});



const App = ({ onDel, onHide }) => {

    var [currentPrompt, setPrompt] = useState({ id: -1 });

    // 是否移除prompts模板，模板只移除一次;

    //设置输入框placeholder
    var setPlaceHolder = function (prompt) {
        var formEle = document.querySelector("form.stretch");
        if (formEle == null) return;

        var textareaEle = formEle.querySelector("textarea");
        if (textareaEle != null) {

            // 第1版不设置placeholder，先直接设置value
            textareaEle.setAttribute("placeholder", prompt != null ? prompt.placeholder : "Send a message.");

            // textareaEle.setAttribute("value", prompt.content);
            // textareaEle.style.height = "76px";
            // textareaEle.value = prompt.content;
            textareaEle.focus();
        }

    }


    return (
        <div className="outerWrap">

            <div class="close-button" href="javascript:void(0)" onClick={() => {
                setPrompt(null);
                appPrompt = null;
                setPlaceHolder(null);

                onHide && onHide();
            }}></div>
            <Tab />
            <Template currentPrompt={currentPrompt} setPrompt={(prompt) => {
                setPrompt(prompt);
                appPrompt = prompt;
                setPlaceHolder(prompt);
            }} />
            <Popup />
            {/* <div className="musicControls">music controls</div> */}
        </div>
    )
}

export default App
