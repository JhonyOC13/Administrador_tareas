// Array de tareas
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
        mostrarTareas();
    } else {
        alert("El nombre de la tarea no puede estar vacío.");
    }
}

// Función para mostrar las tareas en el HTML
function mostrarTareas() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tareas.forEach(tarea => {
        const li = document.createElement("li");
        li.textContent = `${tarea.id}. ${tarea.nombre} - ${tarea.estado}`;
        taskList.appendChild(li);
    });
}

// Función para marcar una tarea como completada
function completarTarea() {
    const nombre = prompt("Ingrese el nombre de la tarea a completar:").toUpperCase();
    const tarea = tareas.find(t => t.nombre.toUpperCase() === nombre);
    if (tarea) {
        tarea.estado = "completada";
        mostrarTareas();
    } else {
        alert("Tarea no encontrada.");
    }
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

// Función para eliminar una tarea
function eliminarTarea() {
    const nombre = prompt("Ingrese el nombre de la tarea a eliminar:").toUpperCase();
    const index = tareas.findIndex(t => t.nombre.toUpperCase() === nombre);
    if (index !== -1) {
        tareas.splice(index, 1);
        mostrarTareas();
    } else {
        alert("Tarea no encontrada.");
    }
}

// Opciones principales para el usuario
function menu() {
    let opcion;
    do {
        opcion = parseInt(prompt(`Seleccione una opción:\n1. Agregar tarea\n2. Completar tarea\n3. Buscar tarea\n4. Eliminar tarea\n5. Salir`), 10);
        switch (opcion) {
            case 1:
                agregarTarea();
                break;
            case 2:
                completarTarea();
                break;
            case 3:
                buscarTarea();
                break;
            case 4:
                eliminarTarea();
                break;
            case 5:
                alert("Saliendo del gestor de tareas.");
                break;
            default:
                alert("Opción no válida.");
        }
    } while (opcion !== 5);
}

// Ejecutar el menú al cargar
menu();