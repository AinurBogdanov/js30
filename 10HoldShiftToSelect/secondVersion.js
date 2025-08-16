let lastChecked;

const checkboxes = document.querySelectorAll('input');

checkboxes.forEach((box) => {
  box.addEventListener('click', select);
});

function select(e) {
  let inBetween = false;

  if (e.shiftKey && this.checked) {
    checkboxes.forEach((box) => {
      if (box === this || box === lastChecked) {
        inBetween = !inBetween;
      }
      //lastChecked - undefined
      if (box === this && !lastChecked) {
        inBetween = false;
      }
      if (inBetween) {
        box.checked = true;
      }
    });
  }

  lastChecked = this;
}
