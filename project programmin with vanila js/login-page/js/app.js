// selector 
const loginBtn = document.querySelector(".login__btn");
const inputEmail = document.querySelector("#login__email");
const inputPass = document.querySelector("#login__password");
const loginForm = document.querySelector(".login");

// event
loginBtn.addEventListener("click", loginFunc)

// function
function loginFunc(e) {
    e.preventDefault();

    if (inputEmail.value == "aminmarayed4@gmail.com" && inputPass.value == 123) {
        loginForm.action = "../index.html";
        
    }

    
}