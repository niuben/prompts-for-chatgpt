/* 监听chatGPT 输方法;  */ 

import $ from "jquery";

export function onSendMessage(callback){
    
    // 判断是否存在
    if($("#prompt-textarea").length == 0) return;
    
    // 监听输入框回车事件, 回车时触发回调函数;
    $("#prompt-textarea").off("keydown");
    $("#prompt-textarea").on("keydown", (e)=>{
        if(e.keyCode == 13) callback && callback(e);
        

    });

    // 监听输入框右侧按钮，点击后触发回调函数;

    console.log("next", $("#prompt-textarea").next());
    $("#prompt-textarea").next().off("click");
    $("#prompt-textarea").next().one("click", (e)=>{
        callback && callback(e);
    });    

}

