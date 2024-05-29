// Ajoute un écouteur d'événements pour le chargement complet du document HTML
document.addEventListener('DOMContentLoaded', function () {

    // Sélectionne toutes les images avec la classe 'zoomable'
    const images = document.querySelectorAll('.zoomable');

    // Sélectionne l'élément de superposition pour afficher les images en mode zoom
    const overlay = document.getElementById('zoom-overlay');

    // Sélectionne les boutons de navigation (précédent et suivant)
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    // Variable pour garder la trace de l'index de l'image actuellement affichée
    let currentIndex;

    // Fonction pour afficher une image en mode zoom
    function showImage(index) {
        const img = images[index];  // Récupère l'image à l'index donné
        const clone = img.cloneNode();  // Clone l'image pour éviter de modifier l'originale

        // Définir les styles pour le clone de l'image
        clone.style.width = 'auto';
        clone.style.maxWidth = '90%';
        clone.style.maxHeight = '90%';

        overlay.innerHTML = '';  // Vide le contenu de la superposition
        overlay.appendChild(prevButton);  // Ajoute le bouton précédent à la superposition
        overlay.appendChild(clone);  // Ajoute l'image clonée à la superposition
        overlay.appendChild(nextButton);  // Ajoute le bouton suivant à la superposition
        overlay.classList.remove('hidden');  // Affiche la superposition
        currentIndex = index;  // Met à jour l'index de l'image courante
    }

    // Ajoute un écouteur d'événement de clic à chaque image zoomable
    images.forEach((img, index) => {
        img.onclick = () => showImage(index);  // Affiche l'image en mode zoom lorsqu'elle est cliquée
    });

    // Fonction pour afficher l'image précédente
    function showPrevImage() {
        if (currentIndex > 0) {  // Vérifie s'il y a une image précédente
            showImage(currentIndex - 1);  // Affiche l'image précédente
        }
    }

    // Fonction pour afficher l'image suivante
    function showNextImage() {
        if (currentIndex < images.length - 1) {  // Vérifie s'il y a une image suivante
            showImage(currentIndex + 1);  // Affiche l'image suivante
        }
    }

    // Ajoute un écouteur d'événement de clic au bouton précédent
    prevButton.onclick = (e) => {
        e.stopPropagation();  // Empêche l'événement de clic de se propager
        showPrevImage();  // Affiche l'image précédente
    };

    // Ajoute un écouteur d'événement de clic au bouton suivant
    nextButton.onclick = (e) => {
        e.stopPropagation();  // Empêche l'événement de clic de se propager
        showNextImage();  // Affiche l'image suivante
    };

    // Ajoute un écouteur d'événement de clic à la superposition pour la masquer
    overlay.onclick = () => {
        overlay.classList.add('hidden');  // Masque la superposition
    };

    // Ajoute un écouteur d'événement pour les touches du clavier
    document.addEventListener('keydown', function (e) {
        if (!overlay.classList.contains('hidden')) {  // Vérifie si la superposition est visible
            if (e.key === 'ArrowLeft') {  // Vérifie si la touche flèche gauche est pressée
                showPrevImage();  // Affiche l'image précédente
            } else if (e.key === 'ArrowRight') {  // Vérifie si la touche flèche droite est pressée
                showNextImage();  // Affiche l'image suivante
            }
        }
    });
});
