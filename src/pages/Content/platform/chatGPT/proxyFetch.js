import fetchHook from '@/utils/fetch-hook';

import { getFromLocalStorage, saveToLocalStorage } from '@/utils/localStorage';
import { PROMPTS_ID } from '@/hooks/constant';
import { insertNumberToFront } from '@/utils/utils';


var appPrompt = "";

// 
export function setAppPrompt(val){
    appPrompt = val;
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

        console.log('conversation');

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
            console.log('error', e);
        }
        return options;
    });
}

proxyFetch();