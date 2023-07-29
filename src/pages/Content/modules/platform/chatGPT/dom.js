import $ from 'jquery';

// 获取chatGPT网站各种dom节点
export function getElements() {
    var mainEle = $('main.relative.h-full.w-full');
    return {
        mainEle: mainEle,
        chatGPTInforEle: $("div.text-gray-800"),
        contentEle: mainEle != null ? $(mainEle).find('div.flex.flex-col') : null,
        chatGPTBtmEle: mainEle != null ? $(mainEle).find('.flex-shrink-0') : null,
        // editBtns: mainEle != null ? mainEle.find(".text-gray-400.flex.self-end").find("button.p-1.rounded-md") : null
        editBtns: mainEle != null ? $(mainEle).find(".group.w-full").even().find("button.p-1.rounded-md") : null
    }
}

// 创建prompts dom元素，用于模板渲染
export function createPromptsEle() {
    var { chatGPTBtmEle, contentEle } = getElements();
    $(contentEle).eq(0).append("<div id='chatGTP_prompts'></div>");
}

// 创建添加prompt dom按钮，点击按钮展示创建弹出框
export function createAddPromptBtn(){
    var { editBtns } = getElements();
    editBtns.each((index, editBtn) => {
        $("<button class='addPrompt'>add</button>").insertBefore(editBtn);
        console.log("editBtn", editBtn);
    });
}

// 删除添加prompt的按钮
export function removeAddPromptBtn(){
    $("button.addPrompt").remove();
}

// 获取prompts dom元素，用于模板渲染
export function getPromptsEle() {
    if ($("#chatGTP_prompts").length == 0) {
        createPromptsEle();
    }
    return $("#chatGTP_prompts");
}

// 移除prompts模板
export function removePrompts() {
    var promptsTemplate = $('#chatGTP_prompts');
    $('#chatGTP_prompts').remove();
}

// 判断是否有prompts模板
export function isHavePrompts() {
    return $('#chatGTP_prompts').length == 1;
}

// 展示首页 chatGPT information 
export function showChatGPT() {
    var { chatGPTInforEle } = getElements();
    $(chatGPTInforEle).show();
}

// 隐藏首页 chatGPT information
export function hideChatGPT() {
    var { chatGPTInforEle } = getElements();
    $(chatGPTInforEle).hide();
}