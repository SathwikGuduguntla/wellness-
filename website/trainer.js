// Simulate a successful payment (you would replace this with actual logic)

// Variables to hold video elements
const patientVideo = document.getElementById('patient-video');
const trainerVideo = document.getElementById('trainer-video');

// Buttons
const startCallBtn = document.getElementById('start-call-btn');
const endCallBtn = document.getElementById('end-call-btn');

// WebRTC peer connection setup
let localStream;
let peerConnection;

// Function to start the call (for Patient and Trainer)
startCallBtn.addEventListener('click', async () => {
    // Request for video and audio
    localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    });

    // Display the patient's video
    patientVideo.srcObject = localStream;

    // Create peer connection
    peerConnection = new RTCPeerConnection();

    // Add local stream tracks to peer connection
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    // Setup remote stream handler (for Trainer)
    peerConnection.ontrack = (event) => {
        trainerVideo.srcObject = event.streams[0];
    };

    // Create an offer and set up the call (This example assumes signaling is handled elsewhere)
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Send offer to the trainer (signaling server should be here)
    // signaling.send({ offer });

    startCallBtn.style.display = 'none';
    endCallBtn.style.display = 'block';
});

// End the call
endCallBtn.addEventListener('click', () => {
    peerConnection.close();
    localStream.getTracks().forEach(track => track.stop());

    patientVideo.srcObject = null;
    trainerVideo.srcObject = null;

    startCallBtn.style.display = 'block';
    endCallBtn.style.display = 'none';
});

// Adding a new chat message to the chat box with animation
document.getElementById('send-chat-btn').addEventListener('click', () => {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();

    if (message !== '') {
        const chatBox = document.getElementById('chat-box');
        const newMessage = document.createElement('div');
        newMessage.textContent = `You: ${message}`;

        // Add the new message to the chat box
        chatBox.appendChild(newMessage);

        // Automatically scroll to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;

        // Clear the input field after sending
        chatInput.value = '';
    }
});

// Function to handle payment completion
function onPaymentComplete() {
    // Simulate payment success and redirect to Trainer Dashboard (dask.html)
    window.location.href = 'dask.html';
}

// Trigger the function once payment is successful (for testing purposes, trigger it immediately)
onPaymentComplete();
