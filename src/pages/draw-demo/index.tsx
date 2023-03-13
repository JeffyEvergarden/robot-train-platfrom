import React, { useEffect, useRef, useState } from 'react';
import LogicFlow from '@logicflow/core';
import { DndPanel, SelectionSelect } from '@logicflow/extension';
// 样式
import "@logicflow/core/dist/style/index.css";
import { useModel } from 'umi';
import { Button } from 'antd';
import style from './style.less';
import DndDiyPanel from './components/dnd-panel';
import { registerNode } from './components/node';


// 首页
const DrawDemo: React.FC = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  // const curLf: any = useRef<any>(null);
  const drawBoxRef: any = useRef<any>(null);
  const [curLf, setLf] = useState<any>(null);

  const init = () => {
    const lf: any = new LogicFlow({
      container: drawBoxRef.current,
      plugins: [DndPanel, SelectionSelect],
      grid: true
    });
    lf.render({
      nodes: [
        {
          id: "1",
          type: "rect",
          x: 300,
          y: 100,
          text: "节点1"
        },
        {
          id: "2",
          type: "circle",
          x: 700,
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
    // 节点注册
    registerNode(lf);
    // 赋值到curLf
    setLf(lf);
  }


  useEffect(() => {
    init();
  }, []);

  return (
    <div className={style['demo-box']}>
      <DndDiyPanel lf={curLf}></DndDiyPanel>
      <div id="draw-box" ref={drawBoxRef} className={style['draw-box']}></div>
    </div>
  );
};

export default DrawDemo;
