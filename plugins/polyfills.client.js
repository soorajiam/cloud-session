if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || require('buffer').Buffer;
  window.process = window.process || {
    env: {},
    version: '',
    platform: '',
    nextTick: function(fn) { setTimeout(fn, 0); }
  };
} 