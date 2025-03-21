
Una interfaz de chat inspirada en WhatsApp que utiliza la API de OpenAI para crear un asistente conversacional inteligente.

## Características

- 🎨 Interfaz de usuario inspirada en WhatsApp Web con tema oscuro
- 🤖 Integración con la API de OpenAI para respuestas inteligentes
- 💬 Experiencia de chat completamente funcional
- 🌐 Aplicación web responsive construida con Next.js
- 🔄 Indicador de "escribiendo..." mientras se generan respuestas
- 🚀 Fácil de instalar y configurar en servidores Linux

## Instalación Rápida (Linux)

Para instalar esta aplicación en un servidor Linux (como AWS), simplemente ejecuta el script de instalación incluido:

```bash
# Clonar el repositorio
git clone [URL-DEL-REPOSITORIO]
cd whatsapp-ui-clone

# Hacer el script ejecutable
chmod +x install.sh

# Ejecutar el script de instalación
./install.sh
```

El script de instalación:
1. Instala Node.js y npm si no están presentes
2. Opcionalmente instala Bun para mejor rendimiento
3. Configura todas las dependencias necesarias
4. Crea un archivo de variables de entorno para tu API key
5. Configura PM2 para mantener la aplicación en ejecución
6. Provee instrucciones para lanzar la aplicación

## Configuración Manual

Si prefieres configurar manualmente:

```bash
# Instalar dependencias
npm install
# o con Bun (más rápido)
bun install

# Construir la aplicación
npm run build
# o con Bun
bun run build

# Iniciar el servidor
npm start
# o con Bun
bun start
```

## Configuración de OpenAI

Para conectar con la API de OpenAI:

1. Obtén una clave API de [MistralAI](https://mistral.ai/)
2. Configúrala en el archivo `.env.local`:
   ```
   OPENAI_API_KEY=tu-clave-api-aquí
   ```
   O alternativamente, edita el archivo `src/components/chat-area.tsx` y reemplaza `YOUR_OPENAI_API_KEY` con tu clave.

## Personalización

### Cambiar el fondo
El fondo del chat actualmente está configurado como negro `#0a0a0a`. Puedes modificar este color en el archivo `src/components/chat-area.tsx`.

### Cambiar el nombre del contacto
Para cambiar el nombre del contacto, edita `src/components/chat-list.tsx` y modifica el nombre "Novia" por lo que prefieras.

### Añadir comportamiento personalizado del asistente
Puedes modificar el comportamiento del asistente editando el mensaje del sistema en la sección de código de OpenAI en `src/components/chat-area.tsx`:

```javascript
{
  role: 'system',
  content: 'Eres un asistente amable y útil. Responde siempre en español.'
}
```

## Ejecución en Producción

Para mantener la aplicación en ejecución en producción, se incluye una configuración de PM2:

```bash
# Iniciar con PM2
pm2 start ecosystem.config.js

# Configurar inicio automático al reiniciar
pm2 startup
pm2 save

# Ver logs
pm2 logs whatsapp-ui-clone
```

## Tecnologías Utilizadas

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://platform.openai.com/)
- [ShadCN UI](https://ui.shadcn.com/)

## Licencia

Este proyecto está disponible bajo la licencia MIT.

## Soporte

Si tienes problemas o preguntas, por favor abre un issue en el repositorio.

---

Desarrollado con ❤️
