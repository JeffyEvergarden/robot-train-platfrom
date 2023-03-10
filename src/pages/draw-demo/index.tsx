import LogicFlow from '@logicflow/core';
// 样式
import "@logicflow/core/dist/style/index.css";


import React, { useEffect, useRef } from 'react';
import { useModel } from 'umi';
import { Button } from 'antd';
import style from './style.less';
import JsSIP from 'jssip';


// 首页
const DrawDemo: React.FC = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const drawBoxRef = useRef<any>(null);

  const init = () => {
    const lf: any = new LogicFlow({
      container: drawBoxRef.current,
      grid: true
    });
    lf.render({
      nodes: [
        {
          id: "1",
          type: "rect",
          x: 100,
          y: 100,
          text: "节点1"
        },
        {
          id: "2",
          type: "circle",
          x: 300,
          y: 200,
          text: "节点2"
        }
      ],
      edges: [
        {
          sourceNodeId: "1",
          targetNodeId: "2",
          type: "polyline",
          text: "连线"
        }
      ]

    })
  }


  useEffect(() => {
    init();
  }, []);

  return (
    <div className={style['demo-box']}>

      <div id="draw-box" ref={drawBoxRef} className={style['draw-box']}></div>
    </div>
  );
};

export default DrawDemo;
