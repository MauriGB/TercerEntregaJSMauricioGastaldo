
const servicios = [
    { id: 1, nombre: "Soja", precio: 3000 },
    { id: 2, nombre: "Trigo", precio: 2900 },
    { id: 3, nombre: "Girasol", precio: 2800 },
    { id: 4, nombre: "Maiz", precio: 2850 },
    { id: 5, nombre: "Vovinos", precio: 3200 },
    { id: 6, nombre: "Flete", precio: 2500 },
];
const servicesSelect = document.querySelector("#services"),
distanciaInput = document.querySelector("#distancia"),
calcularBtn = document.querySelector("#calcularBtn"),
resultContainer = document.querySelector("#resultContainer"),
botonHistorial = document.querySelector("#btnHistorial"),
hisotiralContainer = document.querySelector("#historialContainer"),
alerta = document.querySelector('#alerta');

botonHistorial.addEventListener('click', ()=> {
    btnUltimoViaje();
})

servicios.forEach((servicio) => {
    const option = document.createElement("option");
    option.value = servicio.id;
    option.textContent = servicio.nombre;
    servicesSelect.appendChild(option);
});


calcularBtn.addEventListener("click", () => {
    const selectedServiceId = servicesSelect.value;
    const selectedService = servicios.find((servicio) => servicio.id === parseInt(selectedServiceId));
    const distancia = parseInt(distanciaInput.value);

    if (!selectedService || isNaN(distancia) || distancia <= 0) {
        alerta.innerHTML = `<div><small>Por favor, selecciona un servicio y proporciona una distancia válida.</small></div>`;
        return;
    } else {
        alerta.innerHTML = ``
    }

    const totalCost = selectedService.precio * distancia;

    const tripData = `Transporte de ${selectedService.nombre} una distancia de ${distancia} kilometros con un coste toal de $${totalCost}`;
    localStorage.setItem('tripData',tripData)
    
    // resultado
    resultContainer.innerHTML = `
        <h2>El viaje de ${selectedService.nombre} tiene un coste de $${totalCost}.</h2>
    `;
    resultContainer.style.display = "block";
});

function btnUltimoViaje(){
    const ultimoViaje = localStorage.getItem("tripData");
    hisotiralContainer.innerHTML= `<h4>Ultimo viaje: ${ultimoViaje}</h4>`
}

// Llama a la función para mostrar el historial en algún lugar de tu código, por ejemplo, después del formulario
