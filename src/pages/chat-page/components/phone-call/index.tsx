import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import JsSIP from 'jssip';
import { Button, message } from 'antd';
import Condition from '@/components/Condition';
import style from './style.less';
import config from '@/config';
import { useChatModel } from '../../model';

const { basePath } = config;

let currentSession = null;

let currentConnection = null;

const PhoneCall: React.FC<any> = (props: any) => {
  const { oursNumber, sysPhone, onCall, onEnd, cref } = props;

  const [status, setStatus] = useState<any>('waiting'); // waiting / calling /doing

  const { postCall } = useChatModel();
  // const []
  // 存储会话
  const sipSession = useRef<any>({});
  // 我们的音频
  const oursAudioRef = useRef<any>(null);
  // 远方的音频
  const remoteAudioRef = useRef<any>(null);

  const musicAudioRef = useRef<any>(null);

  const curUrl: any = window.location.href;
  const type = curUrl.includes('http://') ? 'ws' : 'wss';
  // websocket 连接地址
  const linkUrl = type === 'ws' ? `ws://${process.env.ws_url}` : `wss://${process.env.wss_url}`;
  // 信令服务器注册
  const registerUrl = process.env.register_url;

  const startConfig = async () => {
    if (sipSession.current.lastTime) {
      let second = Date.now() - sipSession.current.lastTime;
      if (second <= 4000) {
        message.warning('播打太频繁，请稍后尝试');
        return;
      }
      sipSession.current.lastTime = Date.now();
    } else {
      sipSession.current.lastTime = Date.now();
    }

    if (!oursNumber || !sysPhone) {
      message.warning('请设置呼叫号码');
      return null;
    }

    // 播放音乐

    let res: any = await onCall?.();

    if (!res) {
      return;
    }
    // 单独增加
    setStatus('calling');
    // timeoutFn(); 这版本不做清除
    // ----
    return;

    play();

    const socket = new JsSIP.WebSocketInterface(linkUrl);

    // 注册信息
    const configuration = {
      sockets: [socket],
      uri: 'sip:' + oursNumber + registerUrl,
      password: process.env.fs_password, // 公司freeswitch,
      outbound_proxy_set: linkUrl,
      display_name: 'ws_phone_call',
      register: true,
      session_timers: false,
    };

    const ua = new JsSIP.UA(configuration);

    sipSession.current.ua = ua;

    sipSession.current.currentSession = null;
    sipSession.current.currentConnection = null;

    play();
    timeoutFn();
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
        clearTimeFn();
        pauseMusic(); // 停止铃声
        handleAnswerWebRTCSession(session);
      } else if (originator === 'local') {
        console.log('打电话啦');
        clearTimeFn();
        handleCallWebRTCSession(session);
      }
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
  };

  // 主动call
  const autoCall = () => {
    let eventHandlers = {
      progress: function (e: any) {
        console.log('call is in progress');
      },
      failed: function (e: any) {
        console.log('call failed: ', e);
        stop();
      },
      ended: function (e: any) {
        console.log('call ended : ', e);
        stop();
      },
      confirmed: function (e: any) {
        console.log('call confirmed');
      },
    };

    let options = {
      eventHandlers: eventHandlers,
      mediaConstraints: { audio: true, video: false },
      //'mediaStream': localStream
    };

    const userAgent = sipSession.current.ua;
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
    userAgent.call(`sip:${sysPhone}${registerUrl}`, options);
  };

  // 处理接
  const handleAnswerWebRTCSession = (session: any) => {
    /** session 要单独存下，后面接听挂断需要
        挂断: session.terminate();
        接听：session.answer({'mediaConstraints': { 'audio': true, 'video': false }})
    */
    let { _connection } = session;
    currentSession = session;
    currentConnection = _connection;
    // 主动接听
    session.answer({ mediaConstraints: { audio: true, video: false } });

    session.on('accepted', () => {
      console.log('answer accepted', session);
      setStatus('doing');
      handleStreamsSrcObject(session._connection);
    });

    // 来电=>自定义来电弹窗，让用户选择接听和挂断
    // session.on("progress", () => { });
    // 挂断-来电已挂断
    session.on('ended', () => {
      console.log('挂断-来电已挂断');
      stop();
    });
    // 当会话无法建立时触发
    session.on('failed', () => {
      console.log('当会话无法建立时触发');
      stop();
    });
  };

  // 处理打
  const handleCallWebRTCSession = (session: any) => {
    let { _connection } = session;
    currentSession = session;
    currentConnection = _connection;
    session.on('confirmed', () => {
      setStatus('doing');
      pauseMusic(); // 停止铃声
      console.log('call confirmed');
      handleStreamsSrcObject(session._connection);
    });
  };

  // 处理打的流 ---测试
  const handleStreamsSrcObject = (connection: any) => {
    console.log('connection: ------------');
    //  console.log(connection) // 输出了RTCPeerConnection 类
    console.log(connection.getRemoteStreams().length);
    // if (connection.getRemoteStreams().length > 0) {
    //   console.log('获取远程媒体流', connection.getLocalStreams().length)
    //   // 获取远程媒体流
    //   let srcObject = connection.getRemoteStreams()[0];
    //   console.log(srcObject);
    //   remoteAudioRef.current.srcObject = srcObject;
    // };
    if (connection.getLocalStreams().length > 0) {
      console.log('获取本地媒体流', connection.getLocalStreams().length);
      // 获取本地媒体流
      let srcObject = connection.getLocalStreams()[0];
      console.log(srcObject);
      oursAudioRef.current.srcObject = srcObject;
      oursAudioRef.current.play();
    }
  };

  // 开始播放
  const play = () => {
    if (status === 'waiting') {
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
    musicAudioRef.current.pause();
    setStatus('waiting');
  };

  const stop = () => {
    // 挂断
    sipSession.current.ua?.stop?.();
    // ---
    sipSession.current.ua?.unregister?.({ all: true });
    // --------------
    musicAudioRef.current?.pause?.();
    setStatus('waiting');

    onEnd?.();
  };

  useImperativeHandle(cref, () => ({
    call: startConfig,
    end: stop,
  }));

  return (
    <div style={{ display: 'inline-flex' }}>
      <Condition r-if={status === 'waiting'}>
        <Button type="primary" onClick={startConfig}>
          拨打电话
        </Button>
      </Condition>

      <Condition r-if={status === 'calling'}>
        <Button onClick={stop}>拨打中...</Button>
      </Condition>

      <Condition r-if={status === 'doing'}>
        <Button type="primary" danger onClick={stop}>
          结束对话
        </Button>
      </Condition>

      <div className={style['hidden-auto']}>
        <audio id="remote-audio" ref={remoteAudioRef} controls></audio>

        <audio id="ours-audio" ref={oursAudioRef} controls></audio>

        <audio
          id="music-audio"
          src={`${basePath}/mp3/story.mp3`}
          ref={musicAudioRef}
          controls
        ></audio>
      </div>
    </div>
  );
};

export default PhoneCall;
