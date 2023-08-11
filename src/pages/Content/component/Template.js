import React, { useRef, useEffect, useState } from 'react';
import { getCurrentData } from "@/hooks/useData";
import Pagination from './Paginnation.js';

// import Toast from "./Toast";
var handle;

const Template = ({ data, currentPrompt, onChoosePrompt, isDelete, onDelete }) => {
  // const [id, setId] = useState(null);
  const [page, setPage] = useState(0);
  const [pageLimite, setPageLimite] = useState(16);

  // 事件联动

  // const [isToast, setToast] = useState(false);
  // const mainInnerRef = useRef();

  //截取文字
  var substr = function (str, length) {
    if (typeof str != 'string') {
      return '';
    }
    return str.substr(0, length);
  };

  // useEffect(() => {
  //   setData(getTotalData());
  // }, [templateName, popupStatus, query, myData]);

  // 用于节流时间句柄
  var handle;

  // const [data, setData] = useState(getTotalData());
  return (
    <div className="cardsWrap clear">
      <div className="cardsWrapInner">
        {getCurrentData(data, page, pageLimite).map((prompt) => (
          <div
            className={
              'card' +
              (currentPrompt != null && prompt.id == currentPrompt.id
                ? ' active'
                : '') +
              ' ' +
              (prompt.isUsed == true ? 'isUsed' : '')
            }
            key={prompt.id}
            onClick={() => {
              //当id == 当前prompt.id，证明再次点击已选的prompt, 这是设置取消;
              if (currentPrompt == null || currentPrompt.id != prompt.id) {
                // setId(prompt.id);
                onChoosePrompt(prompt);
              } else {
                onChoosePrompt(null);
              }
            }}
          >
            <div className="cardContent">
              <h3>{substr(prompt.title, 50)}</h3>
              {isDelete === true && (
                <a className="delete" onClick={() => {
                  onDelete(prompt.id);
                  // removeMyData(prompt.id);
                  // updateMyData();
                }}>x</a>
              )}
              <p>
                <span className="icon icon_topic">{prompt.topic}</span>
                <span className="icon icon_author">{[prompt.author]}</span>
                {prompt.isUsed && (
                  <span className="icon icon_pin">已使用</span>
                )}
              </p>
              {/* <p>{keyword[prompt.topic]}</p> */}
              {/* <p></p> */}
              <div
                title={prompt.content}
                className="multiLineEllipsis"
                style={{ width: 'auto' }}
              >
                {prompt.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      {data.length > pageLimite && (
        <Pagination
          style={{ float: 'right' }}
          itemsPerPage={pageLimite}
          currentPage={page}
          totalItems={data.length}
          paginate={(page) => {
            console.log('page', page);
            setPage(page);
          }}
        />
      )}
      {/* <Tool getPrompt={getPrompt} id={id} onEntry={(prompt) => {
                // copy(prompt);
            }} /> */}

    </div>
  );
};

export default Template;
