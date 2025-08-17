console.log('script works');

const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];
let toggleTo = true;

const deleteAllBtn = addItems.querySelector('.js-delete-all');
const toggleAllBtn = addItems.querySelector('.js-toggle-all');

function addItem(e) {
  e.preventDefault();

  const text = this.querySelector('[name="item"]').value;

  items.push({
    text,
    done: false,
  });
  saveToStorage(items);

  displayList(items, itemsList);
  this.reset();
}

function displayList(plates = [], location) {
  location.innerHTML = plates
    .map((plate, i) => {
      return `
      <li> 
        <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? 'checked' : ''
      }/> 
         <label for='item${i}'>${plate.text}</label>
      </li>
    `;
    })
    .join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) return;
  const index = e.target.dataset.index;
  items[index].done = !items[index].done;

  localStorage.setItem('items', JSON.stringify(items));
}
function deleteAll(e) {
  e.preventDefault();
  items = [];
  saveToStorage(items);
  displayList(items, itemsList);
}
function toggleAll(e) {
  e.preventDefault();
  items.forEach((el) => {
    el.done = toggleTo;
  });
  toggleTo = !toggleTo;
  displayList(items, itemsList);
}
function saveToStorage(thing) {
  localStorage.setItem('items', JSON.stringify(thing));
}
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

deleteAllBtn.addEventListener('click', deleteAll);
toggleAllBtn.addEventListener('click', toggleAll);

displayList(items, itemsList);
