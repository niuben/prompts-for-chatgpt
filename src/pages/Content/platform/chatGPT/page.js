/* url获取和页面判断 */
import $ from "jquery";

// 获取当前在哪个页面;
function getPage() {
    var path = location.pathname;
    // if (path === "/" || path.indexOf("?model=") > - 1 || path.indexOf("test.html") > -1) {
    if (path === "/" || path.indexOf("test.html") > -1) {
        return "index"
    } else if (path.indexOf("/c/") != -1) {
        return "chat"
    }
}

// 判断是否首页
export function isIndexPage() {
    return getPage() == "index";
}

// 判断是否首页
export function isChatPage() {
    return getPage() == "chat";
}

export function getTemplateHeight(){
    var windowHeight = $(window).height();
    var bottomHeight = $("main").find(".absolute.bottom-0.left-0").height();
    return windowHeight - bottomHeight - 140;
}

