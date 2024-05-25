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
