import React, { useEffect, useRef, useState } from 'react';
import { history, Location, useModel } from 'umi';
import { PageContainer, ProBreadcrumb } from '@ant-design/pro-layout';
import { useChatModel } from './model';
import { Button, message, Skeleton } from 'antd';
import { DoubleLeftOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import MessageBox from './components/message-box';
import PhoneCall from './components/phone-call';
import TipsBox from './components/tips-box';
import style from './style.less';
import Condition from '@/components/Condition';
import DrawPanelMini from '@/pages/draw-panel/mini';
import ScoreModal from './components/score-modal';
import config from '@/config';
// 图片
import courseSingle from '@/asset/image/course-single.png';

const ChatPage: any = (props: any) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser = {} }: any = initialState;

  const { userCode } = currentUser;

  const query: any = history.location.query || {};

  const taskId: any = query?.taskId;
  const courseId: any = query?.courseId;
  const nodeId: any = query?.nodeId;

  const { jssipInfo, setJssipInfo } = useModel('jssipConfig');

  const { getCourseInfo, resultLoading, postCall, getCallConfig } = useChatModel();

  const [pageType, setPageType] = useState<any>('init'); // init / doing
  const [title, setTitle] = useState<any>(''); // 标题
  const [tips, setTips] = useState<any>(''); // 提示语
  const [standardMsg, setStandardMsg] = useState<any>(''); // 标准话术
  const [keyPoint, setKeyPoint] = useState<any>(''); // 关键点
  // const [hasResult, setHasResult] = useState<boolean>(false); // 关键点

  // exam or exercise
  const [courseType, setCourseType] = useState<any>('exam');

  // 学习记录id
  const [recordId, setRecordId] = useState<any>('');
  const [finishFlag, setFinishFlag] = useState<any>(false);

  // 消息盒子
  const messageRef: any = useRef<any>({});
  // 额外的websocket作消息通讯
  const socketRef: any = useRef<any>({ scrollFlag: false });
  // phoneCall组件
  const phoneCallRef: any = useRef<any>({});

  // 右下角画布数据
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
    let res: any = await getCourseInfo({ courseId, taskId, nodeId });
    setTitle(res.courseName || '--');
    setTips(res.customerInfo || '--');
    setCourseType(res.taskType === 1 ? 'exercise' : 'exam');
    // setStandardMsg(res.standardMsg);
    // setKeyPoint(res.keyPoint);
    // 画布信息
    const _renderData: any = {
      nodes: res.nodes || [],
      edges: res.edges || [],
    };
    setRenderData(_renderData);
    if (miniPanelRef.current) {
      console.log('miniPanelRef.current: ----------', miniPanelRef.current);
      miniPanelRef.current?.initPanel?.(_renderData || {});
    } else {
      console.log('miniPanelRef.current: null----------');
    }
  };

  const scrollBottom = () => {
    if (!socketRef.current.scrollFlag) {
      // 页面不在滚动的时候
      setTimeout(() => {
        contentRef.current.scrollTop =
          contentRef.current.scrollHeight - contentRef.current.clientHeight;
      }, 100);
    }
  };

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
      const type: any = data.type;
      // 客服、学员、系统提示语
      if (['customer', 'student', 'system'].includes(type)) {
        msgRef.push(data);
        scrollBottom();
      } else if (type === 'standard-response') {
        // ------
        setStandardMsg(data.standardMsg || '');
        setKeyPoint(data.keyPoint || '');
      } else if (type === 'exam-end') {
        // ------ 监测到考试结束
        // 打开考试弹窗
        // 对话结束
        phoneCallRef.current?.end?.();
        setFinishFlag(true);
        openScoreModal(socketRef.current.sessionId);
      }
    } else {
      console.log('formate-msg error');
    }
  };

  // websocket
  const initSocket = async () => {
    setFinishFlag(false);

    let sessionId: any = await postCall({ courseId, taskId, nodeId });

    if (!sessionId) {
      // message.warning('获取sessionId失败');
      return false;
    }
    // -----
    setRecordId(sessionId);

    socketRef.current.sessionId = sessionId;

    const msgRef = messageRef.current;
    if (msgRef) {
      msgRef.init?.(); // 初始化
      setKeyPoint('');
      setStandardMsg('');
    }

    const curUrl: any = window.location.href;
    const type = curUrl.includes('http://') ? 'ws' : 'wss';
    let websocket_url: any = process.env.websocket_url;
    if (!websocket_url.startsWith('localhost')) {
      websocket_url = window.location.host + config.basePath + websocket_url;
    }
    console.log('连接websocket_url:');
    console.log(websocket_url);
    // websocket 连接地址
    const linkUrl = type === 'ws' ? `ws://${websocket_url}` : `wss://${websocket_url}`;

    const sk = new WebSocket(`${linkUrl}?sessionId=${sessionId}`);
    socketRef.current.sk = sk;
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
      phoneCallRef.current?.end?.();
    };
    sk.onerror = (event) => {
      console.log('error');
      setTimeout(() => {
        setFinishFlag(false);
      }, 200);
      message.warning('连接发生未知系统异常');
    };

    return true;
  };

  // 结束
  const onEnd = () => {
    setFinishFlag(true); // 主动结束
    setTimeout(() => {
      // 延迟关闭
      socketRef.current?.sk?.close?.();
    }, 1000 * 10);
  };

  // -------------------- 打开成绩单
  const openScoreModal = (id?: any) => {
    if (id && typeof id === 'object') {
      return;
    }
    // 需要学习ID、课程ID
    scoreModalRef.current.open({ studyId: id || recordId, courseId });
  };

  const getConfig = async () => {
    let res = await getCallConfig({});

    if (res) {
      console.log(res);
      setJssipInfo(res);
    }
  };

  useEffect(() => {
    // 获取基础信息
    getInfo();
    getConfig();

    return () => {
      socketRef.current?.sk?.close?.();
    };
  }, []);

  useEffect(() => {
    const scrollEvent = (e: any) => {
      clearTimeout(socketRef.current.timeFn);
      socketRef.current.scrollFlag = true;
      socketRef.current.timeFn = setTimeout(() => {
        socketRef.current.scrollFlag = false;
      }, 500);
    };

    if (pageType === 'doing' && contentRef.current) {
      contentRef.current.addEventListener('scroll', scrollEvent);
    }
    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener('scroll', scrollEvent);
      }
    };
  }, [pageType]);

  const startChangePageType = () => {
    setPageType('doing');
    setTimeout(() => {
      phoneCallRef.current.call();
      if (miniPanelRef.current) {
        console.log('renderData:', renderData);
        miniPanelRef.current?.initPanel?.(renderData || {});
      }
    }, 500);
  };

  const goBack = () => {
    if (!taskId) {
      console.log('获取不到task_id');
      return;
    }
    // 回到画布页面
    history.replace(`/front/student/course/detail?taskId=${taskId}`);
  };

  const confirmAgin = () => {
    phoneCallRef.current.call();
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
            <div className={style['title']}>
              <ArrowLeftOutlined onClick={goBack} style={{ marginRight: '8px' }} />
              {title}
            </div>
          </div>

          <div
            className={style['header-right']}
            style={{ display: pageType === 'init' ? 'none' : '' }}
          >
            <Button
              type="default"
              disabled={!recordId || !finishFlag}
              onClick={() => {
                openScoreModal(recordId);
              }}
              style={{ marginRight: '16px' }}
            >
              查看结果
            </Button>

            <PhoneCall
              cref={phoneCallRef}
              oursNumber={jssipInfo.oursNumber}
              sysPhone={jssipInfo.sysPhone}
              onCall={initSocket}
              onEnd={onEnd}
            ></PhoneCall>
          </div>
          <Condition r-if={pageType === 'init'}>
            <div className={style['header-right']}>
              <Button type="primary" onClick={startChangePageType}>
                拨打电话
              </Button>
            </div>
          </Condition>
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
                <MessageBox cref={messageRef} showIcon={courseType !== 'exam'}></MessageBox>
              </div>
            </div>

            {courseType === 'exercise' && (
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
            )}
          </div>
        </Condition>

        <Condition r-if={pageType === 'init'}>
          <div className={style['chat-page_init']} onClick={startChangePageType}>
            <img src={courseSingle} className={style['bt-pic']}></img>
            <div className={style['bt-desc']}>
              点击拨打电话开始{courseType === 'exam' ? '考试' : '练习'}
            </div>
          </div>
        </Condition>

        <ScoreModal
          cref={scoreModalRef}
          loading={resultLoading}
          confirm={confirmAgin}
          cancel={goBack}
        />
      </>
    </PageContainer>
  );
};

export default ChatPage;
