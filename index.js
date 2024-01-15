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


let timerId = setInterval(incrementSlide, 15000)
