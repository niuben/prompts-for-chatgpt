import { useState } from 'react';
import {
  getFromLocalStorage,
  saveToLocalStorage,
  removeFromLocalStorage,
} from '../utils/localStorage';

const NAME = 'MY_TEMPLATE';

const useMyData = () => {
  let initialData = getFromLocalStorage(NAME) || [];

  const [myData, setMyData] = useState(initialData);

  const createObj = (title, content) => {
    let id = myData.length + 1;
    return {
      id: id,
      title: title,
      author: 'me',
      content: content,
      prompt: content,
      placeholder: 'send a message',
      topic: '我的',
    };
  };

  const addMyData = (title, content) => {
    myData.unshift(createObj(title, content));
    setMyData(myData);
    saveToLocalStorage(NAME, myData);
  };

  const updateMyData = () => {
    setMyData(getFromLocalStorage(NAME) || []);
  };

  const removeMyData = (id) => {
    var prompts = getFromLocalStorage(NAME);
    var newPrompts = [];
    prompts.map((prompt) => {
      if (prompt.id != id) newPrompts.push(prompt);
    });
    saveToLocalStorage(NAME, newPrompts);
  };

  return [myData, addMyData, updateMyData, removeMyData];
};

export default useMyData;
