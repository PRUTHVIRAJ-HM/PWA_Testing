let startTime, interval;
let running = false;

function updateDisplay(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  document.getElementById('display').textContent = `${hours}:${minutes}:${seconds}`;
}

function start() {
  if (running) return;
  running = true;
  startTime = Date.now() - (window.elapsed || 0);
  interval = setInterval(() => {
    window.elapsed = Date.now() - startTime;
    updateDisplay(window.elapsed);
  }, 1000);
}

function stop() {
  running = false;
  clearInterval(interval);
}

function reset() {
  running = false;
  clearInterval(interval);
  window.elapsed = 0;
  updateDisplay(0);
}

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('Service Worker registered', reg))
    .catch(err => console.error('Service Worker registration failed', err));
}
