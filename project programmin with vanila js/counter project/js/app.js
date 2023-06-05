// selector
const counterSection = document.querySelector("#counter");
const counterNum = document.querySelector(".counter-num");
const counterReset = document.querySelector(".counter-reset");
const counterChildList = [...counterSection.children];
let counter = 0;
// event
counterChildList.forEach((child) => {
    child.addEventListener("click", ()=> {
        if(child.classList.contains("counter-up")) {
            increment()
        } else if (child.classList.contains("counter-down")) {
            decrement()
        } else if (child.classList.contains("counter-reset")) {
            reset();
        } 
    })
})
// function
const increment = () => {
    counter++;
    counterNum.innerHTML = counter;
}

const decrement = () => {
    counter--;
    counterNum.innerHTML = counter;
}

const reset = () => {
    counter = 0;
    counterNum.innerHTML = counter;
}