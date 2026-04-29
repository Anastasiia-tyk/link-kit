/* 3. Spotlight — промінь слідує за курсором миші */
const spotCard = document.getElementById('spotCard');

spotCard.addEventListener('mousemove', function (e) {
  const rect = spotCard.getBoundingClientRect();
  spotCard.style.setProperty('--x', (e.clientX - rect.left) + 'px');
  spotCard.style.setProperty('--y', (e.clientY - rect.top)  + 'px');
});

/* 12. Ripple — кола розходяться при кліку */
const rippleCard = document.getElementById('rippleCard');

rippleCard.addEventListener('click', function (e) {
  const rect = rippleCard.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  const circle = document.createElement('span');
  circle.className = 'ripple-circle';
  circle.style.width  = size + 'px';
  circle.style.height = size + 'px';
  circle.style.left   = (e.clientX - rect.left - size / 2) + 'px';
  circle.style.top    = (e.clientY - rect.top  - size / 2) + 'px';

  rippleCard.appendChild(circle);

  circle.addEventListener('animationend', function () {
    circle.remove();
  });
});