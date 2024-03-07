function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const chatBody = document.getElementById('chatBody');
    
    if (userInput.trim() !== "") {
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.textContent = userInput;

        chatBody.appendChild(userMessage);

        // Simulating a response from the chatbot
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            botMessage.textContent = 'I received: ' + userInput;

            chatBody.appendChild(botMessage);

            // Scroll to the bottom of the chat window
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 500);

        // Clear the user input
        document.getElementById('userInput').value = '';
    }
}