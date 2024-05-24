// Script pour le bouton de scroll to top
        const scrollToTopButton = document.querySelector('.cc-FloatingButtonBarContainer-button-scroll');
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });