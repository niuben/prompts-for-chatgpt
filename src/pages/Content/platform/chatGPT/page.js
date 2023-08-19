/* url获取和页面判断 */

// 获取当前在哪个页面;
function getPage() {
    var path = location.pathname;
    if (path === "/" || path.indexOf("content.html") > -1) {
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
