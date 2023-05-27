export default function fetchHook(fn) {
    var oldFetch = fetch;
    window.fetch = function (url, options) {
        options = fn(url, options);
        return oldFetch(url, options);
    }
}