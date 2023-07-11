import React, { useState } from 'react';
import '../style/Popup.scss'; // 导入组件的样式文件
import useMyData from "../hooks/useMyData";

const Popup = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    console.log("useMyData", useMyData());
    const [myData, addMyData] = useMyData([]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSave = () => {
        addMyData(title, description);
        onSave && onSave();
        onClose && onClose();
    };

    const handleClose = () => {
        console.log('更新后的标题:', title);
        console.log('更新后的描述:', description);
        onClose && onClose();
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>增加模板</h2>
                <div className="form-group">
                    <label htmlFor="titleInput">标题:</label>
                    <input id="titleInput" type="text" value={title} onChange={handleTitleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="descriptionInput">描述:</label>
                    <textarea id="descriptionInput" value={description} onChange={handleDescriptionChange} />
                </div>
                <div className="button-group">
                    <button onClick={handleSave}>保存</button>
                    {/* <button onClick={handleClose}>更新</button> */}
                    <button onClick={handleClose}>关闭</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;