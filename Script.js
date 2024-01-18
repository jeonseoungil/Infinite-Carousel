let slides = document.querySelector(".slides");
let slide = document.querySelectorAll(".slides li");

let currentIndex = 0;
let slidesCount = slide.length;
let slidesWidth = 200;
let slidesMargin = 30; // 수정: 마진을 30px로 조정
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");

makeClone();
autoSlide()
autoProgressBar();
updateProgressBar();

function makeClone() {
  for (let i = 0; i < slidesCount; i++) {
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.appendChild(cloneSlide);
  }
  for (let i = slidesCount-1; i >= 0; i--) {
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.prepend(cloneSlide);
  }
  updateWidth();
  setInitialPos();
  setTimeout(function(){
    slides.classList.add('animated')
  },100)
}

function updateWidth() {
  let currentSlides = document.querySelectorAll(".slides li");
  let newslideCount = currentSlides.length 

  let newWidth = (slidesWidth + slidesMargin) * newslideCount -slidesMargin +"px";
  slides.style.width = newWidth;
}

function setInitialPos() {
  let initialTranslateValue = -(slidesWidth + slidesMargin) * slidesCount;
  slides.style.transform = "translateX(" + initialTranslateValue + "px)";
}

prev.addEventListener("click", e => {
  moveSlide(currentIndex - 1);
  resetProgressBar()
});

next.addEventListener("click", e => {
  moveSlide(currentIndex + 1);
  resetProgressBar()
});

function moveSlide(num) {
  slides.style.left=-num*(slidesWidth + slidesMargin)+'px'
  currentIndex = num;


  if (currentIndex == slidesCount || currentIndex == -slidesCount) {
setTimeout(function () {
slides.classList.remove("animated");
slides.style.left = "0px";
currentIndex = 0;
}, 500);
setTimeout(function () {
slides.classList.add("animated");
}, 600);
}
}
function autoSlide() {
  setInterval(function() {
    moveSlide(currentIndex + 1);
  }, 3000); 
}

function updateProgressBar() {
let progressBar = document.querySelector(".back");
progressBar.classList.remove("animation"); // 애니메이션 클래스 제거
requestAnimationFrame(() => {
progressBar.offsetWidth;
progressBar.classList.add("animation"); // 애니메이션 클래스 추가
});
}

function autoProgressBar() {
  setInterval(function() {
    updateProgressBar();
  }, 3000); // 3초마다 업데이트
}
function resetProgressBar() {
let progressBar = document.querySelector(".back");
progressBar.classList.remove("animation"); // 애니메이션 클래스 제거
progressBar.style.width = "0%"; // 프로그래스바 너비를 0%로 초기화

// requestAnimationFrame을 사용하여 업데이트
requestAnimationFrame(() => {
progressBar.offsetWidth;
progressBar.classList.add("animation"); // 애니메이션 클래스 추가
});
}