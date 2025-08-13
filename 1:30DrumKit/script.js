window.addEventListener('keydown', playSound);

const btns = document.querySelectorAll('.play-btn');
btns.forEach((key) => key.addEventListener('transitionend', removeTransition));

const shoutDownBtn = document.querySelector('.js-shout-down');
shoutDownBtn.addEventListener('transitionend', removeTransition);

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
  this.classList.remove('shoutingDown');
}
function playSound(e) {
  if (e.keyCode === 32) {
    stopAllSounds();
    shoutDownBtn.classList.add('shoutingDown');
    return;
  }

  const note = document.querySelector(`.play-btn[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

  if (!note || !audio) return;

  //play the shit
  audio.currentTime = 0;
  audio.play();

  //add the effects to the btn
  note.classList.add('playing');
}
function stopAllSounds() {
  document.querySelectorAll('audio').forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}
