document.addEventListener("DOMContentLoaded", function() {
    const chatToggle = document.querySelector(".chat-toggle");
    const chatbox = document.querySelector(".chatbot-container");
    const closeChat = document.getElementById("close-chat");
    const sendBtn = document.getElementById("send-btn");
    const queryInput = document.getElementById("query");
    const chatBody = document.getElementById("chat-body");
    const speechBtn = document.getElementById("speech-btn"); // New button for speech input

    // Show chatbot when clicking the chat icon
    chatToggle.addEventListener("click", function() {
        chatbox.style.display = "block";
        chatToggle.style.display = "none";
    });

    // Close chatbot
    closeChat.addEventListener("click", function() {
        chatbox.style.display = "none";
        chatToggle.style.display = "block";
    });

    // Handle send button click
    sendBtn.addEventListener("click", function() {
        sendMessage();
    });

    // Handle enter key press
    queryInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") sendMessage();
    });

    // Handle speech input button click
    speechBtn.addEventListener("click", function() {
        startSpeechRecognition();
    });

    // Function to send message to the chatbot
    function sendMessage() {
        let userQuery = queryInput.value.trim();
        if (userQuery === "") return;

        // Append user message
        chatBody.innerHTML += `<div class="user-message"><strong>🧑 You:</strong> ${userQuery}</div>`;
        queryInput.value = "";

        // Show typing animation
        chatBody.innerHTML += `<div class="bot-message typing">🤖 Typing...</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;

        // Send query to Flask backend
        fetch("/ask", {
            method: "POST",
            body: new URLSearchParams({ "query": userQuery }),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(response => response.json())
        .then(data => {
            // Remove typing animation once response is received
            const typingMessage = document.querySelector(".typing");
            if (typingMessage) typingMessage.remove();

            let botResponse = data.documentation || data.response || "🤖 I couldn’t find that in the documentation. Please check the official docs.";

            // Check if it's an undefined or unrecognized question
            if (botResponse === "undefined" || !botResponse) {
                botResponse = `🤖 I couldn't find that in the documentation. Please check the official docs. You can refer to these sources for more information:
                <ul>
                    <li><a href="https://segment.com/docs/">Segment Documentation</a></li>
                    <li><a href="https://www.mparticle.com/developers/">mParticle Documentation</a></li>
                    <li><a href="https://www.lytics.com/docs/">Lytics Documentation</a></li>
                    <li><a href="https://www.zeotap.com/resources">Zeotap Documentation</a></li>
                </ul>`;
            }

            chatBody.innerHTML += `<div class="bot-message"><strong>🤖 Chatbot:</strong> ${botResponse}</div>`;
            chatBody.scrollTop = chatBody.scrollHeight;
        })
        .catch(error => {
            // Remove typing animation on error
            const typingMessage = document.querySelector(".typing");
            if (typingMessage) typingMessage.remove();
            chatBody.innerHTML += `<div class="bot-message">🤖 Error fetching response.</div>`;
        });
    }

    // Dark Mode Toggle
    const darkModeBtn = document.getElementById("dark-mode-btn");

    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    // Toggle Dark Mode
    darkModeBtn.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");

        // Save theme preference in localStorage
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

    // Speech Recognition Functionality
    let recognition;
    let isListening = false;

    function startSpeechRecognition() {
        // Check if the browser supports speech recognition
        if (!('webkitSpeechRecognition' in window)) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        recognition = new webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = false;  // Stop after a single phrase
        recognition.interimResults = false; // Don't show interim results while the user is speaking

        recognition.onstart = function() {
            isListening = true;
            chatBody.innerHTML += `<div class="bot-message">🎤 Listening...</div>`;
        };

        recognition.onresult = function(event) {
            const speechTranscript = event.results[0][0].transcript.trim();
            chatBody.innerHTML += `<div class="user-message"><strong>🧑 You:</strong> ${speechTranscript}</div>`;
            sendMessageUsingSpeech(speechTranscript);
        };

        recognition.onerror = function(event) {
            chatBody.innerHTML += `<div class="bot-message">🤖 Error in speech recognition. Please try again.</div>`;
        };

        recognition.onend = function() {
            isListening = false;
            chatBody.innerHTML += `<div class="bot-message">🎤 Listening ended.</div>`;
        };

        recognition.start();
    }

    // Send the speech query to the backend
    function sendMessageUsingSpeech(speechQuery) {
        chatBody.innerHTML += `<div class="bot-message typing">🤖 Typing...</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;

        fetch("/ask", {
            method: "POST",
            body: new URLSearchParams({ "query": speechQuery }),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(response => response.json())
        .then(data => {
            document.querySelector(".typing").remove();
            let botResponse = data.documentation || data.response || "🤖 I couldn’t find that in the documentation. Please check the official docs.";
            chatBody.innerHTML += `<div class="bot-message"><strong>🤖 Chatbot:</strong> ${botResponse}</div>`;
            chatBody.scrollTop = chatBody.scrollHeight;
        })
        .catch(error => {
            document.querySelector(".typing").remove();
            chatBody.innerHTML += `<div class="bot-message">🤖 Error fetching response.</div>`;
        });
    }
});
