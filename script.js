const chatInput = document.querySelector (".chat-input textarea");
const sendChatBtn = document.querySelector (".chat-input span");
const chatbox = document.querySelector (".chatbox");
const chatbotToggler = document.querySelector (".chatbot-toggler");
const chatbotCloseBtn = document.querySelector (".close-btn");


let userMessage;
const API_KEY = "";

const createChatLi = (message, className) => {
    //Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify ({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]


        })
    }
}

const handleChat = () => {
    userMessage = chatInput.value.trim ();
    if (!userMessage) return;

    //Append the user's message to chatbox
    chatbox.appendChild(createChatLi (userMessage, "outgoing"));

    setTimeout (() => {
        //Display "Thinking..." message while waiting for the response
        chatbox.appendChild(createChatLi ("Pensando...", "incoming"));
        generateResponse();
    }, 600);
    
    chatbox.scrollTo(0, chatbox.scrollHeight);
    chatInput.value = '';

}
sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));