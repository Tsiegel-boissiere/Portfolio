const desktop = document.getElementById('desktop');
const items = document.querySelectorAll('.item');
const windows = document.querySelectorAll('.window');
const clock = document.querySelector('.clock');
let topZ = 10;

function unselectAll() {
  items.forEach((item) => item.classList.remove('item-selected'));
}

function selectItem(item) {
  unselectAll();
  item.classList.add('item-selected');
}

function focusWindow(windowElement) {
  windows.forEach((item) => item.classList.add('unfocused'));
  windowElement.classList.remove('unfocused');
  topZ += 1;
  windowElement.style.zIndex = topZ;
}

function openWindow(id) {
  const windowElement = document.getElementById(id);
  if (!windowElement || !windowElement.matches('.window')) return;

  windowElement.classList.add('open');
  focusWindow(windowElement);
}

function closeWindow(windowElement) {
  windowElement.classList.remove('open');
}

items.forEach((item) => {
  item.addEventListener('click', () => selectItem(item));
  item.addEventListener('dblclick', () => openWindow(item.dataset.window));
});

desktop.addEventListener('click', (event) => {
  if (!event.target.closest('.item')) {
    unselectAll();
  }
});

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
    event.stopPropagation();
    const wasOpen = menu.classList.contains('open');
    closeAllMenus();
    if (!wasOpen) menu.classList.add('open');
  });
});

document.addEventListener('click', closeAllMenus);

windows.forEach((windowElement) => {
  windowElement.addEventListener('pointerdown', () => focusWindow(windowElement));

  const closeButton = windowElement.querySelector('.close-button');
  if (closeButton) {
    closeButton.addEventListener('click', () => closeWindow(windowElement));
  }

  const titlebar = windowElement.querySelector('.titlebar');
  if (!titlebar) return;

  let offsetX = 0;
  let offsetY = 0;

  function onMove(event) {
    const bounds = desktop.getBoundingClientRect();
    const maxLeft = Math.max(bounds.left, bounds.right - windowElement.offsetWidth);
    const maxTop = Math.max(bounds.top, bounds.bottom - windowElement.offsetHeight);
    const left = Math.max(bounds.left, Math.min(event.clientX - offsetX, maxLeft));
    const top = Math.max(bounds.top, Math.min(event.clientY - offsetY, maxTop));
    windowElement.style.left = `${left}px`;
    windowElement.style.top = `${top}px`;
  }

  function stopDragging(event) {
    if (titlebar.hasPointerCapture(event.pointerId)) {
      titlebar.releasePointerCapture(event.pointerId);
    }
    titlebar.removeEventListener('pointermove', onMove);
    titlebar.removeEventListener('pointerup', stopDragging);
    titlebar.removeEventListener('pointercancel', stopDragging);
  }

  titlebar.addEventListener('pointerdown', (event) => {
    if (event.target.closest('.close-button')) return;

    const bounds = windowElement.getBoundingClientRect();
    offsetX = event.clientX - bounds.left;
    offsetY = event.clientY - bounds.top;
    titlebar.setPointerCapture(event.pointerId);
    titlebar.addEventListener('pointermove', onMove);
    titlebar.addEventListener('pointerup', stopDragging);
    titlebar.addEventListener('pointercancel', stopDragging);
  });
});
