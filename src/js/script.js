const openAndCloseMenu = () => {
  const menu = document.querySelector('.nav');
  const btnClose = document.querySelector('.nav__close');
  const btnOpen = document.querySelector('.btn-open-menu');
  const secondsTransitionOfMenu = parseInt(getComputedStyle(menu).transition.match(/\d+/));
  const search = document.querySelector('.nav__search');
  const items = document.querySelectorAll('.nav__foods-item');

  let touch = false;

  btnOpen.addEventListener('click', openMenu);
  btnClose.addEventListener('click', closeMenu);

  // Move
  window.addEventListener('mousemove', e => moveOnTheScreen(e.clientX));
  window.addEventListener('touchmove', e => moveOnTheScreen(e.touches[0].clientX));

  // Touch start
  window.addEventListener('mouseup', disconnectFromTheScreen);
  window.addEventListener('touchend', disconnectFromTheScreen);
  
  // Touch end
  window.addEventListener('mousedown', e => connectToTheScreen(e.clientX));
  window.addEventListener('touchstart', e => connectToTheScreen(e.touches[0].clientX));

  function moveOnTheScreen(x) {
    if (touch) {
      checkCoordinates(x);

      menu.style.transition = '0s';
    }
  }

  function connectToTheScreen(x) {
    touch = x <= 10 && true
  }

  function disconnectFromTheScreen() {
    const x = menu.style.transform.match(/\d+/) ? parseInt(menu.style.transform.match(/\d+/)[0]) : 0;
    
    if (x >= 50 && x <= 100) {
      closeMenu();
    } else if (x < 50 && x > 0) {
      openMenu();
    }

    touch = false;

    menu.style.transition = `transform ${secondsTransitionOfMenu}s`;
  }

  function checkCoordinates(x) {
    if (x <= menu.offsetWidth) {
      const distance = Math.round(((menu.offsetWidth - x) / menu.offsetWidth) * 100);
      menu.style.transform = `translateX(-${distance}%)`;
    } else {
      openMenu();
    }
  }

  function closeMenu() {
    menu.style.transform = 'translateX(-110%)';
    btnOpen.classList.remove('hide-down');

    search.value = '';
    items.forEach(item => item.style.display = 'flex');
  }

  function openMenu() {
    menu.style.transform = 'translateX(0%)';
    btnOpen.classList.add('hide-down');
  }
}

openAndCloseMenu();

const searchFood = () => {
  const search = document.querySelector('.nav__search');
  const items = document.querySelectorAll('.nav__foods-item');
  
  search.addEventListener('input', () => {
    const valSearch = search.value.trim().toLowerCase();

    items.forEach(item => {
      if (valSearch.length > 2) {
        if (item.dataset.foodName.trim().toLowerCase().search(valSearch) !== -1) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      } else {
        item.style.display = 'flex';
      }
    });
  });
}

searchFood();