// Preloader
const preloader = document.querySelector(".preloader");
window.addEventListener("load", function () {
    preloader.style.display = "none";
})


// menu

let menu = document.querySelector(".menu")
let menuBtn = document.querySelector("header .menu-bar");
let closeBtn = document.querySelector(".menu .close-btn");

let toggleMenu = () => {
    menu.classList.toggle("show");
}

menuBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);




/////////////////////////////

////////////////////////////







let frame = document.querySelector(".frame");
let prevBtn = document.querySelector(".main #previous");
let nextBtn = document.querySelector(".main #next");
let dots = document.querySelector(".main .dots")

let imgs = [
    "imgs/img (1).jpg",
    "imgs/img (2).jpg",
    "imgs/img (3).jpg",
    "imgs/img (4).jpg"
];

// if only one img 
if (imgs.length === 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";

    dots.style.display = "none";
}

// if there is just two imgs
if (imgs.length == 2) {
    imgs += imgs
}



frame.innerHTML = imgs
    .map((imgNum, imgIndex) => {
        let img = imgNum;
        let position = 'next'
        if (imgIndex === 0) {
            position = 'current'
        }
        if (imgIndex === imgs.length - 1) {
            position = 'previous'
        }
        if (imgs.length == 1) {
            position = 'current'
        }

        let data = `<img src="imgs/img (${imgIndex + 1}).jpg" alt="" id="${imgIndex + 1}" class="${position}">`

        return data

    }).join('');


let createDots = () => {
    for (let i = 0; i < imgs.length; i++) {
        dots.innerHTML += `<div class="dot ${i + 1}">`
    }
}


createDots();

let allDot = document.querySelectorAll(".dot");

let getActive = () => {
    let current = frame.querySelector(".current");

    let CurIndex = current.id;

    for (let i = 0; i < imgs.length; i++) {
        if (allDot[i].classList.contains("active")) {
            allDot[i].classList.remove("active")
        }
    }
    allDot[CurIndex - 1].classList.add("active")
}
let activeImg = (e) => {

    let index ;
    for(let i = 1; i <= imgs.length; i++){
        if(e.currentTarget.classList.contains(`${i}`)){
            index = i;
        }
    }

    let curImg = document.getElementById(`${index}`);

    let prevImg = curImg.previousElementSibling
    if(!prevImg){
        prevImg = frame.lastElementChild
    }

    let nextImg = curImg.nextElementSibling
    if(!nextImg){
        nextImg = frame.firstElementChild
    }
    
    let frameImg = frame.querySelectorAll('img');

    frameImg.forEach((img, index) => {
        img.removeAttribute("class");
    })

    curImg.classList.add("current")
    prevImg.classList.add("previous")
    nextImg.classList.add("next");
    getActive();
}

allDot.forEach((dot, index)=>{
    dot.addEventListener("click", activeImg)
})

getActive();

const slideImg = (type) => {
    // Get all three Slides imgs [ active, last, next]
    const current = frame.querySelector('.current')
    const previous = frame.querySelector('.previous')
    let next = current.nextElementSibling
    if (!next) {
        next = frame.firstElementChild
    }

    current.classList.remove('current')
    previous.classList.remove('previous')
    next.classList.remove('next')

    if (type === 'prev') {
        current.classList.add('next')
        previous.classList.add('current')
        next = previous.previousElementSibling

        if (!next) {
            next = frame.lastElementChild
        }

        next.classList.remove('next')
        next.classList.add('previous')

        getActive();
        return
    }

    current.classList.add('previous')
    previous.classList.add('next')
    next.classList.add('current')

    getActive();

}


nextBtn.addEventListener('click', function () {
    slideImg();
})
prevBtn.addEventListener('click', function () {
    slideImg('prev');
}

)
