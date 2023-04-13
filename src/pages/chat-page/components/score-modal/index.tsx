import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';
import { Button, Modal, Progress, Tag, Table, Spin, message } from 'antd';
import * as echarts from 'echarts';
import { useChatModel } from '../../model';
import { getConfig, columns } from './config';
import style from './style.less';

const wait = (second: any) => {
  return new Promise((reslove: any, reject: any) => {
    setTimeout(() => {
      reslove();
    }, second * 1000);
  });
};

const ScoreModal: any = (props: any) => {
  const { cref, loading } = props;

  const { getStepResult, setResultLoading, resultLoading } = useChatModel();

  const pieRef: any = useRef<any>(null);
  const pieDomRef: any = useRef<any>(null);

  const [studyId, setStudyId] = useState<any>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [score, setScore] = useState<any>(0);

  const [tableData, setTableData] = useState<any[]>([]);

  const open = async (data?: any) => {
    if (resultLoading) {
      return;
    }
    let _studyId = data?.studyId;
    if (_studyId !== studyId) {
      setStudyId(_studyId);
      setResultLoading(true);
      await wait(1);
    }
    let res: any = await getStepResult(data);

    if (res) {
      let { scoreDetail = [], deductPoints = [], score } = res;
      initOptions(scoreDetail || []);
      setIsModalOpen(true);
      setScore(score);
      setTableData(deductPoints);
    } else {
      message.warning('获取成绩失败');
    }
  };

  const initOptions = (data: any) => {
    const options: any = getConfig(data);
    console.log(pieRef.current);
    pieRef.current?.setOption?.(options);
  };

  const handleOk = () => {
    console.log('handleOk');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    console.log('handleCancel');
    setIsModalOpen(false);
  };

  useImperativeHandle(cref, () => ({
    open,
  }));

  useEffect(() => {
    const chartDom = document.getElementById('pie-box');
    pieRef.current = echarts.init(chartDom as any);
  }, []);

  return (
    <Modal
      title="得分结果"
      forceRender={true}
      visible={isModalOpen}
      className={style['model-bg']}
      maskClosable={false}
      width={'920px'}
      onOk={handleOk}
      cancelText={'关闭'}
      onCancel={handleCancel}
    >
      <Spin spinning={loading}>
        <div className={style['zy-row']}>
          <div id="pie-box" ref={pieDomRef} className={`${style['pie-box']}`}></div>

          <div className={style['score-box']}>
            <Progress
              strokeLinecap="butt"
              type="circle"
              width={180}
              percent={score}
              format={(per: any) => {
                return (
                  <div className={style['score-box']}>
                    <span style={{ fontSize: '40px' }}>{per.toFixed(0)}</span>
                    <div>
                      {per >= 60 ? (
                        <Tag color="success">合格</Tag>
                      ) : (
                        <Tag color="error">不合格</Tag>
                      )}
                    </div>
                  </div>
                );
              }}
            ></Progress>

            {tableData.length > 0 && (
              <Table
                rowKey="name"
                size="small"
                columns={columns}
                dataSource={tableData}
                style={{ marginTop: '16px', width: '320px' }}
                pagination={false}
                scroll={{ y: 140 }}
              ></Table>
            )}
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default ScoreModal;
