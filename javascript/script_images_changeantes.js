const images = [
    './images/mariage/photo1.jpg',
    './images/mariage/photo2.jpg',
    './images/mariage/photo3.jpg'
];

let currentImgIndex = 0;
let timeoutId = null;
let intervalId = null;

function changeImage() {
    const backImgElement = document.querySelector('.mariage-slideshow .rotating-image.back'); // L'élément de fond
    const frontImgElement = document.querySelector('.mariage-slideshow .rotating-image.front'); // L'élément de premier plan

    if (!frontImgElement || !backImgElement) return;

    currentImgIndex = (currentImgIndex + 1) % images.length;
    backImgElement.src = images[currentImgIndex];
    
    frontImgElement.style.opacity = 0; // Commence la transition

    // Réinitialiser l'image de premier plan pour le prochain cycle
    setTimeout(() => {
        frontImgElement.src = images[currentImgIndex];
        frontImgElement.style.opacity = 1; // Termine la transition
    }, 1000); // Ce délai doit correspondre à la durée de la transition CSS
}

function startSlideshow() {
    changeImage(); // Commence par changer l'image immédiatement
    intervalId = setInterval(changeImage, 2000); // Ensuite, change l'image toutes les 2 secondes
}

function stopSlideshow() {
    clearInterval(intervalId); // Arrête l'intervalle
    clearTimeout(timeoutId); // Empêche le démarrage du diaporama si un délai est en attente
    intervalId = null;
    timeoutId = null;

    const frontImgElement = document.querySelector('.mariage-slideshow .rotating-image.front');
    if (frontImgElement) {
        frontImgElement.style.opacity = 1; // Assurez-vous que l'image de premier plan est visible lorsque le diaporama s'arrête
    }
}

const mariageContainer = document.querySelector('.mariage-slideshow');

mariageContainer.addEventListener('mouseover', () => {
    // Annulez toute animation en attente avant de démarrer un nouveau diaporama
    if (intervalId) {
        stopSlideshow();
    }
    // Utilisez un délai pour commencer le diaporama pour éviter de le démarrer sur des survols accidentels
    timeoutId = setTimeout(startSlideshow, 1000);
});

mariageContainer.addEventListener('mouseout', () => {
    // Stoppe le diaporama seulement si le délai pour commencer le diaporama est terminé
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
    stopSlideshow();
});
