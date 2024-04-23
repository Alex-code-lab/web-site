const categoryImages = {
    mariage: ['./images/mariage/mariage1.jpg', './images/mariage/mariage2.jpg', './images/mariage/mariage3.jpg'],
    autre: ['./images/autre/autre1.jpg', './images/autre/autre2.jpg', './images/autre/autre3.jpg'],
    portraits: ['./images/portraits/portraits1.jpg', './images/portraits/portraits2.jpg', './images/portraits/portraits3.jpg']
};

let intervalIds = {};

function changeImage(category) {
    const frontImgElement = document.querySelector(`.slideshow[data-category="${category}"] .rotating-image.front`);
    const backImgElement = document.querySelector(`.slideshow[data-category="${category}"] .rotating-image.back`);

    if (!frontImgElement || !backImgElement) return;

    let currentImgIndex = frontImgElement.dataset.index ? parseInt(frontImgElement.dataset.index, 10) : 0;
    currentImgIndex = (currentImgIndex + 1) % categoryImages[category].length;

    backImgElement.src = categoryImages[category][currentImgIndex];
    frontImgElement.style.opacity = 0;

    setTimeout(() => {
        frontImgElement.src = categoryImages[category][currentImgIndex];
        frontImgElement.style.opacity = 1;
        frontImgElement.dataset.index = currentImgIndex; // Stockez l'index courant dans l'élément
    }, 1000);
}

function startSlideshow(category) {
    if (!intervalIds[category]) {
        changeImage(category);
        intervalIds[category] = setInterval(() => changeImage(category), 2000);
    }
}

function stopSlideshow(category) {
    if (intervalIds[category]) {
        clearInterval(intervalIds[category]);
        intervalIds[category] = null;
    }
}

document.querySelectorAll('.slideshow').forEach(container => {
    const category = container.dataset.category;

    container.addEventListener('mouseover', () => {
        startSlideshow(category);
    });

    container.addEventListener('mouseout', () => {
        stopSlideshow(category);
    });
});
