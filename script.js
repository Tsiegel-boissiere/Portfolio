const desktop = document.getElementById('desktop');
const items = document.querySelectorAll('.item');


function unselectAll() {
  items.forEach((item) => item.classList.remove('item-selected'));
}
//selectionne des objets !
function selectItem(item) {
  unselectAll();
  item.classList.add('item-selected');
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

desktop.addEventListener('click', (event) => {
  if (!event.target.closest('.item')) {
    unselectAll();
  }
});

const clock = document.querySelector('.clock');

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  clock.textContent = `${hours}:${minutes}`;
}

updateClock();
setInterval(updateClock, 1000);

const menus = document.querySelectorAll('.menu');

function closeAllMenus() {
  menus.forEach((menu) => menu.classList.remove('open'));
}

menus.forEach((menu) => {
  const button = menu.querySelector('.button-menu');
  button.addEventListener('click', (event) => {
    event.stopPropagation();           // évite que le clic atteigne le document
    const wasOpen = menu.classList.contains('open');
    closeAllMenus();
    if (!wasOpen) menu.classList.add('open');
  });
});

// Clic ailleurs : tout fermer
document.addEventListener('click', closeAllMenus);
