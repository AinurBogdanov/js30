function debounce(func, wait = 10, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function checkSlide() {
  //find how far we have scrolled from the top of the window to the bottom of the screen
  sliderImages.forEach((sliderImage) => {
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2;

    const imageBottom = sliderImage.offsetTop + sliderImage.height;

    const isPiking = slideInAt > sliderImage.offsetTop;

    const isScrolledPast = window.scrollY > imageBottom;

    if (isPiking && !isScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

const sliderImages = document.querySelectorAll('.slide-in');

window.addEventListener('scroll', debounce(checkSlide));
