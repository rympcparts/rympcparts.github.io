document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');
    const volumeSlider = document.querySelector('.volume-slider');
    const volumeIcon = document.querySelector('.volume-control i');
    const volumeControl = document.querySelector('.volume-control');

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        if (volumeControl) volumeControl.style.display = 'none';
        if (audio) audio.remove();
        return;
    }

    audio.volume = 0.1;
    volumeSlider.value = 10;

    const updateIcon = () => {
        if (audio.volume === 0) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else if (audio.volume < 0.5) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
    };

    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value / 100;
        updateIcon();
    });

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

    const startAudio = () => {
        audio.play().catch(() => {
            document.addEventListener('click', () => {
                audio.play();
            }, { once: true });
        });
    };

    startAudio();
});
