let tareas = [];

// Cargar tareas desde JSON al iniciar la aplicación
function cargarTareasDesdeJSON() {
    const tareasJSON = localStorage.getItem("tareas");
    if (tareasJSON) {
        tareas = JSON.parse(tareasJSON);
        mostrarTareas();
    }
}

// Guardar tareas en JSON - localStorage
function guardarTareasEnJSON() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Función para mostrar las tareas en el HTML
function mostrarTareas() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Limpiar la lista antes de mostrarla
    tareas.forEach((tarea, index) => {
        const li = document.createElement("li");
        li.textContent = `${tarea.id}. ${tarea.nombre} - ${tarea.estado}`;

        // Botón para completar tarea
        const completarBtn = document.createElement("button");
        completarBtn.textContent = "Completar";
        completarBtn.onclick = () => {
            tareas[index].estado = "completada";
            guardarTareasEnJSON();
            mostrarTareas();
        };

        // Botón para eliminar tarea
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.onclick = () => {
            tareas.splice(index, 1);
            guardarTareasEnJSON();
            mostrarTareas();
        };

        li.appendChild(completarBtn);
        li.appendChild(eliminarBtn);
        taskList.appendChild(li);
    });
}

// Función para agregar una tarea
function agregarTarea(nombre) {
    if (nombre) {
        const nuevaTarea = {
            id: tareas.length + 1,
            nombre: nombre.toUpperCase(),
            estado: "pendiente"
        };
        tareas.push(nuevaTarea);
        guardarTareasEnJSON();
        mostrarTareas();
    }
}

// Capturar eventos de entrada
document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const taskInput = document.getElementById("taskInput");
    const nombreTarea = taskInput.value.trim();
    if (nombreTarea) {
        agregarTarea(nombreTarea);
        taskInput.value = "";
    } else {
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.textContent = "El nombre de la tarea no puede estar vacío.";
        setTimeout(() => (errorMessage.textContent = ""), 3000);
    }
});

// Ejecutar al cargar la página
cargarTareasDesdeJSON();