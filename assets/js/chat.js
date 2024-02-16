const STORAGE_KEY = "chat_messages";

var messages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function sendMessage() {
    var messageInput = document.getElementById("message-input");
    var message = messageInput.value;

    if (message.trim() === "") {
        return;
    }

 
    var newMessage = {
        id: generateId(),
        text: message,
        sender: "user",
        liked: false 
    };

    messages.push(newMessage);

    displayMessage(newMessage);

    messageInput.value = "";

    saveMessagesToLocalStorage();

 
    setTimeout(sendBotReply, 1000);
}

function sendBotReply() {
    var botMessage = {
       
        id: generateId(),
        text: "Merhaba! Ben bir botum",
        sender: "bot",
        liked: false 
    };

    displayMessage(botMessage);

    
    messages.push(botMessage);

    saveMessagesToLocalStorage();
}

function displayMessage(message) {
    var chatBox = document.getElementById("chat-box");
    var messageElement = document.createElement("div");
    messageElement.dataset.id = message.id; 
    messageElement.innerText = message.text;
    messageElement.classList.add("message");
    messageElement.classList.add(message.sender);

    var heartEmoji = document.createElement("span");
    heartEmoji.innerHTML = "&#x2764;&#xFE0F;";
    heartEmoji.classList.add("heart-emoji");
    if (message.liked) {
        heartEmoji.style.display = "inline";
    } else {
        heartEmoji.style.display = "none";
    }

 
    messageElement.addEventListener("click", function() {
        toggleLike(message, heartEmoji);
    });

  
    var deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash", "delete-icon");
    deleteIcon.addEventListener("click", function(event) {
        event.stopPropagation(); 
        deleteMessage(messageElement, message.id); 
    });

    messageElement.addEventListener("mouseenter", function() {
        deleteIcon.style.display = "inline";
    });

    messageElement.addEventListener("mouseleave", function() {
        deleteIcon.style.display = "none";
    });

    messageElement.appendChild(heartEmoji);
    messageElement.appendChild(deleteIcon);
    chatBox.appendChild(messageElement);

   
    chatBox.scrollTop = chatBox.scrollHeight;
}

function toggleLike(message, heartEmoji) {
    if (!message.liked) {
        message.liked = true;
        heartEmoji.style.display = "inline"; 
    } else {

        message.liked = false;
        heartEmoji.style.display = "none"; 
    }


    saveMessagesToLocalStorage();
}

function deleteMessage(messageElement, messageId) {

    messages = messages.filter(function(message) {
        return message.id !== messageId;
    });
    messageElement.remove();

    saveMessagesToLocalStorage();
}


function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function saveMessagesToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

window.onload = function() {
    messages.forEach(function(message) {
        displayMessage(message);
    });
};
