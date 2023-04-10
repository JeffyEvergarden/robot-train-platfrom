import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useModel } from 'umi';
import { Button, message, Input, Space } from 'antd';
import DrawPanel from '@/pages/draw-panel/task';
import style from '../style.less';
import { useDrawModel } from '@/pages/student-web/detail/model';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { useTaskDrawModel } from '../model';

const TaskDrawPanel: any = (props: any) => {
  const drawLf: any = useRef<any>(null);

  const curNodeRef: any = useRef<any>({});

  // 输入框
  const [nameVal, setNameVal] = useState<any>('');

  const [inputVal, setInputVal] = useState<any>('');
  const onChangeInput = (e: any) => {
    setInputVal(e.target.value);
  };
  const onBtClick = () => {
    let lf = drawLf.current.getLf();
    lf.updateText(curNodeRef.current.id, inputVal);
    // curNodeRef.current.text.value = inputVal
  };

  // -------
  // 获取画布
  const { getDrawPanel, saveDrawPanel } = useTaskDrawModel();

  // 事件监听

  //初始化
  const init = async () => {
    let res = await getDrawPanel({ id: history?.location?.query?.id });
    drawLf.current?.initPanel({});
    if (res) {
      drawLf.current?.initPanel(res);
    }
  };

  // 保存画布
  const onSave = (data: any) => {
    const { nodes, edges } = data;
    saveDrawPanel({ nodes, edges, id: history?.location?.query?.id });
  };

  // 监听节点添加  return true / false

  const _addNode = async (data: any) => {
    console.log('addNode:');
    console.log(data);
    return true;
  };

  // 删除节点删除 return true / false
  const _deleteNode = async (data: any) => {
    return true;
  };

  // 双击节点
  const onNodeDbClick = async (data: any) => {
    console.log(data);
    curNodeRef.current = data;
    if (data.type === 'step-html') {
      setStatusNum(2);
    }
    setNameVal(data?.text?.value);
  };

  // 双击连线
  const onEdgeDbClick = async (data: any) => {
    console.log(data);
  };

  const [statusNum, setStatusNum] = useState<any>(0);

  const statusList = ['doing', 'wait', 'finish'];

  const changeStatus = async (data: any) => {
    if (!curNodeRef.current.id) {
      message.warning('请先双击选中节点');
      return null;
    }

    let status = null;
    if (statusNum < 2) {
      status = statusList[statusNum + 1];
      setStatusNum(statusNum + 1);
    } else {
      status = statusList[0];
      setStatusNum(0);
    }

    let lf = drawLf.current.getLf();
    lf.setProperties(curNodeRef.current.id, {
      status,
    });
  };

  useEffect(() => {
    //初始化画布
    init();
  }, []);

  return (
    <>
      <DrawPanel
        cref={drawLf}
        preMenu={
          <Space align="baseline">
            <ArrowLeftOutlined
              style={{ fontSize: '22px' }}
              onClick={() => {
                history.push('/front/teacher/task');
              }}
            />
            <span style={{ fontSize: '20px', fontWeight: '500' }}>
              {history?.location?.query?.name || '-'}
            </span>
          </Space>
        }
        onSave={onSave} // 保存
        addNode={_addNode} // 添加
        deleteNode={_deleteNode} // 删除
        onNodeDbClick={onNodeDbClick} // 双击点击节点
        onEdgeDbClick={onEdgeDbClick} // 双击连线
      />
    </>
  );
};

export default TaskDrawPanel;
