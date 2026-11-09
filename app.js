const tabContent = {
  home: {title:'Home', description:'Everything, in one place.'},
  messages: {title:'Messages', description:'Three unread. All of them polite.'},
  files: {title:'Files', description:'A tidy home for your work.'},
  alerts: {title:'Notifications', description:'Nothing important gets missed.'},
  profile: {title:'Profile', description:'You, as the system sees you.'}
};

const tabs = [...document.querySelectorAll('.nav-item')];
const bump = document.getElementById('activeBump');
const title = document.getElementById('pageTitle');
const description = document.getElementById('pageDescription');
let activeIndex = 0;

function selectTab(tab, index) {
  activeIndex = index;
  tabs.forEach((item, i) => {
    const active = i === index;
    item.classList.toggle('active', active);
    if (active) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
  });

  // Move the liquid lip under the selected icon.
  bump.style.transform = `translateX(${index * 100}%)`;
  const content = tabContent[tab.dataset.tab];
  title.textContent = content.title;
  description.textContent = content.description;
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab, index));
});

document.querySelectorAll('[data-theme-choice]').forEach(dot => {
  dot.addEventListener('click', () => {
    const theme = dot.dataset.themeChoice;
    document.body.dataset.theme = theme;
    document.querySelectorAll('[data-theme-choice]').forEach(item => {
      item.classList.toggle('selected', item === dot);
    });
  });
});

// Keep the active marker aligned if the nav resizes.
window.addEventListener('resize', () => {
  bump.style.transform = `translateX(${activeIndex * 100}%)`;
});
