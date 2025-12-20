// CONFIGURACIÓN:
// Cambia esta fecha a la fecha exacta en que se libera el regalo (dentro de 7 días)
const unlockDate = new Date("December 25, 2025 18:00:00").getTime();

// Elementos del DOM
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const btn = document.getElementById("btn-claim");
const btnShowPhoto = document.getElementById("btn-show-photo");
const photoModal = document.getElementById("photo-modal");
const closeModalBtn = document.querySelector(".close-btn");
const errorMsg = document.getElementById("error-msg");

// Función de cuenta regresiva
const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = unlockDate - now;

    // Cálculos de tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Mostrar en pantalla
    daysEl.innerText = days < 10 ? `0${days}` : days;
    hoursEl.innerText = hours < 10 ? `0${hours}` : hours;
    minutesEl.innerText = minutes < 10 ? `0${minutes}` : minutes;
    secondsEl.innerText = seconds < 10 ? `0${seconds}` : seconds;

    // Si la cuenta llega a cero
    if (distance < 0) {
        clearInterval(countdown);
        document.querySelector(".timer-container").innerHTML = "<h2>¡REGALO DESBLOQUEADO!</h2>";
        document.querySelector(".status-message p").innerText = "¡Revisa tu inventario de Steam!";
        btn.innerText = "MUGAR!!!";
        btn.onclick = () => alert("Escribe al 0424-7836896 y pregunta por Tiffani"); 
    }
}, 1000);

// Lógica del botón "Reclamar"
btn.addEventListener("click", () => {
    const now = new Date().getTime();
    if (now < unlockDate) {
        errorMsg.classList.remove("hidden");
        errorMsg.classList.add("show-error");
        
        if (navigator.vibrate) navigator.vibrate(200);

        setTimeout(() => {
            errorMsg.classList.remove("show-error");
            errorMsg.classList.add("hidden");
        }, 3000);
    }
});

// Lógica para mostrar la foto
btnShowPhoto.addEventListener("click", () => {
    photoModal.classList.remove("hidden");
    document.body.style.overflow = 'hidden';
});

// Cerrar modal con el botón X
closeModalBtn.addEventListener("click", () => {
    photoModal.classList.add("hidden");
    document.body.style.overflow = 'auto';
});

// Cerrar modal haciendo clic fuera de la imagen
photoModal.addEventListener("click", (e) => {
    if (e.target === photoModal) {
        photoModal.classList.add("hidden");
        document.body.style.overflow = 'auto';
    }
});

// Cerrar modal con la tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !photoModal.classList.contains('hidden')) {
        photoModal.classList.add("hidden");
        document.body.style.overflow = 'auto';
    }
});

// Cargar imagen del modal de forma proactiva
const modalPhoto = document.querySelector('.modal-photo');
if (modalPhoto) {
    const img = new Image();
    img.src = modalPhoto.src;
    img.onload = () => {
        console.log('Foto del modal cargada correctamente');
    };
    img.onerror = () => {
        console.log('Error cargando la foto del modal, usando placeholder');
    };
}