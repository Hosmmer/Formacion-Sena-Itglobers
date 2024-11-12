//Crear Elemento
const newPElement = document.createElement("p");
//Agregarle contenido a la etiqueta P
newPElement.textContent = "Nuevo Contenido con createElement";
//seleccionar el contenedor donde se va renderizar el elemento
const contentArea = document.getElementById("contentArea");
//necesitamos inyectar el elemento que creamos al contenedor padre
contentArea.append(newPElement);

//Propiedades Creacion de elementos

const newItem = document.createElement("li");

newItem.textContent = "item 5";

const listArea = document.getElementById("listArea");
// listArea.prepend(newItem);
// Crear Elemento Antes listArea.after(newItem);
// Crear Elemento Despues listArea.before(newItem);

//Remover Elementos con Remove() y removeChild()

const firstItem = document.querySelector("li");

firstItem.remove();

//Remover Elemento Hijo de un contenedor padre
const list = document.querySelector("ul");
list.removeChild(list.firstElementChild);

 