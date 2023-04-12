import DrawPanel from '@/pages/draw-panel';
import { ArrowLeftOutlined } from '@ant-design/icons';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useDrawModel, useTableModel } from '../model';
import { history, useModel } from 'umi';
import { Space, Tooltip, Typography } from 'antd';
import CustomerDrawer from './component/customerDrawer';
import CallDrawer from './component/callDrawer';
import SoundDrawer from './component/soundDrawer';
import EndDrawer from './component/endDrawer';
import FlowTestDrawer from './component/flowTestDrawer';
import NodeDrawer from './component/nodeDrawer';
import style from '../style.less';

// 首页
const DrawDemo: React.FC<any> = (props: any) => {
  const drawLf: any = useRef<any>(null);
  const customerDrawerRef: any = useRef<any>(null);
  const callDrawerRef: any = useRef<any>(null);
  const soundDrawerRef: any = useRef<any>(null);
  const endDrawerRef: any = useRef<any>(null);
  const flowTestDrawerRef: any = useRef<any>(null);
  const nodeDrawerRef: any = useRef<any>(null);
  const { courseInfo, setCourseInfo } = useModel('course', (model: any) => ({
    courseInfo: model.courseInfo,
    setCourseInfo: model.setCourseInfo,
  }));

  const { courseDetail } = useTableModel();
  // -------
  // 获取画布
  const {
    getDrawPanel,
    saveDrawPanel,
    addNode,
    deleteNode,
    courseCheck,
    dialoguePublish,
    flowBtnLoading,
  } = useDrawModel();

  // 事件监听

  //初始化
  const init = async () => {
    let res = await getDrawPanel({ id: history?.location?.query?.id || courseInfo?.id });
    if (res) {
      drawLf.current?.initPanel(res);
    }
  };

  //校验
  const onCheck = async () => {
    let res = await courseCheck({ id: history?.location?.query?.id || courseInfo?.id });
    return res;
  };

  // 保存画布
  const onSave = (data: any) => {
    const { nodes, edges } = data;
    console.log(data);

    saveDrawPanel({ nodes, edges, id: history?.location?.query?.id || courseInfo?.id });
  };

  // 监听节点添加  return true / false

  const _addNode = async (data: any) => {
    console.log(data);
    let reqData = {
      courseId: history?.location?.query?.id,
      ...data,
    };
    return addNode(reqData);
  };

  // 删除节点删除 return true / false
  const _deleteNode = async (id: any) => {
    return deleteNode({ id: id || history?.location?.query?.id || courseInfo?.id });
  };

  // 双击节点
  const onNodeDbClick = async (data: any) => {
    console.log(data);
    if (data?.type != 'start') {
      nodeDrawerRef?.current?.open(data);
    }
  };

  // 双击连线
  const onEdgeDbClick = async (data: any) => {
    console.log(data);
  };

  //改名字
  const changeNodeName = async (id: any, name: any) => {
    let lf = drawLf?.current?.getLf?.();
    lf.updateText(id, name);
  };

  const getDetail = async () => {
    await courseDetail({ id: history?.location?.query?.id }).then((res: any) => {
      setCourseInfo(res?.data || {});
    });
  };

  useEffect(() => {
    getDetail();
    //初始化画布
    init();
  }, []);

  useEffect(() => {
    console.log(courseInfo);
  }, [courseInfo]);

  return (
    <>
      <DrawPanel
        cref={drawLf}
        loading={flowBtnLoading}
        onCheck={onCheck} //校验
        onSave={onSave}
        addNode={_addNode} // 添加
        deleteNode={_deleteNode} // 删除
        onNodeDbClick={onNodeDbClick} // 双击点击节点
        onEdgeDbClick={onEdgeDbClick} // 双击连线
        openCustomer={() => {
          customerDrawerRef?.current?.open();
        }} //
        openCall={() => {
          callDrawerRef?.current?.open();
        }} //
        openSound={() => {
          soundDrawerRef?.current?.open();
        }} //
        openEnd={() => {
          endDrawerRef?.current?.open();
        }} //
        openFlowTest={async () => {
          let res = await dialoguePublish({ id: history?.location?.query?.id || courseInfo?.id });
          if (res) {
            flowTestDrawerRef?.current?.open();
          }
        }}
        extra={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ArrowLeftOutlined
              style={{ fontSize: '22px', marginRight: '8px' }}
              onClick={() => {
                history.push('/front/teacher/course');
              }}
            />
            <Tooltip title={history?.location?.query?.name || courseInfo?.courseName}>
              <span className={style['drawTitle']} style={{ fontSize: '20px', fontWeight: '500' }}>
                {history?.location?.query?.name || courseInfo?.courseName}
              </span>
            </Tooltip>
          </div>
        }
        isSilentMode={courseInfo?.courseStatus}
      />
      <CustomerDrawer cref={customerDrawerRef}></CustomerDrawer>
      <CallDrawer cref={callDrawerRef}></CallDrawer>
      <SoundDrawer cref={soundDrawerRef}></SoundDrawer>
      <EndDrawer cref={endDrawerRef}></EndDrawer>
      <FlowTestDrawer cref={flowTestDrawerRef}></FlowTestDrawer>
      <NodeDrawer cref={nodeDrawerRef} changeNodeName={changeNodeName}></NodeDrawer>
    </>
  );
};

export default DrawDemo;
