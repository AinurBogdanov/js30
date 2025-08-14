const panels = document.querySelectorAll('.panel');
let isAnimating = false;
panels.forEach((panel) => {
  panel.addEventListener('click', toggleOpen);
  panel.addEventListener('transitionend', toggleActive);
});

function toggleOpen() {
  if (isAnimating) return;

  this.classList.toggle('open');
  isAnimating = true;

  setTimeout(() => (isAnimating = false), 1000);
}

function toggleActive(e) {
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
  }
}
