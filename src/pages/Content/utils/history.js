function _h(name) {
    var method = history[name];
    return function () {
        method.apply(history, arguments);
        var event = new Event(name);
        window.dispatchEvent(event);
    }
}

history.pushState = _h("pushState");
history.replaceState = _h("replaceState")