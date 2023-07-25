console.log('test.js', '是否加载');

function fetchHook(fn) {
  var oldFetch = fetch;
  window.fetch = function (url, options) {
    console.log('url', url, 'options', options);

    options = fn(url, options);

    return oldFetch(url, options);
  };
}

fetchHook((url, options) => {
  console.log(url, options);

  if (url.indexOf('conversation') == -1) {
    return options;
  }

  if (!options.body) {
    return options;
  }

  debugger;

  try {
    var bodyData =
      typeof options.body == 'string' ? JSON.parse(options.body) : options.body;

    var message = bodyData.messages[0];
    var part = message.content.parts[0];

    message.content.parts[0] = part + '///' + 'tpl';

    options.body = JSON.stringify(bodyData);
  } catch (e) {
    console.log('error', e);
  }

  return options;
});
