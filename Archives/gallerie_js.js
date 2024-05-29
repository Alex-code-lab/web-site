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
