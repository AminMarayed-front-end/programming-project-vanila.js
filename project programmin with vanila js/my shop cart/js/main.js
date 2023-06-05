import { productsData } from "./product.js";
// selectors
const navShopBtn = document.querySelector(".nav-shop");
const backdrop = document.querySelector(".backdrop");
const cartModal = document.querySelector(".cart-modal");
const productDOM = document.querySelector(".carts");
const totalPriceDOM = document.querySelector(".total-price");
const totalCartDOM = document.querySelector(".number-cart");
const cartContent = document.querySelector(".cart-content");
const clearBtn = document.querySelector(".clear-modal");
const navBurger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
// event
navShopBtn.addEventListener("click", showCartModal);
window.addEventListener("click", closeConfirmModal);
navBurger.addEventListener("click", displayMobileMenu);
// function
function showCartModal() {
  backdrop.style.display = "block";
  cartModal.style.opacity = "1";
  cartModal.style.transform = "translate(0, 10rem)";
}

function closeConfirmModal(e) {
  if (
    e.target.classList[0] === "clear-modal" ||
    e.target.classList[0] === "backdrop"
  ) {
    backdrop.style.display = "none";
    cartModal.style.opacity = "0";
    cartModal.style.transform = "translate(0, -50rem)";
  } else if (e.target.classList[0] === "confirm-modal") {
    backdrop.style.display = "none";
    cartModal.style.opacity = "0";
    cartModal.style.transform = "translate(0, -50rem)";
    alert("کارت شما با موفقیت ثبت شد");
  }
}

function displayMobileMenu() {
  navBurger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// get products
class Products {
  getProducts() {
    return productsData;
  }
}

let carts = [];
let buttonsDom = [];

// display products
class Ui {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `<div class="cart">
      <div class="cart__img">
        <img src=${product.imageUrl} alt="" />
      </div>
      <div class="cart__detail">
        <span class="cart__price">${product.price}</span>
        <div class="cart__name">${product.name}</div>
      </div>
      <button class="add__cart" data-id=${product.id}>اضافه کردن اتاق</button>
    </div>`;
      productDOM.innerHTML = result;
    });
  }
  getAddToCartBtn() {
    // const cartBtn = document.querySelectorAll(".add__cart");
    // const cartBtnArr = [...cartBtn];
    const addtoCartBtn = [...document.querySelectorAll(".add__cart")];
    buttonsDom = addtoCartBtn;
    addtoCartBtn.forEach((btn) => {
      const id = btn.dataset.id;
      const isInCarts = carts.find((p) => p.id === parseInt(id));
      if (isInCarts) {
        btn.innerText = "اتاق اضافه شد";
        btn.disabled = true;
      }
      btn.addEventListener("click", (event) => {
        event.target.innerText = "اتاق اضافه شد";
        event.target.disabled = true;
        // get product from products?
        const addProduct = { ...Storage.getProduct(id), quantity: 1 };
        // add to cart?
        carts = [...carts, addProduct];
        // save local?
        Storage.saveCarts(carts);
        //update cart value
        this.setCartValue(carts);
        //add to cart item
        this.addCartItem(addProduct);
        // save cart item
      });
    });
  }
  setCartValue(carts) {
    let totalCart = 0;
    const totalPrice = carts.reduce((acc, curr) => {
      totalCart += curr.quantity;
      return acc + curr.price * curr.quantity;
    }, 0);
    totalPriceDOM.innerText = `مجموع قیمت : ${totalPrice} ریال`;
    totalCartDOM.innerText = totalCart;
  }
  addCartItem(cartItem) {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart__item");
    cartItemDiv.innerHTML = `<img src=${cartItem.imageUrl} alt="">
    <span class="item__detail">
      <span class="item__name">${cartItem.name}</span>
      <span class="item__price">${cartItem.price} ریال</span>
    </span>
    <span class="item__control">
      <i class="fas fa-chevron-up" data-id=${cartItem.id}></i>
      <span class="item__num">${cartItem.quantity}</span>
      <i class="fas fa-chevron-down" data-id=${cartItem.id}></i>
    </span>
    <i class="fa-solid fa-trash" data-id=${cartItem.id}></i>`;
    cartContent.appendChild(cartItemDiv);
  }
  setupApp() {
    // get cart from storage
    carts = Storage.getCarts() || [];
    // cartItem
    carts.forEach((cartItem) => this.addCartItem(cartItem));
    // cartValue
    this.setCartValue(carts);
  }
  cartLogic() {
    // clear button
    clearBtn.addEventListener("click", () => this.clearCart());
    // clear button item
    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("fa-trash")) {
        // update setCartValue
        this.removeItem(parseInt(event.target.dataset.id));
        // update cartItem
        event.target.parentElement.remove();
      }
      if(event.target.classList.contains("fa-chevron-up")) {
        const addQuantity = event.target;
        // get item from cart
        const addItem = carts.find((cart) => cart.id == addQuantity.dataset.id);
        // update cart value
        addItem.quantity++;
        this.setCartValue(carts);
        // save cart
        Storage.saveCarts(carts);
        // update cartContent in UI:
        addQuantity.nextElementSibling.innerText = addItem.quantity;
      }
      if(event.target.classList.contains("fa-chevron-down")) {
        const subQuantity = event.target;
        const subItem = carts.find((cart) => cart.id == subQuantity.dataset.id);
        if (subItem.quantity >= 2) subItem.quantity--;
        this.setCartValue(carts);
        Storage.saveCarts(carts);
        subQuantity.previousElementSibling.innerText = subItem.quantity;
      }
    });
  }
  clearCart() {
    carts.forEach((cart) => this.removeItem(cart.id));
    while (cartContent.children.length) {
      cartContent.removeChild(cartContent.children[0]);
    }
  }
  removeItem(id) {
    // update carts
    carts = carts.filter((cart) => cart.id !== id);
    // update totalCart and totalPrice
    this.setCartValue(carts);
    // save carts in local storage
    Storage.saveCarts(carts);
    //
    this.getSingleBtn(id);
  }
  getSingleBtn(id) {
    const button = buttonsDom.find(
      (btn) => parseInt(btn.dataset.id) === parseInt(id)
    );
    button.innerText = "اضافه کردن اتاق";
    button.disabled = false;
  }
}

class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProduct(id) {
    const _products = JSON.parse(localStorage.getItem("products"));
    return _products.find((p) => p.id === parseInt(id));
  }

  static saveCarts(carts) {
    localStorage.setItem("carts", JSON.stringify(carts));
  }

  static getCarts() {
    return JSON.parse(localStorage.getItem("carts"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new Ui();
  const products = new Products();
  const productsData = products.getProducts();

  ui.displayProducts(productsData);
  ui.getAddToCartBtn();
  ui.setupApp();
  ui.cartLogic();
  Storage.saveProducts(productsData);
});


