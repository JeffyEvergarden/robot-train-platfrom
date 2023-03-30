import React, { useEffect, useRef, useState } from 'react';
import { PageContainer, ProBreadcrumb } from '@ant-design/pro-layout';
import { useChatModel } from './model';
import { Button, Skeleton } from 'antd';
import MessageBox from './components/message-box';
import PhoneCall from './components/phone-call';
import TipsBox from './components/tips-box';
import style from './style.less';
import testList from './test';
import Condition from '@/components/Condition';
import DrawPanelMini from '@/pages/draw-panel/mini';
import ScoreModal from './components/score-modal';

// 图片
import courseSingle from '@/asset/image/course-single.png';

const ChatPage: any = (props: any) => {
  const { getCourseInfo, resultLoading } = useChatModel();

  const [pageType, setPageType] = useState<any>('doing'); // init / doing
  const [title, setTitle] = useState<any>(''); // 标题
  const [tips, setTips] = useState<any>(''); // 提示语
  const [standardMsg, setStandardMsg] = useState<any>(''); // 标准话术
  const [keyPoint, setKeyPoint] = useState<any>(''); // 关键点
  const [hasResult, setHasResult] = useState<boolean>(true); // 关键点

  // 消息盒子
  const messageRef: any = useRef<any>({});
  const socketRef: any = useRef<any>(null);

  // 画布
  const [renderData, setRenderData] = useState<any>({});

  const miniPanelRef: any = useRef<any>(null);
  // contentRef
  const contentRef = useRef<any>(null);

  // -----
  const scoreModalRef = useRef<any>(null);

  // 获取课程信息
  const getInfo = async () => {
    let res: any = await getCourseInfo();
    setTitle(res.name);
    setTips(res.tips);
    setStandardMsg(res.standardMsg);
    setKeyPoint(res.keyPoint);
    setRenderData(res.data);
    if (miniPanelRef.current) {
      console.log('miniPanelRef.current: ----------', miniPanelRef.current);
      miniPanelRef.current.initPanel(res.panel || {});
    } else {
      console.log('miniPanelRef.current: null----------');
    }
  };

  const formateMessage = (data: any) => {
    console.log('formate-message');

    if (!messageRef.current.push) {
      console.log('-----无法进行消息处理');
      return;
    }
    const msgRef = messageRef.current;

    if (typeof data === 'string' && data.startsWith('{')) {
      data = JSON.parse(data);
    } else {
      return;
    }
    if (typeof data === 'object') {
      msgRef.push(data);
    } else {
      console.log('formate-msg error');
    }
  };

  const initSocket = () => {
    const sk = new WebSocket('ws://localhost:4000/websocket');
    socketRef.current = sk;
    sk.onopen = (event) => {
      console.log('WebSocket 连接建立');
      sk.send('Hello Server!');
    };

    sk.onmessage = (event) => {
      console.log(`从服务器收到消息：`, event);
      // 处理信息
      formateMessage(event.data);
    };

    sk.onclose = (event) => {
      console.log('WebSocket 连接已关闭');
    };
    sk.onerror = (event) => {
      console.log('error');
    };
    console.log('---------');
  };

  const onEnd = () => {
    socketRef.current?.close?.();
  };

  // --------------------
  const openScoreModal = () => {
    scoreModalRef.current.open();
  };

  useEffect(() => {
    // 获取基础信息
    getInfo();

    return () => {
      socketRef.current?.close?.();
    };
  }, []);

  const startChangePageType = () => {
    setPageType('doing');

    if (miniPanelRef.current) {
      miniPanelRef.current.initPanel(renderData || {});
    }
  };

  return (
    <PageContainer
      header={{
        title: '',
        ghost: true,
      }}
      content={
        <div className={style['page-header']}>
          <div>
            <div className={style['title']}>{title}</div>
          </div>
          <div className={style['header-right']}>
            <Button
              type="default"
              disabled={!hasResult}
              onClick={openScoreModal}
              style={{ marginRight: '16px' }}
            >
              查看结果
            </Button>
            <PhoneCall
              oursNumber={'1000'}
              sysPhone={'1002'}
              onCall={initSocket}
              onEnd={onEnd}
            ></PhoneCall>
          </div>
        </div>
      }
    >
      <>
        <Condition r-if={pageType === 'doing'}>
          <div className={style['chat-page']}>
            <div className={style['page-left']}>
              <TipsBox tips={tips}></TipsBox>
              <div className={style['page-content']} ref={contentRef}>
                <div className={style['page-tips_bg']}>
                  <div className={style['tips-box']}>{tips}</div>
                </div>
                <MessageBox cref={messageRef}></MessageBox>
              </div>
            </div>

            <div className={style['page-right']}>
              <div className={style['page-tips-box']}>
                <div className={style['tips-title']}>• 标准话术</div>
                <div className={style['tips-content']}>{standardMsg}</div>
                <div className={style['tips-title']}>• 关键点</div>
                <div className={style['tips-content']}>{keyPoint}</div>
              </div>

              <div className={style['page-step-box']}>
                <div className={style['step-box_title']}>流程节点</div>
                <DrawPanelMini cref={miniPanelRef}></DrawPanelMini>
              </div>
            </div>
          </div>
        </Condition>

        <Condition r-if={pageType === 'init'}>
          <div className={style['chat-page_init']} onClick={startChangePageType}>
            <img src={courseSingle} className={style['bt-pic']}></img>
            <div className={style['bt-desc']}>点击拨打电话开始练习</div>
          </div>
        </Condition>

        <ScoreModal cref={scoreModalRef} loading={resultLoading} />
      </>
    </PageContainer>
  );
};

export default ChatPage;
