const actionButton = document.getElementById('actionButton');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const visualDisplay = document.getElementById('visualDisplay');
const introVideo = document.getElementById('introVideo');

let socket = new WebSocket('ws://localhost:8080');
let participants = 0;

actionButton.addEventListener('click', () => {
    socket.send('buttonClicked');
});

socket.onmessage = function(event) {
    participants = parseInt(event.data);
    updateProgress(participants);
};

function updateProgress(count) {
    let percentage = Math.min(count * 10, 100); // Assuming 10 participants max to fill the bar
    progress.style.width = percentage + '%';

    if (percentage === 100) {
        showVisualDisplay();
    }
}

function showVisualDisplay() {
    progressBar.style.display = 'none';
    visualDisplay.style.display = 'block';
    introVideo.style.display = 'block';
    introVideo.play();
}

socket.onopen = function() {
    progressBar.style.display = 'block';
};
