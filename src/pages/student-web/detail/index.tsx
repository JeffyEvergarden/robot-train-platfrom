import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useModel, history } from 'umi';
import { Button, message, Input, Tag, Spin } from 'antd';
import DrawPanel from '@/pages/draw-panel/student';
import { PageContainer, ProBreadcrumb } from '@ant-design/pro-layout';
import { useDrawModel } from './model';
import { ArrowLeftOutlined } from '@ant-design/icons';
import config from '@/config';
import style from './style.less';
import { formateTaskType, formateTaskModel } from '@/utils/formate-str';

const { basePath } = config;

const StudentDrawPanel: any = (props: any) => {
  const drawLf: any = useRef<any>(null);

  const curNodeRef: any = useRef<any>({});

  const query: any = history.location.query || {};

  const taskId: any = query?.taskId;

  //
  const [taskName, setTaskName] = useState<any>('');
  const [taskType, setTaskType] = useState<any>(0);
  const [taskModel, setTaskModel] = useState<any>(0);

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
  const { getDrawPanel, saveDrawPanel, addNode, deleteNode, loading } = useDrawModel();

  // 事件监听

  //初始化
  const init = async () => {
    if (!taskId) {
      message.warning('获取不到课程ID');
      return;
    }

    let res = await getDrawPanel({ taskId });
    if (res) {
      setTaskName(res.taskName || '');
      setTaskType(res.taskType || 0);
      setTaskModel(res.taskModel || 0);

      drawLf.current?.initPanel(res);
    } else {
      drawLf.current?.initPanel({});
    }
  };

  // 保存画布
  const onSave = (data: any) => {
    const { nodes, edges } = data;
    saveDrawPanel({ nodes, edges });
  };

  // 监听节点添加  return true / false

  const _addNode = async (data: any) => {
    return addNode(data);
  };

  // 删除节点删除 return true / false
  const _deleteNode = async (data: any) => {
    return deleteNode(data);
  };

  // 双击节点
  const onNodeDbClick = async (data: any) => {
    console.log(data);
    curNodeRef.current = data;
    if (data.type === 'step-html') {
      setStatusNum(2);
    }
    setNameVal(data.text.value);
  };

  // 双击连线
  const onEdgeDbClick = async (data: any) => {
    console.log(data);
  };

  const onExtraEvent = (name: any, data: any) => {
    console.log(name, data);
    if (name === 'step-tips:button-click') {
      window.open(`${basePath}/student/chat?taskId=${taskId}&courseId=${data.id}`);
    }
  };

  const goBack = () => {
    if (!taskId) {
      console.log('获取不到task_id');
      return;
    }
    // 回到画布页面
    history.replace(`/student/course/list`);
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
    <PageContainer
      header={{
        title: '',
        ghost: true,
      }}
      content={
        <div className={style['page-header']}>
          <div>
            <div className={style['title']}>
              <ArrowLeftOutlined onClick={goBack} style={{ marginRight: '8px' }} />
              <span style={{ marginRight: '8px' }}>{taskName}</span>
              {taskType != 0 && <Tag color="blue">{formateTaskType(taskType) + '课程'}</Tag>}
              {taskModel != 0 && <Tag color="orange">{formateTaskModel(taskModel)}</Tag>}
            </div>
          </div>
          <div className={style['header-right']}>
            <Button type="default" onClick={init} style={{ marginRight: '16px' }}>
              刷新
            </Button>
          </div>
        </div>
      }
    >
      <Spin spinning={loading} size="large">
        <div className={style['detail-page']}>
          <DrawPanel
            cref={drawLf}
            isSilentMode={true}
            onSave={onSave} // 保存
            addNode={_addNode} // 添加
            deleteNode={_deleteNode} // 删除
            onNodeDbClick={onNodeDbClick} // 双击点击节点
            onEdgeDbClick={onEdgeDbClick} // 双击连线
            onExtraEvent={onExtraEvent}
          />
        </div>
      </Spin>
    </PageContainer>
  );
};

export default StudentDrawPanel;
