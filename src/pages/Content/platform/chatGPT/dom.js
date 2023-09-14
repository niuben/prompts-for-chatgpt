import $ from 'jquery';
// 获取chatGPT网站各种dom节点
export function getElements() {
    var mainEle = $('main.relative.h-full.w-full');
    return {
        mainEle: mainEle,
        chatGPTInforEle: $("div.text-gray-800"),
        h1Ele: $("h1"),
        contentEle: mainEle != null ? $(mainEle).find('div.flex.flex-col') : null,
        chatGPTBtmEle: mainEle != null ? $(mainEle).find('.flex-shrink-0') : null,
        editBtns: mainEle != null ? $(mainEle).find(".group.w-full").even().find("button.p-1.rounded-md") : null
    }
}

// 创建prompts dom元素，用于模板渲染
export function createPromptsEle() {
    var { chatGPTBtmEle, h1Ele, mainEle } = getElements();
    // $("<div id='chatGTP_prompts'></div>").insertAfter(h1Ele);
    $(mainEle).append("<div id='chatGTP_prompts'></div>");
    $(h1Ele).hide();
    // $(contentEle).eq(0).append("<div id='chatGTP_prompts'></div>");
}

// 创建添加prompt dom按钮，点击按钮展示创建弹出框
export function createAddPromptBtn(){
    var { editBtns } = getElements();
    editBtns.each((index, editBtn) => {
        $("<button class='addPrompt'>add</button>").insertBefore(editBtn);
        console.log("editBtn", editBtn);
    });
}

// 创建在表单之前创建占位符，将语言、写作风格和语气等选项插入其中
export function createBottomToolbar(){
    $("<div id='promptsToolbar'></div>").insertBefore("textarea#prompt-textarea")
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

// 页面初始化时，隐藏一些无用元素
export function hideElements(){    
    $("form .grow").hide();

}

// 隐藏prompts模板
export function hidePrompts(){

} 

// 给chatGPT textarea 设置placeholder
export function setPlaceHolder(prompt) {     
    // 获取textarea节点
    let textareaEle = $('form.stretch textarea');

    $(textareaEle).val("").attr(
        'placeholder',
        prompt != null ? (prompt.placeholder || prompt.placeHolder) : 'Send a message.'
    );
    $(textareaEle).focus();
};

export function quickAction(action){
    let textareaEle = $('form.stretch textarea');
    $(textareaEle).trigger("focus");    
    $(textareaEle).attr("placeholder", " ").val(action).text(action);
    
    // 默认自定义事件，jQuery事件会被chatGPT阻止
    const inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true,
    });
    $(textareaEle)[0].dispatchEvent(inputEvent);

    setTimeout(() => {
        $('button[data-testid="send-button"]').trigger("click");
    }, 200);
}