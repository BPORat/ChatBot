// Cuando despliegues el backend, cambia esta URL por la pública
const API_BASE_URL = "https://chatbot-production-6731.up.railway.app";


const chatMessagesElement = document.getElementById("chat-messages");
const chatFormElement = document.getElementById("chat-form");
const userInputElement = document.getElementById("user-input");

const conversationHistory = [];

/**
 * addMessageToHistory
 * Guarda el mensaje en el historial local.
 */
function addMessageToHistory(role, content) {
  conversationHistory.push({ role, content });
}

/**
 * createMessageRow
 * Crea el nodo HTML para un mensaje.
 */
function createMessageRow(role, content) {
  const row = document.createElement("div");
  row.classList.add("message-row", role);

  const bubble = document.createElement("div");
  bubble.classList.add("message-bubble");
  bubble.textContent = content;

  row.appendChild(bubble);
  return row;
}

/**
 * renderMessage
 * Pinta un mensaje en el contenedor de chat.
 */
function renderMessage(role, content) {
  const row = createMessageRow(role, content);
  chatMessagesElement.appendChild(row);
  chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
}

/**
 * setFormDisabled
 * Habilita o deshabilita el formulario mientras se espera respuesta.
 */
function setFormDisabled(isDisabled) {
  userInputElement.disabled = isDisabled;
  chatFormElement.querySelector("button").disabled = isDisabled;
}

/**
 * sendMessageToBackend
 * Envía el mensaje del usuario al backend de IA (DeepSeek).
 */
async function sendMessageToBackend(message) {
  const payload = {
    message,
    history: conversationHistory
  };

  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Error al comunicarse con el servidor.");
  }

  const data = await response.json();

  if (!data.reply) {
    throw new Error("Respuesta inválida del servidor.");
  }

  return data.reply;
}

/**
 * handleFormSubmit
 * Maneja el envío del formulario de chat.
 */
async function handleFormSubmit(event) {
  event.preventDefault();

  const userMessage = userInputElement.value.trim();
  if (!userMessage) return;

  renderMessage("user", userMessage);
  addMessageToHistory("user", userMessage);
  userInputElement.value = "";

  setFormDisabled(true);

  try {
    const aiReply = await sendMessageToBackend(userMessage);

    renderMessage("assistant", aiReply);
    addMessageToHistory("assistant", aiReply);
  } catch (error) {
    console.error(error);
    renderMessage(
      "assistant",
      "No pude conectar con el servidor de IA. Cuando lo tengas desplegado, esto funcionará automáticamente."
    );
  } finally {
    setFormDisabled(false);
    userInputElement.focus();
  }
}

chatFormElement.addEventListener("submit", handleFormSubmit);
