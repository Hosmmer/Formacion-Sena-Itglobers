//agregar y eliminar eventos en nuestro html

const container = document.querySelector(".container");
const button = document.querySelector("button");

container.addEventListener("mouseover", () => {
  container.style.backgroundColor = "blue";
});

container.addEventListener("mouseout", () => {
  container.style.backgroundColor = "rgba(155, 155, 155, 0.22)";
});

// button.addEventListener("click", () => {
//   alert("Button Clicked");
//   container.style.color = "pink";
// });
const buttonClickCallback = () => {
  alert("Button Clicked");
  container.style.color = "pink";
};

//Asignar evento desde una funcion
button.addEventListener("click", (buttonClickCallback));



setTimeout(() => {
  container.style.color = "initial";
  button.removeEventListener("click", buttonClickCallback);
}, 5000);