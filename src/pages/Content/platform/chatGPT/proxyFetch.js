import fetchHook from '@/utils/fetch-hook';

import { getFromLocalStorage, saveToLocalStorage } from '@/utils/localStorage';
import { PROMPTS_ID } from '@/hooks/constant';
import { insertNumberToFront } from '@/utils/utils';


var appPrompt = null;
var condition = {
    Language: null,
    Tone: null,
    WriteStyle: null
};

// 
export function setAppPrompt(val){
    appPrompt = val;    
}

// prompts相关条件 
export function setCondition(key, val){
    condition[key] = val;
}

export function getCondition(key, val){
    console.log(condition);
}



//代理chatGPT自身fetch请求

function proxyFetch() {

    fetchHook((url, options) => {

        // 判断是否对话
        if (url.indexOf('conversation') == -1) {
            return options;
        }

        // 判断是否请求对话
        if (!options.body) {
            return options;
        }

        // 提交prompt的id存到storage中;
        if (appPrompt != null) {
            var promptsID = getFromLocalStorage(PROMPTS_ID);
            promptsID =  promptsID == null
            ? [appPrompt.id]
            : insertNumberToFront(appPrompt.id, promptsID);
            saveToLocalStorage(PROMPTS_ID, promptsID);
        }

        try {
            var bodyData =
                typeof options.body == 'string' ? JSON.parse(options.body) : options.body;

            if (
                bodyData.messages == undefined ||
                bodyData.messages[0] == undefined ||
                bodyData.messages[0].content == undefined ||
                bodyData.messages[0].content.parts == undefined              
            ) {
                return options;
            }

            var message = bodyData.messages[0];
            var part = message.content.parts[0];
            var content = part;
            
            console.log("content", part);


            if(appPrompt != null){
                // 如果有prompt字段（更新详细的描述），使用prompt字段;
                content = appPrompt.prompt || appPrompt.content;            
                // 将输入框内容替换提示词placeholder占位符;
                content = content.replace(/\[placeholder\]/g, part);
            }

            
            
            if(condition.Language !== null) content += ` 请用${condition.Language}输出结果。`

            if(condition.Tone !== null && condition.Tone !== "默认" ) content += ` 请用${condition.Tone}语气输出结果。`

            if(condition.WriteStyle !== null && condition.WriteStyle !== "默认" ) content += ` 请用${condition.WriteStyle}写作风格输出结果。`

            message.content.parts[0] = content;
            
            options.body = JSON.stringify(bodyData);
        } catch (e) {
            console.log('error', e);
        }
        return options;
    });
}

proxyFetch();