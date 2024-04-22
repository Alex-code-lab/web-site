const images = [
    './images/mariage/photo1.jpg',
    './images/mariage/photo2.jpg',
    './images/mariage/photo3.jpg'
];

let currentImgIndex = 0;
let intervalId = null;

function changeImage() {
    const frontImgElement = document.querySelector('.rotating-image.front'); // L'élément de premier plan qui change
    const backImgElement = document.querySelector('.rotating-image.back'); // L'élément de fond qui reste visible

    if (!frontImgElement || !backImgElement) return;

    // Trouver l'index suivant
    currentImgIndex = (currentImgIndex + 1) % images.length;

    // Changer l'image de fond au nouvel index
    backImgElement.src = images[currentImgIndex];

    // Faire disparaître l'image de premier plan pour révéler l'image de fond
    frontImgElement.style.opacity = 0;

    // Réinitialiser l'image de premier plan pour le prochain cycle
    setTimeout(() => {
        frontImgElement.src = images[currentImgIndex];
        frontImgElement.style.opacity = 1; // Rendre à nouveau visible l'image de premier plan
    }, 1000); // Correspond à la durée de la transition d'opacité
}

function startSlideshow() {
    if (!intervalId) {
        changeImage(); // Changer immédiatement l'image
        intervalId = setInterval(changeImage, 5000);
    }
}

function stopSlideshow() {
    clearInterval(intervalId);
    intervalId = null;
}

// Attach handlers to the container to start/stop the slideshow on mouse events
const galleryContainer = document.querySelector('.gallery');
galleryContainer.addEventListener('mouseover', startSlideshow);
galleryContainer.addEventListener('mouseout', stopSlideshow);
