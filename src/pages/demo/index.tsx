import React, { useEffect, useRef } from 'react';
import { useModel } from 'umi';
import { Button } from 'antd';
import style from './style.less';
import JsSIP from 'jssip';


// 首页
const Demo: React.FC = (props: any) => {
  // const { initialState, setInitialState } = useModel('@@initialState');

  const sipSession = useRef<any>({});

  // 我们的音频
  const oursAudioRef = useRef<any>(null);
  // 远方的音频
  const remoteAudioRef = useRef<any>(null);

  const startConfig = () => {

    const curUrl: any = window.location.href;
    const type = curUrl.includes('http://') ? 'ws' : 'wss'
    const linkUrl = type === 'ws' ? 'ws://11.112.0.42:5066' : 'wss://11.112.0.42:7443'

    const registerUrl = '@11.112.0.42:5070'

    const socket = new JsSIP.WebSocketInterface(linkUrl);

    // 注册信息  
    const configuration = {
      sockets: [socket],
      uri: 'sip:' + '1000' + registerUrl,
      password: 'yiwise',  // 公司freeswitch,
      outbound_proxy_set: linkUrl,
      display_name: 'JeffyLiang',
      register: true,
      session_timers: false
    };

    const ua = new JsSIP.UA(configuration);

    ua.start();

    ua.on('registered', function (data) {
      console.info("registered: ", data.response);
    });

    ua.on('newRTCSession', function (e: any) {
      console.log('newRTCSession: ---', e)
      if (e.session._direction == "outgoing") {
        console.log("打电话");
      } else {
        console.log("来电话啦");
        // 绑定session
        const session = e.session
        sipSession.current = e.session;
        console.log(e.session);
        // 接听
        // RTCSession 的 answer 方法做了自动接听。实际开发中，你需要弹出一个提示框，让用户选择是否接听
        session.answer({
          'mediaConstraints': { 'audio': true, 'video': false },
          // 'mediaStream': localStream
        });
        //拿到远程的音频流
        session.connection.addEventListener("addstream", function (ev: any) {
          console.info('onaddstream from remote - ', ev.stream);
          console.log(remoteAudioRef.current)
          remoteAudioRef.current.srcObject = ev.stream;
          remoteAudioRef.current.play();
        })


        // session.on('accepted', function (data: any) {
        //   console.info('onAccepted - ', data)
        //   // if (data.originator == 'remote' && currentSession == null) {
        //   //   currentSession = incomingSession
        //   //   incomingSession = null
        //   //   console.info('setCurrentSession - ', currentSession)
        //   // }
        //   if (data.session._connection.getLocalStreams().length > 0) {
        //     // 接听后，判断localStream
        //     oursAudioRef.current.srcObject = e.session._connection.getLocalStreams()[0];
        //     oursAudioRef.current.volume = 4;
        //   }
        //   if (data.session._connection.getRemoteStreams().length > 0) {
        //     remoteAudioRef.current.srcObject = e.session._connection.getRemoteStreams()[0];
        //   }
        // })
        // session.on('confirmed', function (data: any) {
        //   console.info('onConfirmed - ', data)
        //   // if (data.originator == 'remote' && currentSession == null) {
        //   //   currentSession = incomingSession
        //   //   incomingSession = null
        //   //   console.info('setCurrentSession - ', currentSession)
        //   // }
        // })
        // session.on('sdp', function (data: any) {
        //   console.info('onSDP, type - ', data.type, ' sdp - ', data.sdp)
        // })

        // session.on('progress', function (data: any) {
        //   console.info('onProgress - ', data.originator)
        //   if (data.originator == 'remote') {
        //     console.info('onProgress, response - ', data.response)
        //   }
        // })
        // session.on('peerconnection', function (data: any) {
        //   console.info('onPeerconnection - ', data.peerconnection)
        //   data.peerconnection.onaddstream = function (ev: any) {
        //     console.info('onaddstream from remote ----------- ', ev)
        //     // 需要连接页面的 vidio 标签
        //     let videoView: any = document.getElementById('videoView')
        //     videoView.srcObject = ev.stream
        //   }
        // })
      }
    });
  }



  useEffect(() => { }, []);

  return (
    <div className={style['demo-box']}>

      <Button type="primary" onClick={startConfig}>free-switch</Button>

      <audio id="remote-audio" ref={remoteAudioRef} controls></audio>

      <audio id="ours-audio" ref={oursAudioRef} controls></audio>


      <video id="videoView" ref={oursAudioRef} controls></video>
    </div>
  );
};

export default Demo;