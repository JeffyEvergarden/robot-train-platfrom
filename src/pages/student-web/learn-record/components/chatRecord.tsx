import { useState, useImperativeHandle, useRef } from 'react';
import { Modal } from 'antd';
import MessageBox from './messageBox';
import RightDetail from './rightDetail';
import styles from './index.less';
import { useLearnModel } from './../model';
import config from '@/config';
import AudioPlay from './audioPlay';

export default (props: any) => {
  const { cref } = props;

  const messageRef: any = useRef<any>({});

  const { scoreRequest, dialogueRecord } = useLearnModel();

  const [visible, setVisible] = useState<boolean>(false);
  const [rowData, setRowData] = useState<any>({});
  const [scoreData, setScoreData] = useState<any>({});

  useImperativeHandle(cref, () => ({
    open: (record: any) => {
      setVisible(true);
      setRowData(record);
      getScore(record);
      getChatRecord(record);
    },
    close: onClose,
  }));

  const onClose = () => {
    setVisible(false);
  };

  const getChatRecord = async (record: any) => {
    let params = {
      studyId: record?.id,
    };
    let res = await dialogueRecord(params);
    setTimeout(() => messageRef?.current?.init(res?.data?.dialogueList), 500);
  };

  const getScore = async (record: any) => {
    let params = {
      courseId: record?.courseId,
    };
    let res = await scoreRequest(params);
    setScoreData(res?.data);
  };

  return (
    <Modal
      title={'详情'}
      width={1100}
      centered
      onCancel={onClose}
      visible={visible}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <div style={{ width: '100px' }}>全程会话录音</div>
          <AudioPlay
            musicSrc={
              process.env.mock
                ? '/ai-teach/mp3/story.mp3'
                : `${config.basePath}/services/stu/course/fragment/listen?studyId=${rowData?.id}`
            }
          />
        </div>
      }
      destroyOnClose
    >
      <div className={styles.contentBox}>
        <div className={styles.messageBox}>
          <div className={styles.detailTitle}>通话详情</div>
          <div style={{ padding: '16px', overflowY: 'auto', height: '620px' }}>
            <MessageBox cref={messageRef} />
          </div>
        </div>
        <div className={styles.rightDetailBox}>
          <div className={styles.detailTitle}>扣分详情</div>
          <div style={{ padding: '16px', overflowY: 'auto', height: '620px' }}>
            <RightDetail
              disCountList={scoreData?.pointsDeductionList || []}
              scoreData={scoreData}
            />
          </div>
          <div className={styles.detailTop}>合计扣分：{scoreData?.deductScore}</div>
        </div>
      </div>
    </Modal>
  );
};
