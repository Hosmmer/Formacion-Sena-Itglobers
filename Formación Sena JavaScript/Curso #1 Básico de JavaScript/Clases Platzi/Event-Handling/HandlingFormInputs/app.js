//Manejo de entradas de formulario y validación

const form = document.getElementById('myForm');


form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.elements["name"].value;
  const correo = form.elements["email"].value;
  console.log({ name, correo });
});