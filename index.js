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

const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".nav-btn");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
console.log(arrowBtns);
console.log(firstCardWidth);
let isDragging = false, startX, startScrollLeft;



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

arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        scrollValue = btn.id === "left" ? -firstCardWidth : firstCardWidth;
        console.log(scrollValue);
        console.log(carousel.scrollLeft);
        carousel.scrollLeft += scrollValue;
        console.log(carousel.scrollLeft);
    })
})

carousel.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("mousemove", dragging);
