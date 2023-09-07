
const servicios = [
    { id: 1, nombre: "Soja", precio: 3000 },
    { id: 2, nombre: "Trigo", precio: 2900 },
    { id: 3, nombre: "Girasol", precio: 2800 },
    { id: 4, nombre: "Maíz", precio: 2850 },
    { id: 5, nombre: "Bovinos", precio: 3200 },
    { id: 6, nombre: "Flete", precio: 2500 },
];
const servicesSelect = document.querySelector("#services"),
distanciaInput = document.querySelector("#distancia"),
calcularBtn = document.querySelector("#calcularBtn"),
resultContainer = document.querySelector("#resultContainer"),
botonHistorial = document.querySelector("#btnHistorial"),
histoiralContainer = document.querySelector("#historialContainer"),
alerta = document.querySelector('#alerta'),
borrarHistorial = document.querySelector("#borrarHistorial");


botonHistorial.addEventListener('click', ()=> {
    btnUltimoViaje();
});

//relleno la lista con los servicios
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
    };

    const totalCost = selectedService.precio * distancia;

    //meto la iffo del viaje en un nuevo objeto
    const tripData = {
        servicio : selectedService.nombre,
        distancia : distancia,
        total : totalCost,
    };
    //paso el obj a json
    const historialJSON = JSON.stringify(tripData);
    //paso el json a local sotrage
    localStorage.setItem('historial', historialJSON);

    
    // resultado
    resultContainer.innerHTML = `
        <h2 class="hcss">El viaje de ${selectedService.nombre} tiene un coste de $${totalCost}.</h2>
    `;
    resultContainer.style.display = "block";
});

function btnUltimoViaje(){
    const historialJSONrecu = localStorage.getItem('historial');
    const historialRecuperado = JSON.parse(historialJSONrecu);

    histoiralContainer.innerHTML =`
    <h5><span class=" hcss">Viaje de ${historialRecuperado.servicio}, ${historialRecuperado.distancia}km recorridos, un total de $${historialRecuperado.total}</span></h5>
    `; 
}

borrarHistorial.addEventListener("click",()=>{
    histoiralContainer.innerHTML = "" 
    localStorage.clear()
});
