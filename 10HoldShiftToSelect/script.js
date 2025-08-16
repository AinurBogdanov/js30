let selectedBoxes = [];

const checkboxes = document.querySelectorAll('input');

checkboxes.forEach((box) => {
  box.addEventListener('click', select);
});

function select(e) {
  if (!e.shiftKey) {
    selectedBoxes = [];
    return;
  }

  selectedBoxes.push(e.target.dataset.input);

  if (selectedBoxes.length > 1) {
    selectedBoxes.sort((a, b) => a - b);

    const first = Number(selectedBoxes[0]);
    const last = Number(selectedBoxes[selectedBoxes.length - 1]);
    const inputsToCheck = last - first - 1;

    for (let i = 1; inputsToCheck >= i; i++) {
      checkboxes[first + i].checked = true;
      console.log(checkboxes[first + i]);
    }
  }
}
//[
//     "2",
//     "4",

//     "6",
//     "7",
//     "8"
// ]
