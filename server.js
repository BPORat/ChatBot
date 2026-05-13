import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

// Endpoint DeepSeek (OpenAI-compatible)
const DEEPSEEK_BASE_URL = "https://api.deepseek.com/v1/chat/completions";
// Modelo recomendado (puedes cambiar a deepseek-v4-pro)
const DEEPSEEK_MODEL = "deepseek-v4-flash";

if (!DEEPSEEK_API_KEY) {
  console.warn("⚠️ Falta DEEPSEEK_API_KEY en .env (solo necesario cuando ejecutes el backend).");
}

/**
 * buildDeepSeekRequest
 * Construye el payload para la API de DeepSeek.
 */
function buildDeepSeekRequest(userMessage, history = []) {
  const systemPrompt =
    "Eres un asistente conversacional útil, claro y conciso. Responde siempre en el mismo idioma que el usuario.";

  const messages = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: userMessage }
  ];

  return {
    model: DEEPSEEK_MODEL,
    messages,
    temperature: 0.7
  };
}

/**
 * mapHistoryToDeepSeekFormat
 * Adapta el historial del frontend al formato de DeepSeek (OpenAI-compatible).
 */
function mapHistoryToDeepSeekFormat(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter((item) => item && item.role && item.content)
    .map((item) => ({
      role: item.role,
      content: item.content
    }));
}

/**
 * handleChatRequest
 * Orquesta la petición de chat hacia DeepSeek.
 */
async function handleChatRequest(req, res) {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      return res
        .status(400)
        .json({ error: "El campo 'message' es obligatorio y debe ser texto." });
    }

    if (!DEEPSEEK_API_KEY) {
      return res.status(500).json({
        error:
          "El servidor no tiene configurada la clave de DeepSeek. Añádela en el archivo .env."
      });
    }

    const formattedHistory = mapHistoryToDeepSeekFormat(history);
    const deepSeekRequestBody = buildDeepSeekRequest(message, formattedHistory);

    const response = await axios.post(DEEPSEEK_BASE_URL, deepSeekRequestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`
      }
    });

    const aiMessage = response.data?.choices?.[0]?.message?.content?.trim();

    if (!aiMessage) {
      return res
        .status(500)
        .json({ error: "No se pudo obtener una respuesta válida de la IA (DeepSeek)." });
    }

    return res.json({ reply: aiMessage });
  } catch (error) {
    console.error("Error en /api/chat:", error.response?.data || error.message);
    return res
      .status(500)
      .json({ error: "Ocurrió un error al procesar la solicitud de la IA (DeepSeek)." });
  }
}

app.post("/api/chat", handleChatRequest);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Servidor de chatbot (DeepSeek) escuchando en http://localhost:${PORT}`);
});
