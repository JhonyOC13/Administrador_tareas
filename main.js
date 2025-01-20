let tareas = [];

// Función para agregar una tarea
function agregarTarea() {
    const nombre = prompt("Ingrese el nombre de la tarea:").toUpperCase();
    if (nombre) {
        const nuevaTarea = {
            id: tareas.length + 1,
            nombre: nombre,
            estado: "pendiente"
        };
        tareas.push(nuevaTarea);
        guardarTareasEnJSON();
        mostrarTareas();
    } else {
        alert("El nombre de la tarea no puede estar vacío.");
    }
}

// Cargar tareas desde JSON al iniciar la aplicación
function cargarTareasDesdeJSON() {
    const tareasJSON = localStorage.getItem("tareas");
    if (tareasJSON) {
        tareas = JSON.parse(tareasJSON);
        mostrarTareas();
    }
}

// Guardar tareas en JSON en el localStorage
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

// Función para buscar una tarea
function buscarTarea() {
    const termino = prompt("Ingrese el término de búsqueda:").toUpperCase();
    const resultados = tareas.filter(t => t.nombre.includes(termino));
    if (resultados.length > 0) {
        alert("Tareas encontradas:\n" + resultados.map(t => `${t.id}. ${t.nombre} - ${t.estado}`).join("\n"));
    } else {
        alert("No se encontraron tareas con ese término.");
    }
}

// Agregar evento al botón "Agregar Tarea"
document.getElementById("addTaskButton").addEventListener("click", agregarTarea);

// Ejecutar al cargar la página
cargarTareasDesdeJSON();
