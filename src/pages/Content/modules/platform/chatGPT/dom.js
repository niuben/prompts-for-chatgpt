import $ from 'jquery';

// 获取chatGPT网站各种dom节点
export function getElements() {
    var mainEle = $('main.relative.h-full.w-full');

    console.log("find", $(mainEle).find);

    return {
        mainEle: mainEle,
        chatGPTInforEle: $("div.text-gray-800"),
        contentEle: mainEle != null ? $(mainEle).find('div.flex.flex-col') : null,
        chatGPTBtmEle: mainEle != null ? $(mainEle).find('.flex-shrink-0') : null,
        editBtns: mainEle != null ? mainEle.find(".text-gray-400.flex.self-end").find("button.p-1.rounded-md") : null
    }
}

export function createTplEle() {
    var { chatGPTBtmEle, contentEle } = getElements();
    $(contentEle).eq(0).append("<div id='chatGTP_prompts'></div>");
}

export function getTplEle() {

    if ($("#chatGTP_prompts").length == 0) {
        createTplEle();
    }
    return $("#chatGTP_prompts");

    // var { chatGPTBtmEle, contentEle } = getElements();
    // $(chatGPTBtmEle).insertBefore("<div id='chatGTP_prompts'></div>")
    // var appEle = document.createElement('div');
    // appEle.setAttribute('id', 'chatGTP_prompts');
    // // contentEle.appendChild(appEle);
    // contentEle.insertBefore(appEle, chatGPTBtmEle);
}

//
export function removeTpl() {
    var promptsTemplate = $('#chatGTP_prompts');
    // if (promptsTemplate != null) {
    //   promptsTemplate.remove();
    // }
    $('#chatGTP_prompts').remove();
}

export function isHaveTpl() {
    return $('#chatGTP_prompts').length == 1;
}


export function hideChatGPT() {
    var { chatGPTInforEle } = getElements();
    $(chatGPTInforEle).hide();
}

export function showChatGPT() {
    var { chatGPTInforEle } = getElements();
    $(chatGPTInforEle).show();
}




