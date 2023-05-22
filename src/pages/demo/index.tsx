import React, { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
import { Button, Input, message } from 'antd';
import style from './style.less';
import JsSIP from 'jssip';
import { useChatModel } from '../chat-page/model';
import config from '@/config';
import { startCall } from './test';
import Condition from '@/components/Condition';

const { basePath } = config;

let currentSession = null;

let currentConnection = null;

// 首页
const Demo: React.FC = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const [status, setStatus] = useState<any>('waiting'); // waiting / calling /doing

  const [text, setText] = useState<any>('waiting'); // waiting / calling /doing
  // 存储会话
  const sipSession = useRef<any>({});
  // 我们的音频
  const oursAudioRef = useRef<any>(null);
  // 远方的音频
  const remoteAudioRef = useRef<any>(null);

  const musicAudioRef = useRef<any>(null);


  const { getCallConfig } = useChatModel();

  const { jssipInfo, setJssipInfo } = useModel('jssipConfig');

  const [conf, setConf] = useState<any>('{}');


  const getConfig = async () => {
    let res = await getCallConfig({});
    console.log(res);
    setJssipInfo(res);
  }

  useEffect(() => {
    getConfig()
  }, [])

  useEffect(() => {
    setConf(JSON.stringify(jssipInfo, null, 2))
  }, [jssipInfo])


  const [val1, setVal1] = useState<any>('1000');

  const [val2, setVal2] = useState<any>('1002');

  const onChange1 = (e: any) => {
    setVal1(e.target.value);
  }

  const onChange2 = (e: any) => {
    setVal2(e.target.value);
  }

  // 开始播放
  const play = () => {
    if (status === 'waiting') {
      sipSession.current.status = 'calling'
      musicAudioRef.current.currentTime = 0;
      musicAudioRef.current.play();
      setStatus('calling');
    }
  };

  const clearTimeFn = () => {
    clearTimeout(sipSession.current.timeFn);
  };

  // 延时停止
  const timeoutFn = () => {
    sipSession.current.timeFn = setTimeout(() => {
      stop();
    }, 60 * 1000);
  };

  // 停止音乐
  const pauseMusic = () => {
    // --------------
    if (sipSession.current.status === 'calling') {
      setTimeout(() => {
        musicAudioRef.current?.pause();
      }, 200)
    }
    setStatus('waiting');
  };

  const stop = () => {
    setText('...');
    // 挂断
    sipSession.current.ua?.stop?.();
    // ---
    sipSession.current.ua?.unregister?.({ all: true });
    // --------------

    if (sipSession.current.status === 'calling') {
      setTimeout(() => {
        musicAudioRef.current?.pause();
      }, 200)
    }
    setStatus('waiting');

  };


  const startConfig = () => {

    if (!val1 || !val2) {
      message.warning('请填写输入框')
      return null;
    }

    const curUrl: any = window.location.href;
    const type = curUrl.includes('http://') ? 'ws' : 'wss'

    const linkUrl = `wss://${jssipInfo.wssUrl}`;
    // 信令服务器注册
    const registerUrl = jssipInfo.registerUrl;

    const socket = new JsSIP.WebSocketInterface(linkUrl);

    // 注册信息  
    const configuration = {
      sockets: [socket],
      uri: 'sip:' + val1 + registerUrl,
      password: jssipInfo.fsPassword, // 公司freeswitch,
      outbound_proxy_set: linkUrl,
      display_name: 'ws_phone_call',
      register: true,
      session_timers: false,
    };

    console.log(configuration);

    const ua = new JsSIP.UA(configuration);

    sipSession.current.ua = ua;

    sipSession.current.currentSession = null;
    sipSession.current.currentConnection = null;

    ua.start();
    //播放叮叮叮音频

    // 注册反馈
    ua.on('registered', function (data) {
      console.info('registered: ', data.response);
    });

    ua.on('registrationFailed', function (data) {
      console.log('registrationFailed: 注册失败');
      message.warning('信令服务器注册失败');
      stop();
    });

    ua.on('registrationExpiring', function () {
      console.warn('registrationExpiring: 注册超时');
      message.warning('信令服务器注册超时');
      stop();
    });

    // 连接
    ua.on('newRTCSession', function (res: any) {
      console.log('newRTCSession: ---', res);
      let { session, originator } = res;

      if (originator === 'remote') {
        console.log('接电话啦');
        setText('请接听....');
        play();
        timeoutFn();
        handleAnswerWebRTCSession(session);
      } else if (originator === 'local') {
        console.log('打电话啦');
        clearTimeFn();
        handleCallWebRTCSession(session);
      }
      // ----------
      res.session.on('peerconnection', function (data: any) {
        // 触发收到流 ---------
        console.log('peerconnection');
        console.log(data);
        data.peerconnection.onaddstream = function (ev: any) {
          console.log('onaddStream');
          console.log(ev);
          remoteAudioRef.current.src = URL.createObjectURL(ev.stream);
          remoteAudioRef.current.onloadstart = () => {
            remoteAudioRef.current.play();
          };
          remoteAudioRef.current.onerror = () => {
            alert('录音加载失败...');
          };
        };
      });
    });
  }

  // 
  const receive = () => {
    // 接听
    console.log('receive:');
    // --------
    sipSession.current.currentSession.answer({
      mediaConstraints: { audio: true, video: false }, pcConfig: {
        iceServers: [{ urls: [`stun:${jssipInfo.stun}`] }]
      }
    });

  }

  const autoCall = () => {
    play();
    timeoutFn();

    var eventHandlers = {
      progress: function (e: any) {
        console.log('call is in progress')
      },
      failed: function (e: any) {
        console.log('call failed: ', e)
      },
      ended: function (e: any) {
        console.log('call ended : ', e)
      },
      confirmed: function (e: any) {
        console.log('call confirmed')
      }
    }


    var options = {
      eventHandlers: eventHandlers,
      mediaConstraints: { audio: true, video: false }, pcConfig: {
        iceServers: [{ urls: [`stun:${jssipInfo.stun}`] }]
      }
      //'mediaStream': localStream
    }

    const userAgent = sipSession.current.ua
    //outgoingSession = userAgent.call('sip:3000@192.168.40.96:5060', options);
    /*
         * 拨打多媒体电话。不需要自己调用 getUserMedia 来捕获音视频了， JsSIP 会根据你传给JsSIP.UA.call方法的参数来自己调用

             参数

             Target 通话的目的地。String表示目标用户名或完整的SIP URI或JsSIP.URI实例。

             Options 可选Object附加参数（见下文）。
                 options对象中的字段；
                 mediaConstraints Object有两个有效的字段（audio和video）指示会话是否打算使用音频和/或视频以及要使用的约束。默认值是audio并且video设置为true。
                 mediaStream MediaStream 传送到另一端。
                 eventHandlers Object事件处理程序的可选项将被注册到每个呼叫事件。为每个要通知的事件定义事件处理程序。
             */
    userAgent.call(`sip:${val2}${jssipInfo.registerUrl}`, options)
  }


  // 处理回复
  const handleAnswerWebRTCSession = (session: any) => {
    /** session 要单独存下，后面接听挂断需要
        挂断: session.terminate();
        接听：session.answer({'mediaConstraints': { 'audio': true, 'video': false }})
    */
    let { _connection } = session;
    currentSession = session;
    currentConnection = _connection;
    console.log('等待对方播电话', `stun:${jssipInfo.stun}`);

    session.on("accepted", () => {
      pauseMusic();
      clearTimeFn();
      setText('已接听');
      console.log('answer accepted', session);
      handleStreamsSrcObject(session._connection);
    });
    // 来电=>自定义来电弹窗，让用户选择接听和挂断
    // session.on("progress", () => { });
    // 挂断-来电已挂断
    session.on("ended", () => {
      console.log('挂断-来电已挂断')
    });
    // 当会话无法建立时触发
    session.on("failed", () => {
      console.log('当会话无法建立时触发')
    });
  }

  // 主动播打
  const handleCallWebRTCSession = (session: any) => {
    let { _connection } = session;
    currentSession = session;
    currentConnection = _connection;
    session.on('confirmed', () => {
      console.log('call confirmed');
      handleStreamsSrcObject(session._connection);
    });
  }

  // 处理回复流
  const handleStreamsSrcObject = (connection: any) => {
    console.log('connection:')
    console.log(connection) // 输出了RTCPeerConnection 类
    console.log(connection.getRemoteStreams().length);

    if (connection.getLocalStreams().length > 0) {
      console.log('获取本地媒体流', connection.getLocalStreams().length)
      // 获取本地媒体流
      let srcObject = connection.getLocalStreams()[0];
      console.log(srcObject);
      oursAudioRef.current.srcObject = srcObject;
      oursAudioRef.current.play()
    };
  }


  return (
    <div className={style['demo-box']}>

      <div className={style['box-item']}>
        <Input value={val1} onChange={onChange1} style={{ width: '200px' }}></Input>
      </div>
      <div className={style['box-item']}>
        <Input value={val2} onChange={onChange2} style={{ width: '200px' }}></Input>
      </div>

      <Button onClick={startConfig}>注册</Button>

      <div className={style['box-item']}>
        {text}
      </div>

      <div className={style['box-item']}>
        <Button onClick={receive}>接听</Button>
      </div>

      <div className={style['box-item']}>

        <Button type="primary" onClick={autoCall}>主动拨打</Button>
      </div>
      <div className={style['box-item']}>
        <Button type="primary" danger onClick={stop}>
          结束对话
        </Button>
      </div>
      <audio id="remote-audio" ref={remoteAudioRef} controls></audio>

      <audio id="ours-audio" ref={oursAudioRef} controls></audio>


      <audio
        id="music-audio"
        src={`${basePath}/mp3/story.mp3`}
        ref={musicAudioRef}
        controls
      ></audio>

      <div className={style['content-second']} style={{ marginTop: '20px' }}> {conf} </div>

      {/* <video id="video" controls></video> */}
    </div>
  );
};

export default Demo;