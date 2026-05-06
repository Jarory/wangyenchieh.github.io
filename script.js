// ── 回到頂部 ──
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── 輪播邏輯 ──
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track   = carousel.querySelector('.carousel-track');
  const images  = Array.from(track.querySelectorAll('img'));
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const dotsWrap   = carousel.querySelector('.carousel-dots');
  const counterWrap = carousel.querySelector('.carousel-counter');

  let current = 0;
  let autoTimer = null;

  // ── 建立指示點 ──
  images.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.querySelectorAll('.dot'));

  // ── 切換到第 n 張 ──
  function goTo(n) {
    images[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = (n + images.length) % images.length;

    images[current].classList.add('active');
    dots[current].classList.add('active');
    counterWrap.textContent = (current + 1) + ' / ' + images.length;
  }

  // ── 初始化計數 ──
  counterWrap.textContent = '1 / ' + images.length;

  // ── 按鈕事件 ──
  prevBtn.addEventListener('click', () => {
    goTo(current - 1);
    resetAuto();
  });

  nextBtn.addEventListener('click', () => {
    goTo(current + 1);
    resetAuto();
  });

  // ── 自動播放（4 秒） ──
  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  // ── 滑鼠移入暫停 ──
  carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
  carousel.addEventListener('mouseleave', () => startAuto());

  startAuto();
});

function openGame(url) {
  window.open(url, "_blank", "width=900,height=700");
}

function toggleMenu(){
  document.querySelector(".nav-links").classList.toggle("active");
}

document.querySelectorAll(".nav-links a").forEach(link=>{
  link.addEventListener("click",()=>{
    document.querySelector(".nav-links").classList.remove("active");
  });
});