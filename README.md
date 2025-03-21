A chat interface inspired by WhatsApp that uses the MistralAI API to create an intelligent conversational assistant with the help of Same.
![brave_DXa0ZPdd5l](https://github.com/user-attachments/assets/f65e14b9-e1bd-4a26-820a-b26fc4ce4153)
## Features

- 🎨 WhatsApp Web-inspired user interface with dark theme
- 🤖 Integration with the OpenAI API for intelligent responses
- 💬 Fully functional chat experience
- 🌐 Responsive web application built with Next.js
- 🔄 "Typing..." indicator while responses are being generated
- 🚀 Easy to install and configure on Linux servers

## Quick Installation (Linux)

To install this application on a Linux server (like AWS), simply run the included installation script:

```bash
# Clone the repository
git clone [URL-DEL-REPOSITORIO]
cd whatsapp-ui-clone

# Make the script executable
chmod +x install.sh

# Run the installation script
./install.sh
```

The installation script:
1. Installs Node.js and npm if they are not present
2. Optionally installs Bun for better performance
3. Configures all necessary dependencies
4. Creates an environment variables file for your API key
5. Configures PM2 to keep the application running
6. Provides instructions to launch the application
   
## Manual Setup

If you prefer to set up manually:
```bash
# Install dependencies
npm install
# or with Bun (faster)
bun install

# Build the application
npm run build
# or with Bun
bun run build

# Start the server
npm start / npm run dev
# or with Bun
bun start
```

## MistralAi Setup

To connect with the MistralAi API:

1. Obtain an API key from [MistralAI](https://mistral.ai/)
2.Set it up in the `.env.local`:
   ```
   const client = new Mistral({ apiKey: "API HERE PAPI" });
   ```
## Customization

### Change Background
The chat background is currently set to black  `#0a0a0a`.You can modify this color in the `src/components/chat-area.tsx` file.

### Change Contact Name
To change the contact name, edit `src/components/chat-list.tsx`and modify "Novia otaku" to whatever you prefer.

### Add Custom Assistant Behavior
You can modify the assistant's behavior by editing the system message in the MistralAi code section on their platform:

## Running in Production

To keep the application running in production, a PM2 configuration is included:

```bash
# Start with PM2
pm2 start ecosystem.config.js

# Configure automatic start on reboot
pm2 startup
pm2 save

# View logs
pm2 logs whatsapp-ui-clone
```

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://platform.openai.com/)
- [ShadCN UI](https://ui.shadcn.com/)

## License

This project is licensed under the MIT license.

## Support

If you have any issues or questions, please open an issue in the repository.

---

Developed with ❤️
