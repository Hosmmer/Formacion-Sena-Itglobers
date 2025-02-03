//clonar los elemementos del HTML

const contentArea = document.querySelector('#contentArea');

const orginalP = contentArea.querySelector("p");

const clonedP = orginalP.cloneNode(true);
//inyectar el clon del elemento P en el contenedor padre

contentArea.append(clonedP);
clonedP.textContent = "Este es un elemento clonado p";

//Remplazar el contenido que tenga ese elemento por un nuevo elemento

const list = document.getElementById("listArea");

const itemToReplace = listArea.children[2];

itemToReplace.replaceWith(clonedP);