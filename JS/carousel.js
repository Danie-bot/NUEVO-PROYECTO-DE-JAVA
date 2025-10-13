const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if(items.length > 0){
  let currentIndex = 0;

  const setItemWidth = () => {
    const carousel = document.querySelector('.carousel');
    const width = carousel.offsetWidth;
    items.forEach(item => {
      item.style.minWidth = width + 'px';
      item.style.boxSizing = 'border-box';
    });
    moveToSlide(currentIndex);
  };

  window.addEventListener('resize', setItemWidth);
  window.addEventListener('load', setItemWidth);

  const moveToSlide = index => {
    const width = items[0].offsetWidth;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${width * index}px)`;
  };

  prevBtn.addEventListener('click', () => {
    currentIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    moveToSlide(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    moveToSlide(currentIndex);
  });

  // Autoplay cada 5 segundos
  setInterval(() => { nextBtn.click(); }, 5000);
}
