class Chatbot {
    constructor() {
        this.args = {
            chatbox: document.querySelector('.chat-container'),
            sendButton: document.querySelector('.sendButton')
        };
        this.state = false;
        this.message = [];
    }

    display() {
        const { chatbox, sendButton } = this.args;

        sendButton.addEventListener('click', () => this.onSendButton(chatbox));

        const node = chatbox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatbox);
            }
        });
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value;
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 };
        this.message.push(msg1);

        fetch('http://127.0.0.1:5000/chatbot', {
            method: 'POST',
            body: 'message=' + encodeURIComponent(text1),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then(response => response.json())
        .then(data => {
            let msg2 = { name: "Zenly", message: data.response };
            this.message.push(msg2);
            this.updateChatText(chatbox);
            textField.value = '';
        })
        .catch(error => {
            console.error('Error:', error);
            textField.value = '';
        });
    }

    updateChatText(chatbox) {
        var html = '';
        this.message.slice().forEach(function (item) {
            if (item.name === "Zenly") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            }
        });

        const chatBody = chatbox.querySelector('.chat-body');
        if (chatBody) {
            chatBody.innerHTML = html;
        } else {
            console.error("Element with class 'chat-body' not found.");
        }
    }
}

const chatbox = new Chatbot();
chatbox.display();
