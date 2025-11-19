document.addEventListener('DOMContentLoaded', () => {
    
    const playlist = [
        'track01.mp3',
        'track02.mp3',
        'track03.mp3',
        'track04.mp3',
        'track05.mp3'
    ];

    const audioPlayer = document.getElementById('audioPlayer');
    const playOverlay = document.getElementById('playOverlay');
    const playIcon = document.querySelector('.play-icon');
    const albumArt = document.getElementById('albumArt');
    const statusText = document.getElementById('nowPlayingText');
    const albumWrapper = document.querySelector('.album-wrapper');

    let currentTrackIndex = 0;
    let isPlaying = false;

    function toggleMusic() {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic(currentTrackIndex);
        }
    }

    function playMusic(index) {
        if (audioPlayer.src.indexOf(playlist[index]) === -1) {
            audioPlayer.src = playlist[index];
        }
        
        audioPlayer.play().then(() => {
            isPlaying = true;
            updateVisuals('play', index);
        }).catch(error => {
            console.error("Gagal memutar lagu. Pastikan file mp3 ada.", error);
            statusText.textContent = "Error: File not found";
        });
    }

    function pauseMusic() {
        audioPlayer.pause();
        isPlaying = false;
        updateVisuals('pause');
    }

    function updateVisuals(state, index) {
        if (state === 'play') {
            playIcon.textContent = "⏸"; // Ikon Pause
            playOverlay.style.opacity = "0"; // Sembunyikan overlay agar cover terlihat
            albumArt.classList.add('playing-animation'); // Tambah efek denyut neon
            statusText.textContent = "Now Playing: Preview Track " + (index + 1);
            statusText.style.color = "#ff0f5b"; // Merah Neon
        } else {
            playIcon.textContent = "▶"; // Ikon Play
            playOverlay.style.opacity = "1"; // Munculkan overlay
            albumArt.classList.remove('playing-animation'); // Hapus efek denyut
            statusText.textContent = "Paused";
            statusText.style.color = "#cccccc"; // Abu-abu
        }
    }

    albumWrapper.addEventListener('click', toggleMusic);

    audioPlayer.addEventListener('ended', () => {
        currentTrackIndex++;
        if (currentTrackIndex < playlist.length) {
            playMusic(currentTrackIndex);
        } else {
            // Jika playlist habis, reset ke awal
            currentTrackIndex = 0;
            pauseMusic();
            statusText.textContent = "Preview Finished";
        }
    });

    albumWrapper.addEventListener('mouseenter', () => {
        if(isPlaying) playOverlay.style.opacity = "1";
    });

    albumWrapper.addEventListener('mouseleave', () => {
        if(isPlaying) playOverlay.style.opacity = "0";
    });

});