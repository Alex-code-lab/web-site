<script>
document.querySelectorAll('.zoomable').forEach(img => {
    img.onclick = () => {
        if (img.classList.contains('zoomed')) {
            img.classList.remove('zoomed');
            img.style.transform = 'scale(1)';
        } else {
            document.querySelectorAll('.zoomable').forEach(otherImg => {
                otherImg.classList.remove('zoomed');
                otherImg.style.transform = 'scale(1)';
            });
            img.classList.add('zoomed');
            img.style.transform = 'scale(2)';
        }
    };
});
</script>
