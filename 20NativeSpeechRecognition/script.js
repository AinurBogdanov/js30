const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();

//give result as you speak
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');

  p.textContent = transcript;
  if (e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
  }

  // Можно сделать голосового помощника
  if (e.results[0].isFinal) {
    if (transcript.includes('hello')) {
      console.log('hello bos');
    }
  }
});

recognition.addEventListener('end', () => {
  setTimeout(() => {
    recognition.start();
  }, 100);
});
recognition.start();
