const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondsDeg = (360 / 60) * seconds + 90;
  const minutesDeg = (360 / 60) * minutes + 90;
  const hoursDeg = (360 / 12) * hours + 90;

  secondHand.style.transform = `rotate(${secondsDeg}deg)`;
  minuteHand.style.transform = `rotate(${minutesDeg}deg)`;
  hourHand.style.transform = `rotate(${hoursDeg}deg)`;

  console.log(seconds, minutes, hours);
}

setInterval(setDate, 1000);
//////
