import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import LogicFlow from '@logicflow/core';
import { DndPanel, SelectionSelect, Menu, Control } from '@logicflow/extension';
// 样式
import "@logicflow/core/dist/style/index.css";
import '@logicflow/extension/lib/style/index.css'

import { useModel } from 'umi';
import { Button, message } from 'antd';
import style from './style.less';
import DndDiyPanel from './components/dnd-panel/student';
import { registerNode } from './components/node/student';

import { setMenuConfig, setControlConfig, checkEdge } from './config';
import e from 'express';


// 首页
const MiniDrawPanel: React.FC<any> = (props: any) => {

  const {
    cref,
    addNode = () => true,
    deleteNode = () => true,
  } = props;

  // const { initialState, setInitialState } = useModel('@@initialState');

  // const curLf: any = useRef<any>(null);
  const drawDomRef: any = useRef<any>(null);
  const drawPanelRef: any = useRef<any>(null);
  const [curLf, setLf] = useState<any>(null);

  // -------

  //初始化
  const init = () => {
    const lf: any = new LogicFlow({
      container: drawDomRef.current,
      plugins: [SelectionSelect, Control],
      grid: true,
      adjustNodePosition: false,
      edgeType: 'line',
    });
    // 节点注册
    registerNode(lf, {});
    console.log('节点注册');
    // 赋值到curLf
    setLf(lf);
    setControlConfig(lf);
    lf.zoom(0.8);
    lf.translate(-150, 100);
    // ----
    drawPanelRef.current = lf;
  }


  useImperativeHandle(cref, () => ({
    initPanel: (data: any) => {
      if (drawPanelRef.current) {
        // console.log(curLf);
        drawPanelRef.current?.render(data || {});
      }
    },
    getLf: () => {
      return curLf
    }
  }))

  useEffect(() => {
    // 初始化画布
    init();
  }, []);

  return (
    <div className={style['mini-box_bg']}>
      <div id="mini-box" ref={drawDomRef} className={style['mini-box']}></div>
    </div>
  );
};

export default MiniDrawPanel;
