document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-audio');
    const volumeSlider = document.querySelector('.volume-slider');
    const volumeIcon = document.querySelector('.volume-control i');
    let isPlaying = false;

    // Définir le volume initial à 15%
    audio.volume = 0.15;

    // Démarrer la musique au premier clic
    document.body.addEventListener('click', function() {
        if (!isPlaying) {
            audio.play();
            isPlaying = true;
        }
    }, { once: true });

    // Gérer le contrôle du volume
    volumeSlider.addEventListener('input', function() {
        const volume = this.value / 100;
        audio.volume = volume;
        
        // Mettre à jour l'icône du volume
        if (volume === 0) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else if (volume < 0.5) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
    });

    // Gérer le clic sur l'icône du volume pour muter/démuter
    volumeIcon.addEventListener('click', function() {
        if (audio.volume > 0) {
            audio.dataset.previousVolume = audio.volume;
            audio.volume = 0;
            volumeSlider.value = 0;
            volumeIcon.className = 'fas fa-volume-mute';
        } else {
            const previousVolume = audio.dataset.previousVolume || 0.3;
            audio.volume = previousVolume;
            volumeSlider.value = previousVolume * 100;
            volumeIcon.className = previousVolume < 0.5 ? 'fas fa-volume-down' : 'fas fa-volume-up';
        }
    });
});
