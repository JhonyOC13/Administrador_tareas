let tareas = [];

// Cargar tareas desde JSON local
async function cargarTareasDesdeAPI() {
    try {
        const response = await fetch("tareas.json");
        if (!response.ok) throw new Error("Error al cargar tareas");
        
        tareas = await response.json();
        guardarTareasEnJSON();
        mostrarTareas();
        Swal.fire("Cargado", "Tareas cargadas correctamente", "success");
    } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudieron cargar las tareas", "error");
    }
}

// Guardar tareas en localStorage
function guardarTareasEnJSON() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Cargar tareas guardadas en localStorage
function cargarTareasDesdeJSON() {
    const tareasJSON = localStorage.getItem("tareas");
    if (tareasJSON) {
        tareas = JSON.parse(tareasJSON);
        mostrarTareas();
    }
}

// Mostrar tareas en la tabla
function mostrarTareas() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tareas.forEach((tarea, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${tarea.id}</td>
            <td>${tarea.nombre}</td>
            <td>${tarea.estado}</td>
            <td>
                <button onclick="completarTarea(${index})">✔️</button>
                <button onclick="eliminarTarea(${index})">🗑️</button>
            </td>
        `;
        taskList.appendChild(fila);
    });
}

// Agregar una nueva tarea
function agregarTarea(nombre) {
    if (nombre) {
        const nuevaTarea = {
            id: tareas.length + 1,
            nombre: (nombre),
            estado: "Pendiente"
        };
        tareas.push(nuevaTarea);
        guardarTareasEnJSON();
        mostrarTareas();
        Swal.fire("¡Agregado!", "Tarea agregada correctamente", "success");
    }
}

// Completar tarea
function completarTarea(index) {
    tareas[index].estado = "Completada";
    guardarTareasEnJSON();
    mostrarTareas();
    Swal.fire("¡Completado!", "Tarea marcada como completada", "info");
}

// Eliminar tarea
function eliminarTarea(index) {
    Swal.fire({
        title: "¿Eliminar tarea?",
        text: "No podrás recuperarla",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            tareas.splice(index, 1);
            guardarTareasEnJSON();
            mostrarTareas();
            Swal.fire("Eliminado", "Tarea eliminada correctamente", "success");
        }
    });
}

// Capturar eventos del formulario
document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const taskInput = document.getElementById("taskInput");
    const nombreTarea = taskInput.value.trim();

    if (nombreTarea) {
        agregarTarea(nombreTarea);
        taskInput.value = ""; // Limpia el campo
    } else {
        Swal.fire("Error", "El nombre de la tarea no puede estar vacío", "error");
    }
});

// Evento para cargar tareas desde API
document.getElementById("loadTasks").addEventListener("click", cargarTareasDesdeAPI);

// Ejecutar al cargar la página
cargarTareasDesdeJSON();
