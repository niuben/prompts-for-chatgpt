export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// 从 localStorage 中获取数据
export function getFromLocalStorage(key) {
  const value = localStorage.getItem(key);
  return JSON.parse(value);
}

// 从 localStorage 中删除数据
export function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}
