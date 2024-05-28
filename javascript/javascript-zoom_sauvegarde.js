document.querySelectorAll('.zoomable').forEach(img => {
    img.onclick = () => {
        let overlay = document.getElementById('zoom-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'zoom-overlay';
            overlay.classList.add('zoom-overlay', 'hidden');
            document.body.appendChild(overlay);
            overlay.onclick = () => {
                overlay.classList.add('hidden');
                overlay.innerHTML = '';
            };
        }

        const clone = img.cloneNode();
        clone.style.width = 'auto';
        clone.style.maxWidth = '90%';
        clone.style.maxHeight = '90%';
        overlay.innerHTML = '';
        overlay.appendChild(clone);
        overlay.classList.remove('hidden');
    };

    img.onmouseover = () => {
        img.style.cursor = 'zoom-in';
    };
});




// Script pour la fonctionnalité de zoom sur les images
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.zoomable');
    const overlay = document.getElementById('zoom-overlay');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex;

    function showImage(index) {
        const img = images[index];
        const clone = img.cloneNode();
        clone.style.width = 'auto';
        clone.style.maxWidth = '90%';
        clone.style.maxHeight = '90%';
        overlay.innerHTML = '';
        overlay.appendChild(prevButton);
        overlay.appendChild(clone);
        overlay.appendChild(nextButton);
        overlay.classList.remove('hidden');
        currentIndex = index;
    }

    images.forEach((img, index) => {
        img.onclick = () => showImage(index);
    });

    prevButton.onclick = (e) => {
        e.stopPropagation();
        if (currentIndex > 0) {
            showImage(currentIndex - 1);
        }
    };

    nextButton.onclick = (e) => {
        e.stopPropagation();
        if (currentIndex < images.length - 1) {
            showImage(currentIndex + 1);
        }
    };

    overlay.onclick = () => {
        overlay.classList.add('hidden');
    };
});
