var eventHandlers = {
  'progress': function (e: any) {
    console.log('call is in progress');
  },
  'failed': function (e: any) {
    console.log('call failed with cause: ' + e.data.cause);
  },
  'ended': function (e: any) {
    console.log('call ended with cause: ' + e.data.cause);
  },
  'confirmed': function (e: any) {
    console.log('call confirmed');
  }
};

var options = {
  'eventHandlers': eventHandlers,
  'mediaConstraints': {
    'audio': true,
    'video': false
  }
};
