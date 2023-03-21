
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useModel } from 'umi';
import { Button, message, Input } from 'antd';
import DrawPanel from "@/pages/draw-panel/student";
import { useDrawModel } from './model';
import style from './style.less';





const StudentDrawPanel: any = (props: any) => {


  const drawLf: any = useRef<any>(null);

  const curNodeRef: any = useRef<any>(null);

  // 输入框
  const [nameVal, setNameVal] = useState<any>('');

  const [inputVal, setInputVal] = useState<any>('');
  const onChangeInput = (e: any) => {
    setInputVal(e.target.value);
  }
  const onBtClick = () => {
    let lf = drawLf.current.getLf();
    lf.updateText(curNodeRef.current.id, inputVal)
    // curNodeRef.current.text.value = inputVal
  }



  // -------
  // 获取画布
  const { getDrawPanel, saveDrawPanel, addNode, deleteNode } = useDrawModel();

  // 事件监听

  //初始化
  const init = async () => {

    let res = await getDrawPanel({});
    drawLf.current?.initPanel({});
    if (res) {
      drawLf.current?.initPanel(res);
    }
  }

  // 保存画布
  const onSave = (data: any) => {
    const { nodes, edges } = data;
    saveDrawPanel({ nodes, edges })
  }

  // 监听节点添加  return true / false

  const _addNode = async (data: any) => {
    return addNode(data);
  }

  // 删除节点删除 return true / false
  const _deleteNode = async (data: any) => {
    return deleteNode(data);
  }

  // 双击节点
  const onNodeDbClick = async (data: any) => {
    console.log(data);
    curNodeRef.current = data;
    setNameVal(data.text.value)
  }

  // 双击连线
  const onEdgeDbClick = async (data: any) => {
    console.log(data);
  }


  useEffect(() => {
    //初始化画布
    init();
  }, []);


  return (
    <>
      <DrawPanel
        cref={drawLf}
        extra={
          <div className={style['extra-box']}>
            <Input value={inputVal} onChange={onChangeInput} style={{ width: '200px' }} placeholder={'测试修改文本'} />

            <Button type="primary" style={{ margin: '0 10px' }} onClick={onBtClick}>修改</Button>

            <span>{nameVal}</span>
          </div>
        }
        onSave={onSave} // 保存
        addNode={_addNode} // 添加
        deleteNode={_deleteNode} // 删除
        onNodeDbClick={onNodeDbClick} // 双击点击节点
        onEdgeDbClick={onEdgeDbClick} // 双击连线
      />
    </>
  )
}


export default StudentDrawPanel;