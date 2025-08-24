document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');
    const volumeSlider = document.querySelector('.volume-slider');
    const volumeIcon = document.querySelector('.volume-control i');

    // Configurer le volume initial à 10%
    audio.volume = 0.1;
    volumeSlider.value = 10;

    // Mettre à jour l'icône du volume
    const updateIcon = () => {
        if (audio.volume === 0) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else if (audio.volume < 0.5) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
    };

    // Slider de volume
    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value / 100;
        updateIcon();
    });

    // Bouton mute
    volumeIcon.addEventListener('click', () => {
        if (audio.volume > 0) {
            audio.dataset.lastVolume = audio.volume;
            audio.volume = 0;
            volumeSlider.value = 0;
        } else {
            audio.volume = audio.dataset.lastVolume || 0.1;
            volumeSlider.value = audio.volume * 100;
        }
        updateIcon();
    });

    // Démarrer la musique
    const startAudio = () => {
        audio.play().catch(() => {
            document.addEventListener('click', () => {
                audio.play();
            }, { once: true });
        });
    };

    // Lancer au chargement
    startAudio();
});
