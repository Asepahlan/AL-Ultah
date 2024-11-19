document.addEventListener('DOMContentLoaded', function() {
    initializeAudioPlayer();
});

const audio = new Audio('lagu/ssstik.io_1732008446884.mp3');
let playCount = 0;
const maxPlays = 5;
let isPlaying = false;
let playButton, playIcon;

function initializeAudioPlayer() {
    const audioPlayerHTML = `
        <div class="audio-player">
            <div class="audio-controls">
                <button class="play-button">
                    <i id="playIcon" class="fas fa-play"></i>
                </button>
            </div>
        </div>
    `;

    const mediaContainer = document.querySelector('.media-container');
    if (mediaContainer) {
        mediaContainer.insertAdjacentHTML('beforeend', audioPlayerHTML);
    }

    playButton = document.querySelector('.play-button');
    playIcon = document.querySelector('#playIcon');

    audio.addEventListener('ended', () => {
        playCount++;
        if (playCount < maxPlays) {
            audio.currentTime = 0;
            audio.play();
        } else {
            playCount = 0;
            isPlaying = false;
            audio.currentTime = 0;
            playIcon.classList.replace('fa-pause', 'fa-play');
        }
    });

    if (playButton) {
        playButton.addEventListener('click', togglePlay);
    }
}

function togglePlay() {
    if (!isPlaying) {
        playCount = 0;
        isPlaying = true;
        audio.currentTime = 0;
        audio.play().then(() => {
            playIcon.classList.replace('fa-play', 'fa-pause');
        });
    } else {
        isPlaying = false;
        audio.pause();
        playIcon.classList.replace('fa-pause', 'fa-play');
    }
}

function showFinalSurprise() {
    const mainTitle = document.querySelector('h1');
    if (mainTitle) mainTitle.remove();

    const riddles = document.getElementById('riddles');
    if (riddles) riddles.remove();

    const surprise = document.getElementById('surprise');
    if (surprise) {
        surprise.classList.remove('hidden');
    }

    const messageContainer = document.getElementById('love-message');
    if (messageContainer) {
        messageContainer.innerHTML = loveMessages.map(msg => `<p>${msg}</p>`).join('');
    }

    setTimeout(() => {
        playCount = 0;
        isPlaying = true;
        audio.currentTime = 0;
        audio.play().then(() => {
            if (playIcon) {
                playIcon.classList.replace('fa-play', 'fa-pause');
            }
        }).catch(err => {
            console.error('Gagal memulai audio:', err);
        });
    }, 500);

    createFloatingHearts();
}

function createFloatingHearts() {
    const existingHearts = document.querySelectorAll('.floating-hearts');
    existingHearts.forEach(heart => heart.remove());

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.classList.add('floating-hearts');
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 5000);
        }, i * 100);
    }
}

function playAgain() {
    location.reload();
}