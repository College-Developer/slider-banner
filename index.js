const mySliders = document.querySelectorAll(".mySlider");
const leftBtn = document.querySelector(".sliderBtn-left");
const rightBtn = document.querySelector(".sliderBtn-right");
// console.log(mySliders.length);

let counter = 0 % mySliders.length;
// console.log(counter);


rightBtn.addEventListener("click", incrementSlide);
leftBtn.addEventListener("click", decrementSlide);


function incrementSlide(){
    counter = (counter + 1) % mySliders.length;
    // console.log(counter)
    mySliders.forEach((slide) => {
        slide.classList.remove("active");
    })
    mySliders[counter].classList.add("active");
    mySliders[counter].classList.add("clip-effect");
    resetTimer();
}

function decrementSlide(){
    counter = (counter <= 0) ? 2 : (counter - 1);
    // console.log(counter);
    mySliders.forEach((slide) => {
        slide.classList.remove("active");
    })
    mySliders[counter].classList.add("active");
    resetTimer();
}

function resetTimer(){
    clearInterval(timerId);
    // console.log(timerId);
    timerId = setInterval(incrementSlide, 15000);
    // console.log(timerId);
}

let timerId = setInterval(incrementSlide, 15000);

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$ card Slider ######################

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".nav-btn");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];
// console.log(carousel.children)
console.log(carouselChildrens);
// console.log(arrowBtns);
// console.log(firstCardWidth);
let isDragging = false, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth) 

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

function dragStart(e) {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

function dragging(e) {
    if(!isDragging) return;
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}


function infiniteScroll() {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }// If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    if(!wrapper.matches(":hover")) autoPlay();
}

function autoPlay() {
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => {
        carousel.scrollLeft += firstCardWidth
    }, 2500);
}

autoPlay();

arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        scrollValue = btn.id === "left" ? -firstCardWidth : firstCardWidth;
        // console.log(scrollValue);
        // console.log(carousel.scrollLeft);
        carousel.scrollLeft += scrollValue;
        // console.log(carousel.scrollLeft);
    })
})

carousel.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
