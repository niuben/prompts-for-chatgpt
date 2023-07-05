import React, { useState } from 'react';
import '../style/Popup.scss'; // 导入组件的样式文件

const Popup = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSave = () => {
        // 处理保存逻辑
        console.log('Title:', title);
        console.log('Description:', description);
        onClose();
    };

    const handleUpdate = () => {
        // 处理更新逻辑
        console.log('Updated Title:', title);
        console.log('Updated Description:', description);
        onClose();
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Popup Form</h2>
                <label>
                    Title:
                    <input type="text" value={title} onChange={handleTitleChange} />
                </label>
                <br />
                <label>
                    Description:
                    <textarea value={description} onChange={handleDescriptionChange} />
                </label>
                <br />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Popup;