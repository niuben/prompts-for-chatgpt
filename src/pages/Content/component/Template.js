import React, { useRef, useEffect, useState } from 'react';
import { getCurrentData } from "@/hooks/useData";
import Pagination from './Paginnation.js';
import emitter from "@/utils/emitter.js";

// import Toast from "./Toast";
var handle;

const Template = ({ data, currentPrompt, onChoosePrompt, isDelete, onDelete }) => {
  // const [id, setId] = useState(null);
  const [page, setPage] = useState(0);
  const [pageLimite, setPageLimite] = useState(8);

  // 事件联动
  emitter.once("onSearch", () => {
    setPage(0);
  })

  emitter.once("onSelectCategory", () => {
    setPage(0);
  })


  
  //截取文字
  var substr = function (str, length) {
    if (typeof str != 'string') {
      return '';
    }
    return str.substr(0, length);
  };

  var handle;

  // const [data, setData] = useState(getTotalData());
  return (
    <div className="cardsWrap clear">
      <div className="cardsWrapInner">
        {getCurrentData(data, page, pageLimite).map((prompt) => (
          <div
            className={
              'card ' +
              // (currentPrompt != null && prompt.id == currentPrompt.id
              //   ? ' active'
              //   : '') +
              // ' ' +
              (prompt.isUsed == true ? 'isUsed' : '')
            }
            key={prompt.id}
            onClick={() => {
              //当id == 当前prompt.id，证明再次点击已选的prompt, 这是设置取消;
              if (currentPrompt == null || currentPrompt.id != prompt.id) {
                // setId(prompt.id);
                onChoosePrompt(prompt);
              } else {
                // onChoosePrompt(null);
              }
            }}
          >
            <div className="cardContent">
              <h3>{substr(prompt.prompt_title, 100)}</h3>
              {isDelete === true && (
                <a className="delete" onClick={() => {
                  onDelete(prompt.id);
                  // removeMyData(prompt.id);
                  // updateMyData();
                }}>x</a>
              )}
              <p>
                <span className="icon icon_topic">{prompt.category}/{prompt.use_case}</span>
                {/* <span className="icon icon_author">{[prompt.author]}</span> */}
                {prompt.isUsed && (
                  <span className="icon icon_pin">used</span>
                )}
              </p>
              {/* <p>{keyword[prompt.topic]}</p> */}
              {/* <p></p> */}
              <div
                title={prompt.teaser}
                className="multiLineEllipsis"
                style={{ width: 'auto' }}
              >
                {prompt.teaser}
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
