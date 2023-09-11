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

/*
* 根据val获取key
*/ 
export function getKeyByVal(val, obj) {
  for(let item in obj){
    if(item.val == val) return item.key;
  }
  return null;
}

/*
*  将字符串转成对象数组;
*  比如将：["All"] => [{
  "name": "All",
  "value": "All"
}]
* 
*/ 

export function strArrToObjArr(strArr){
  let objArr = [];
  strArr.map((item, index)=>{
    objArr.push({
      id: index + 1,
      name: item,
      value: item
    })
  })
  return objArr;
}



