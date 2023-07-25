export function throttled(fn, delay) {
  let timer = null;
  let starttime = Date.now();
  return function () {
    let curTime = Date.now(); // 当前时间
    let remaining = delay - (curTime - starttime); // 从上一次到现在，还剩下多少多余时间
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    if (remaining <= 0) {
      fn.apply(context, args);
      starttime = Date.now();
    } else {
      timer = setTimeout(fn, remaining);
    }
  };
}
/*
* 将objectsArray对象数组按照，把idsArray中数据排在最前面;
* const ids = [2, 4, 6];
    const objects = [
    { id: 1, name: 'Object 1' },
    { id: 2, name: 'Object 2' },
    { id: 3, name: 'Object 3' },
    { id: 4, name: 'Object 4' },
    { id: 5, name: 'Object 5' },
    ];

    [
    { id: 2, name: 'Object 2' },
    { id: 4, name: 'Object 4' },
    { id: 1, name: 'Object 1' },
    { id: 3, name: 'Object 3' },
    { id: 5, name: 'Object 5' }
    ]
    给符合对象传递fn 
*/
export function rangeObjectsById(idsArray, objectsArray, fn) {
  const rearrangedArray = [];

  // 遍历第一个参数的数组
  for (const id of idsArray) {
    // 在第二个参数的数组中查找匹配的对象
    var matchingObject = objectsArray.find((obj) => obj.id === id);

    if (matchingObject) {
      if (fn) {
        matchingObject = fn(matchingObject);
      }

      rearrangedArray.push(matchingObject);
    }
  }

  // 遍历第二个参数的数组，将剩余的对象添加到结果数组中
  for (const object of objectsArray) {
    if (!idsArray.includes(object.id)) {
      rearrangedArray.push(object);
    }
  }

  return rearrangedArray;
}

/*
* 将数字插到数组最前面
* 
const originalArray = [2, 3, 4, 5];
const newNumber = 3;
const newArray = insertNumberToFront(newNumber, originalArray);
console.log(newArray); // 输出: [3, 2, 4, 5]
* 
*/

export function insertNumberToFront(number, array) {
  // 检查数组中是否已经存在该数字
  const index = array.indexOf(number);

  if (index !== -1) {
    // 如果数组中已经存在该数字，则删除之前的数字
    array.splice(index, 1);
  }

  // 将数字插入到数组的最前面
  array.unshift(number);

  return array;
}
