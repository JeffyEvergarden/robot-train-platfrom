import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';
import { Button, Modal, Progress, Tag, Table, Spin } from 'antd';
import * as echarts from 'echarts';
import { useChatModel } from '../../model';
import { getConfig, columns } from './config';
import style from './style.less';

const ScoreModal: any = (props: any) => {
  const { cref, loading } = props;

  const { getStepResult } = useChatModel();

  const pieRef: any = useRef<any>(null);
  const pieDomRef: any = useRef<any>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [score, setScore] = useState<any>(0);

  const [tableData, setTableData] = useState<any[]>([]);

  const open = async (data?: any) => {
    setIsModalOpen(true);

    let res: any = await getStepResult(data);
    if (res) {
      let { scoreDetail = [], deductPoints = [], score } = res;
      initOptions(scoreDetail || []);
      setScore(score);
      setTableData(deductPoints);
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
      width={'880px'}
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

            <Table
              rowKey="name"
              size="small"
              columns={columns}
              dataSource={tableData}
              style={{ marginTop: '16px', width: '280px' }}
              pagination={false}
              scroll={{ y: 140 }}
            ></Table>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default ScoreModal;
