import React, { useEffect, useRef, useState } from 'react';
import { history, Location } from 'umi';
import { PageContainer, ProBreadcrumb } from '@ant-design/pro-layout';
import { useChatModel } from './model';
import { Button, Skeleton } from 'antd';
import { DoubleLeftOutlined, ArrowLeftOutlined } from '@ant-design/icons';
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

  const query: any = history.location.query || {};

  const taskId: any = query?.taskId;
  const courseId: any = query?.courseId;

  const { getCourseInfo, resultLoading } = useChatModel();

  const [pageType, setPageType] = useState<any>('doing'); // init / doing
  const [title, setTitle] = useState<any>(''); // 标题
  const [tips, setTips] = useState<any>(''); // 提示语
  const [standardMsg, setStandardMsg] = useState<any>(''); // 标准话术
  const [keyPoint, setKeyPoint] = useState<any>(''); // 关键点
  // const [hasResult, setHasResult] = useState<boolean>(false); // 关键点

  // 学习记录id
  const [recordId, setRecordId] = useState<any>('');

  // 消息盒子
  const messageRef: any = useRef<any>({});
  // 
  const socketRef: any = useRef<any>({ scrollFlag: false });

<<<<<<< HEAD

  // 右下角画布数据
=======
  // 画布
>>>>>>> 7fe020f804898e40f9ecd8746fb1b2efc34ce8ed
  const [renderData, setRenderData] = useState<any>({});

  // 操控的画布面板
  const miniPanelRef: any = useRef<any>(null);

  // contentRef 消息盒子的dom
  const contentRef = useRef<any>(null);

  // 成绩弹窗-----
  const scoreModalRef = useRef<any>(null);

  // 获取课程信息
  const getInfo = async () => {
    // 获取课程信息
    let res: any = await getCourseInfo({ courseId });
    setTitle(res.courseName || '--');
    setTips(res.customerInfo || '--');
    // setStandardMsg(res.standardMsg);
    // setKeyPoint(res.keyPoint);
    // 画布信息
    const _renderData: any = {
      nodes: res.nodes || [],
      edges: res.edges || []
    }
    setRenderData(_renderData);
    if (miniPanelRef.current) {
<<<<<<< HEAD
      console.log('miniPanelRef.current: ----------', miniPanelRef.current)
      miniPanelRef.current?.initPanel?.(_renderData || {})
=======
      console.log('miniPanelRef.current: ----------', miniPanelRef.current);
      miniPanelRef.current.initPanel(res.panel || {});
>>>>>>> 7fe020f804898e40f9ecd8746fb1b2efc34ce8ed
    } else {
      console.log('miniPanelRef.current: null----------');
    }
  };

  const scrollBottom = () => {
    if (!socketRef.current.scrollFlag) { // 页面不在滚动的时候
      setTimeout(() => {
        contentRef.current.scrollTop = contentRef.current.scrollHeight - contentRef.current.clientHeight;
      }, 100);
    }
  }

  // 消息格式化加入盒子
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
      scrollBottom();
    } else {
      console.log('formate-msg error');
    }
<<<<<<< HEAD
  }

  // websocket
=======
  };

>>>>>>> 7fe020f804898e40f9ecd8746fb1b2efc34ce8ed
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
<<<<<<< HEAD
      console.log('error')
    }
    console.log('---------')
  }

  // 结束
  const onEnd = () => {
    socketRef.current?.close?.()
  }


  // -------------------- 打开成绩单
  const openScoreModal = (id?: string) => {
    // 需要学习ID、课程ID
    scoreModalRef.current.open({ studyId: id || recordId, courseId });
  }
=======
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
>>>>>>> 7fe020f804898e40f9ecd8746fb1b2efc34ce8ed

  useEffect(() => {
    // 获取基础信息
    getInfo();

    return () => {
      socketRef.current?.close?.();
    };
  }, []);

<<<<<<< HEAD
  useEffect(() => {



    const scrollEvent = (e: any) => {
      clearTimeout(socketRef.current.timeFn);
      socketRef.current.scrollFlag = true;
      socketRef.current.timeFn = setTimeout(() => {
        socketRef.current.scrollFlag = false;
      }, 500);
    }

    if (pageType === 'doing' && contentRef.current) {
      contentRef.current.addEventListener('scroll', scrollEvent)
    }
    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener('scroll', scrollEvent)
      }
    }

  }, [pageType])




=======
>>>>>>> 7fe020f804898e40f9ecd8746fb1b2efc34ce8ed
  const startChangePageType = () => {
    setPageType('doing');

    if (miniPanelRef.current) {
<<<<<<< HEAD
      miniPanelRef.current?.initPanel?.(renderData || {})
=======
      miniPanelRef.current.initPanel(renderData || {});
>>>>>>> 7fe020f804898e40f9ecd8746fb1b2efc34ce8ed
    }
  };


  const goBack = () => {
    // 回到画布页面
    history.push(`/student/course/detail?taskId=${taskId}`);

  }

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
              {title}
            </div>
          </div>
          <div className={style['header-right']}>
            <Button
              type="default"
              disabled={!recordId}
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
                <div className={style['tips-content']}>{standardMsg || '--'}</div>
                <div className={style['tips-title']}>• 关键点</div>
                <div className={style['tips-content']}>{keyPoint || '--'}</div>
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
