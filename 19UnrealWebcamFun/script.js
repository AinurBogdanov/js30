const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      console.error('ohh shit!', err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    //get the data out of the page
    let pixels = ctx.getImageData(0, 0, width, height);
    // mess with the data of the image
    // pixels = rgbSplit(pixels);
    rgbSplit(pixels);

    // ctx.globalAlpha = 0.1;

    ctx.putImageData(pixels, 0, 0);
  }, 100);
}

function takePhoto() {
  // play the sound
  snap.currentTime = 0;
  snap.play();
  //take the data out the canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome">`;
  strip.insertBefore(link, strip.firstChild);
}
// event that is signaling that the video ready to be played
video.addEventListener('canplay', paintToCanvas);

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; //r
    pixels.data[i + 1] = pixels.data[i + 1] - 50; //g
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //b
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  //for loop with the increment = 4 (one pixel)
  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    // check if pixels out of the range
    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

function rgbSplit(pixels) {
  const data = pixels.data;
  for (let i = 0; i < data.length; i += 4) {
    // Усиливаем только зелёный канал (G)
    data[i] = data[i] * 1; // R: уменьшаем красный
    data[i + 1] = data[i + 1] * 1; // G: усиливаем зелёный (150%)
    data[i + 2] = data[i + 2] * 0.2; // B: уменьшаем синий
  }
  return pixels;
}

getVideo();
