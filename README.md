🧠 Chatbot IA Fullstack con DeepSeek
Un chatbot moderno y extensible construido con:

Frontend: HTML, CSS y JavaScript puro

Backend: Node.js + Express

IA: DeepSeek (API compatible con OpenAI)

Arquitectura limpia (Clean Code)

Listo para subir a GitHub sin instalar dependencias por ahora

🚀 Características
Chat en tiempo real con historial de conversación

Backend preparado para DeepSeek

Frontend 100% estático (ideal para GitHub Pages)

Código modular y fácil de mantener

Perfecto para personalizarlo como chatbot de ventas, soporte, educación, etc.

📁 Estructura del proyecto
Code
ai-chatbot/
│
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env.example
│   ├── .gitignore
│
└── frontend/
    ├── index.html
    ├── styles.css
    └── script.js
⚙️ Configuración del Backend (cuando decidas activarlo)
Entra a la carpeta del backend:

bash
cd backend
Copia el archivo de ejemplo:

bash
cp .env.example .env
Edita .env y coloca tu clave:

Code
DEEPSEEK_API_KEY=TU_API_KEY_AQUI
PORT=4000
Instala dependencias:

bash
npm install
Ejecuta el servidor:

bash
npm run dev
El backend quedará disponible en:

Code
http://localhost:4000
🌐 Configuración del Frontend
El frontend es completamente estático.
Puedes abrir index.html directamente o subirlo a GitHub Pages.

Si despliegas el backend en la nube, actualiza esta línea en script.js:

js
const API_BASE_URL = "https://TU_BACKEND_PUBLICO.com";
🧩 Cómo funciona
El usuario escribe un mensaje en el frontend.

El frontend envía el mensaje + historial al backend.

El backend llama a la API de DeepSeek.

DeepSeek genera una respuesta.

El backend la devuelve al frontend.

El frontend la muestra en pantalla.

🧪 Probar el proyecto localmente
Activa el backend.

Abre frontend/index.html en tu navegador.

Escribe un mensaje y la IA responderá.

🚀 Despliegue
🔸 Frontend (GitHub Pages)
Sube el repositorio a GitHub

Ve a Settings → Pages

Selecciona la carpeta /frontend

Guarda

Tu chatbot estará online

🔸 Backend (Railway / Render / Fly.io)
Sube la carpeta backend/

Configura la variable de entorno DEEPSEEK_API_KEY

Despliega

Copia la URL pública

Actualiza API_BASE_URL en script.js

🧠 Personalización
Puedes adaptar el chatbot para:

Atención al cliente

Ventas automatizadas

Asistente educativo

Generación de contenido

Soporte técnico

Chatbot para negocios locales

📜 Licencia
Este proyecto es libre para uso personal o comercial.

🙌 Contribuciones
¡Las contribuciones son bienvenidas!
Puedes abrir issues o enviar PRs.
