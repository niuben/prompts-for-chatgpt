import React, { useRef, useEffect, useState, createElement } from 'react'

// import data from "./data/data.js"

import Pagination from './Paginnation.js';
import Select from "./Select.js";
import Tool from './Tool.js';


import data from "../data/github_data.js"
import topicOptions from "../data/topic.js";

// import keyword from "../data/keyword.js";

import { toSelect } from '../utils/toSelect.js';
import { throttled as createThrottled } from "../utils/utils.js";

// import Toast from "./Toast";
var handle;


const Template = ({ currentPrompt, setPrompt }) => {
    // const [id, setId] = useState(null);
    const [page, setPage] = useState(0);
    const [pageLimite, setPageLimite] = useState(16);
    const [topic, setTopic] = useState("全部");
    const [query, setQuery] = useState("");

    // const [isToast, setToast] = useState(false);
    // const mainInnerRef = useRef();



    var options = toSelect(topicOptions, {
        "key": "name",
        "val": "name"
    });

    var getTotalData = function () {
        var topicData = data;

        // 获取当前分类数据
        if (topic != "全部") {
            topicData = [];
            data.map((item) => {
                if (item.topic == topic) {
                    topicData.push(item);
                }
            });
        }

        // 获取搜索过滤值
        var searchData = topicData;
        if (query != "" && query != undefined) {
            searchData = [];
            topicData.map((item) => {
                if (item.title.indexOf(query) != -1 || item.content.indexOf(query) != -1) {
                    searchData.push(item);
                }
            });
        }

        return searchData;
    }


    var getCurrentData = function () {
        var totalData = getTotalData();
        var start = page * pageLimite;
        var end = start + pageLimite;
        return totalData.slice(start, end);
    }

    var getPrompt = function (_id) {
        var promptArr = data.filter((prompt, index) => prompt.id == _id);

        //暂时用index代替
        // var promptArr = data.filter((prompt, index) => index == _id);
        if (typeof promptArr == "object" && promptArr.length == 1) {
            return promptArr[0];
        }
        return null
    };

    var resetPrompt = function () {
        // setId(null);
        setPrompt(null)
    }

    //截取文字
    var substr = function (str, length) {
        if (typeof str != "string") {
            return "";
        }
        return str.substr(0, length);
    }

    // console.log("getPrompt", getPrompt(id));

    var totalData = getTotalData();
    var currentData = getCurrentData();

    // 用于节流时间句柄
    var handle;

    return (
        <div className="mainInner">
            <h2 className="title">ChatGPT 提示词</h2>
            <Select options={options} title="分类" default={"全部"} onChange={(value) => {
                console.log("value", value);
                setTopic(value);
                setPage(0);
            }} />
            <input placeholder='搜索' className='right mr20' onChange={(e) => {
                var val = e.target.value;
                if (handle != undefined) {
                    clearTimeout(handle);
                    handle = undefined;
                }
                handle = setTimeout(() => {
                    setQuery(val);
                    handle == undefined;
                }, 150);
            }} />
            <div className="cardsWrap clear">
                <div className="cardsWrapInner">
                    {currentData.map((prompt) => (
                        <div className={"card" + (currentPrompt != null && prompt.id == currentPrompt.id ? " active" : "")} key={prompt.id} onClick={() => {

                            //当id == 当前prompt.id，证明再次点击已选的prompt, 这是设置取消;
                            if (currentPrompt == null || currentPrompt.id != prompt.id) {
                                // setId(prompt.id);
                                setPrompt(prompt);
                            } else {
                                resetPrompt();
                            }
                        }}>
                            <div className="cardContent">
                                <h3 >{substr(prompt.title, 50)}</h3>
                                <p>
                                    <span className='icon icon_topic'>{prompt.topic}</span>
                                    <span className='icon icon_author'>{[prompt.author]}</span>
                                </p>
                                {/* <p>{keyword[prompt.topic]}</p> */}
                                {/* <p></p> */}
                                <div title={prompt.content} className="multiLineEllipsis" style={{ width: "auto" }}>
                                    {prompt.content}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            {
                totalData.length > pageLimite && <Pagination style={{ float: "right" }} itemsPerPage={pageLimite} currentPage={page} totalItems={totalData.length} paginate={(page) => {
                    console.log("page", page);
                    setPage(page);
                }} />
            }
            {/* <Tool getPrompt={getPrompt} id={id} onEntry={(prompt) => {
                // copy(prompt);
            }} /> */}

        </div>
    )
};

export default Template;