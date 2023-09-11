/* 监听chatGPT 输方法;  */ 
import $ from "jquery";
import emitter from "@/utils/emitter.js";
import {getTemplateHeight} from "@/platform/chatGPT/page";

export function onSendMessage(callback){
    
    // 判断是否存在
    if($("#prompt-textarea").length == 0) return;
    
    // 监听输入框回车事件, 回车时触发回调函数;
    $("#prompt-textarea").off("keydown");
    $("#prompt-textarea").on("keydown", (e)=>{
        if(e.keyCode == 13) {
            // callback && callback(e);
            emitter.emitEvent("onChat");
        }
    });

    // 监听输入框右侧按钮，点击后触发回调函数;

    console.log("next", $("#prompt-textarea").next());
    $("#prompt-textarea").next().off("click");
    $("#prompt-textarea").next().one("click", (e)=>{
        // callback && callback(e);
        emitter.emitEvent("onChat");
    });    

}

$(window).on("load", function(){
    // 创建一个函数来处理窗口尺寸变化的事件
    function handleResize() {
        // 获取新的窗口宽度和高度
        $(".mainInner").height(getTemplateHeight());
    }

    // 使用resize方法绑定窗口尺寸变化事件处理函数
    $(window).on("resize", handleResize);

    // 初始页面加载时也执行一次
    setTimeout(() => {
        handleResize();
    }, 2000);
});

