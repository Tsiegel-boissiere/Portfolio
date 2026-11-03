const desktop = document.getElementById('desktop');
const items = document.querySelectorAll('.item');


function unselectAll() {
  items.forEach((item) => item.classList.remove('selected'));
}
//selectionne des objets !
function selectItem(item) {
  unselectAll();
  item.classList.add('selected');
}

function openItem(item) {
  console.log('Ouvrir :', item.dataset.window);
}

function closeItem(item) {
  console.log('Fermer :', item.dataset.window);
}

items.forEach((item) => {
  item.addEventListener('click', () => selectItem(item));
  item.addEventListener('dblclick', () => openItem(item));
});

deskttop.addEventListener('click', (event) => {
  if (!event.target.closest('.item')) {
    unselectAll();
  }
});

const clck = document.getelementbyid('clock');

function updateClock() {
const now = new date();
const minutes = string(now.getminutes()).padstart(2, '0');
clck.textcontent = now.gethours() + ':' + minutes;
}

updateClock();
setInterval(updateClock, 1000);



