document.addEventListener('DOMContentLoaded', (event) => {

  // DRAG MOVER CARDS
  var dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = '0.1';
    this.style.border = '3px dashed #c4cad3';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move'; S

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('task-hover');
  }

  function handleDragLeave(e) {
    this.classList.remove('task-hover');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    const columnaObjetivo = e.target.closest('.project-column');
    const tarea = dragSrcEl;

    if (columnaObjetivo && tarea) {
      // Obtiene el primer elemento de la columna objetivo
      const primerElemento = columnaObjetivo.firstChild;

      // Inserta la tarea antes del primer elemento
      columnaObjetivo.insertBefore(tarea, primerElemento);

      // Restablece el estilo de la tarea
      tarea.style.opacity = '1';
      tarea.style.border = '';

      // Vuelve a agregar los eventos a las tareas
      let items = document.querySelectorAll('.task');
      items.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
      });
    }

    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    this.style.border = 0;

    items.forEach(function (item) {
      item.classList.remove('task-hover');
    });
  }


  let items = document.querySelectorAll('.task');
  items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });


  const fechaActual = new Date();
  const dia = fechaActual.getDate().toString().padStart(2, '0');
  const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
  const año = fechaActual.getFullYear();

  document.getElementById('fecha-actual').setAttribute('datetime', `${año}-${mes}-${dia}T00:00:00`);
  document.getElementById('fecha-actual').textContent = `${mes}/${dia}/${año}`;



});




// Obtiene el formulario y el contenedor para las nuevas tareas
const formulario = document.getElementById('agregar-tarea-form');
const nuevasTareas = document.getElementById('nuevas-tareas');

// Agrega un evento de submit al formulario
formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  // Obtiene los valores de los campos del formulario
  const titulo = document.getElementById('tarea-titulo').value;
  const descripcion = document.getElementById('tarea-descripcion').value;
  const etiqueta = document.getElementById('tarea-etiqueta').value;
  const fechaEntrega = document.getElementById('tarea-fecha-entrega').value;

  // Asigna una clase CSS según la etiqueta seleccionada
  let claseEtiqueta;
  switch (etiqueta) {
    case 'FrontEnd':
      claseEtiqueta = 'frontend';
      break;
    case 'BackEnd':
      claseEtiqueta = 'backend';
      break;
    case 'Requirements':
      claseEtiqueta = 'req';
      break;
    default:
      claseEtiqueta = '';
  }

  // Crea una nueva tarea
  const nuevaTarea = `
  <div class='task' draggable='true'>
    <div class='task__tags'><span class='task__tag task__tag--${claseEtiqueta}'>${etiqueta}</span><button class='task__options'><i class="fas fa-ellipsis-h"></i></button></div>
    <button class='task__delete'>X<i class="fas fa-trash-alt"></i></button> <!-- Botón de eliminar -->
    <p>${descripcion}</p>
    <div class='task__stats'>
      <span><i class="fas fa-flag"></i>${fechaEntrega}</span>
      <span class='task__owner'></span>
    </div>
  </div>
`;

  // Agrega la nueva tarea al contenedor
  nuevasTareas.innerHTML += nuevaTarea;

  // Guarda la tarea en Local Storage
  const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
  tareasGuardadas.push({
    titulo,
    descripcion,
    etiqueta,
    fechaEntrega,
    claseEtiqueta
  });
  localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));

  // Limpia el formulario
  formulario.reset();
});


// Función para eliminar una tarea
function eliminarTarea(e) {
  // Preguntar antes de eliminar
  if (confirm = true) {
    // Obtiene la tarea que se quiere eliminar
    const tareaEliminar = e.target.closest('.task');

    // Elimina la tarea del DOM
    tareaEliminar.remove();

    // Obtiene las tareas guardadas en Local Storage
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];

    // Encuentra la tarea que se quiere eliminar en el arreglo de tareas guardadas
    const indiceTareaEliminar = tareasGuardadas.findIndex(tarea => {
      return tarea.descripcion === tareaEliminar.querySelector('p').textContent;
    });

    // Elimina la tarea del arreglo de tareas guardadas
    tareasGuardadas.splice(indiceTareaEliminar, 1);

    // Guarda el arreglo actualizado de tareas en Local Storage
    localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));

    // Muestra un mensaje personalizado
    const mensajeEliminar = `Tarea  eliminada con éxito.`;
    const toast = document.createElement('div');
    toast.textContent = mensajeEliminar;
    toast.className = 'toast';
    document.body.appendChild(toast);

    // Elimina el mensaje después de 3 segundos
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}

// Agrega evento de clic al botón de eliminar
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('task__delete')) {
    eliminarTarea(e);
  }
});


//JS MODAL

// Obtiene el modal y el botón para abrirlo
const modal = document.getElementById('modal-agregar-tarea');
const botonAbrirModal = document.querySelector('.project-participants__add');

// Función para abrir el modal
function abrirModal() {
  modal.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
  modal.style.display = 'none';
}

// Agrega evento de clic al botón para abrir el modal
botonAbrirModal.addEventListener('click', abrirModal);

// Agrega evento de clic al botón de cierre para cerrar el modal
document.getElementById('boton-cerrar-modal').addEventListener('click', cerrarModal);

// Cierra el modal cuando se hace clic fuera de él
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    cerrarModal();
  }
});










