import React, { useState } from 'react';
import '../style/Tool.scss';
// import Tone from "../data/tone.js";
// import WritingStyle from "../data/writingstyle.js"

var DropdownsAndInput = ({ getPrompt, id, onEntry }) => {
  // const [dropdown1Value, setDropdown1Value] = useState('');
  // const [dropdown2Value, setDropdown2Value] = useState('');
  // const [dropdown3Value, setDropdown3Value] = useState('');
  // const [inputValue, setInputValue] = useState('');

  // console.log("prompt", prompt);
  // console.log("Tone", Tone);
  // console.log("WritingStyle", WritingStyle);

  // const handleDropdown1Change = (event) => {
  //   setDropdown1Value(event.target.value);
  // };

  // const handleDropdown2Change = (event) => {
  //   setDropdown2Value(event.target.value);
  // };

  // const handleDropdown3Change = (event) => {
  //   setDropdown3Value(event.target.value);
  // };

  // const handleInputChange = (event) => {
  //   console.log("keyCode", event.keyCode);
  //   console.log("event", event);
  //   setInputValue(event.target.value);
  // };

  // const handleInputKeydown = (event) => {
  //   if (event.key === "Enter") {
  //     onEntry(createPrompt());
  //   }
  // }

  //复制内容
  // const createPrompt = () => {
  //   var content = Prompt.content;
  //   content += "请使用中文 \n";
  //   content += "使用" + dropdown2Value + "语气";
  //   content += "编写一篇" + dropdown3Value;
  //   return content;
  // }
  var prompt = getPrompt(id);

  return (
    <div className="dropdowns-and-input-container">
      {typeof prompt == 'object' && prompt != null ? (
        <div className="prompts-tips ellipsis">{prompt.title}</div>
      ) : (
        ''
      )}

      {/* <div className="dropdown-container-wrap">
        <div className="dropdown-container">
          <label className="dropdown-label">语言:</label>
          <select className="dropdown" value={dropdown1Value} onChange={handleDropdown1Change}>
            <option value="中文">中文</option>
            <option value="英文">英文</option>
          </select>
        </div>

        <div className="dropdown-container">
          <label className="dropdown-label">语气:</label>
          <select className="dropdown" value={dropdown2Value} onChange={handleDropdown2Change}>
            {Tone.map((item, index) => {
              return <option key={index} value={item.name}>{item.name}</option>
            })}
          </select>
        </div>

        <div className="dropdown-container">
          <label className="dropdown-label">写作风格:</label>
          <select className="dropdown" value={dropdown3Value} onChange={handleDropdown3Change}>
            {
              WritingStyle[0].list.map((item, index) => {
                return <option key={index} value={item.name}>{item.name}</option>
              })
            }
          </select>
        </div>
      </div> */}

      {/* <div className="input-container">
        <label className="input-label">内容:</label>
        <input
          className="input"
          type="text"
          value={inputValue}
          placeholder={prompt != null ? prompt.placeHolder : ""}
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
        />
        <CopyIcon
          style={{ width: "40px", height: "40px", float: "right", marginRight: "250px" }}
          onClick={() => {
            onEntry(createPrompt());
          }}
        />
      </div> */}
    </div>
  );
};

export default DropdownsAndInput;
