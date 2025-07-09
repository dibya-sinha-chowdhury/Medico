const chatIcon = document.getElementById("chat-icon");
const chatbot = document.getElementById("chatbot-container");
const minimizeBtn = document.getElementById("minimize-chat");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatbox = document.getElementById("chatbox");

// Open chat window
chatIcon.addEventListener("click", () => {
  chatbot.style.display = "flex";
  chatIcon.style.display = "none";
  restoreChatHistory();
});

// Minimize chat window
minimizeBtn.addEventListener("click", () => {
  chatbot.style.display = "none";
  chatIcon.style.display = "block";
});

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (userMessage === "") return;

  appendMessage("user", userMessage);
  input.value = "";

  setTimeout(() => {
    const botReply = getBotReply(userMessage);
    appendMessage("bot", botReply);
  }, 500);
});

// Append message and save to sessionStorage
function appendMessage(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
  msgDiv.innerText = message;
  chatbox.appendChild(msgDiv);
  chatbox.scrollTop = chatbox.scrollHeight;

  saveChatHistory();
}

// Generate bot reply
function getBotReply(message) {
  const msg = message.toLowerCase();
  if (msg.includes("fever")) {
    return "You may have a viral infection. Drink fluids and rest.";
  } else if (msg.includes("appointment")) {
    return "You can book an appointment at hospital.com/appointments.";
  } else if (msg.includes("covid")) {
    return "For COVID-19 support, visit who.int or call your local health authority.";
  } else if (msg.includes("itching")) {
    return "May be a result of fungal infection. Keep the body part clean and consult a doctor";
  }
  else if (msg.includes("headache")) {
    return "Headache can be caused by various reasons among that Headaches due to high screen time, empty stomach or migrane is very prominent";
  }
  else if (msg.includes("hi") || msg.includes("hello")) {
    return "Hello! 👋 How can I help you today?";
  } else {
    return "I'm MediBot. Please describe your symptoms or ask a question.";
  }
}

// Save chat history to sessionStorage
function saveChatHistory() {
  sessionStorage.setItem("chatHistory", chatbox.innerHTML);
}

// Restore chat history from sessionStorage
function restoreChatHistory() {
  const history = sessionStorage.getItem("chatHistory");
  if (history) {
    chatbox.innerHTML = history;
    chatbox.scrollTop = chatbox.scrollHeight;
  }
}
