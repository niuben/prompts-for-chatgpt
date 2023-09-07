/*
* 将转成下拉框, 
* data是要转换的数据，要求是数组
* map是映射表, 用于数据转换
* {
   key: "name",
   val: "name"
  }
*/
export function toSelect(arr, map) {
  return arr.map((item) => {
    return {
      key: item[map['key']],
      val: item[map['val']],
    };
  });
}

export function getKeyByVal(val, obj) {
  for(let item in obj){
    if(item.val == val) return item.key;
  }
  return null;
}


