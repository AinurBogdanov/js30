const hero = document.querySelector('.hero');
const walk = 1000;
const text = document.querySelector('h1');
function makeEffect(e) {
  const { offsetWidth: width, offsetHeight: height } = hero;
  let { offsetX: x, offsetY: y } = e;

  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }

  const xWalk = (x / width) * walk - walk / 2;
  const yWalk = (y / height) * walk - walk / 2;

  const hue = Math.round((x / width) * 360);
  const saturation = Math.round((y / height) * 100);

  text.style.textShadow = `
  ${xWalk}px ${yWalk}px 0 hsl(${hue}, ${saturation}%, 50%),
  ${yWalk}px ${xWalk}px 0 hsl(${hue}, ${saturation}%, 50%),
  ${-xWalk}px ${-yWalk}px 0 hsl(${hue}, ${saturation}%, 50%)
  `;
}

hero.addEventListener('mousemove', makeEffect);
