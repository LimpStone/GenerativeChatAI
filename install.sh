#!/bin/bash

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=========================================================${NC}"
echo -e "${GREEN}      Instalación de WhatsApp UI Clone con OpenAI        ${NC}"
echo -e "${GREEN}=========================================================${NC}"

# Verificar si estamos en Linux
if [[ "$OSTYPE" != "linux-gnu"* ]]; then
  echo -e "${RED}Este script está diseñado para Linux. Tu sistema operativo es $OSTYPE${NC}"
  exit 1
fi

# Paso 1: Verificar e instalar dependencias
echo -e "\n${YELLOW}Paso 1: Verificando e instalando dependencias necesarias...${NC}"

# Verificar Node.js
if ! command -v node &> /dev/null; then
  echo -e "${YELLOW}Node.js no está instalado. Instalando Node.js LTS...${NC}"
  # Instalar Node.js desde NodeSource
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
else
  NODE_VERSION=$(node -v)
  echo -e "${GREEN}Node.js ya está instalado: $NODE_VERSION${NC}"
fi

# Verificar npm
if ! command -v npm &> /dev/null; then
  echo -e "${YELLOW}npm no está instalado. Instalando npm...${NC}"
  sudo apt-get install -y npm
else
  NPM_VERSION=$(npm -v)
  echo -e "${GREEN}npm ya está instalado: $NPM_VERSION${NC}"
fi

# Instalar Bun (opcional, pero recomendado para mejor rendimiento)
if ! command -v bun &> /dev/null; then
  echo -e "${YELLOW}Bun no está instalado. Instalando Bun...${NC}"
  curl -fsSL https://bun.sh/install | bash
  # Recargar el PATH para incluir Bun sin reiniciar la terminal
  export PATH="$HOME/.bun/bin:$PATH"
else
  BUN_VERSION=$(bun -v)
  echo -e "${GREEN}Bun ya está instalado: $BUN_VERSION${NC}"
fi

# Paso 2: Instalar dependencias del proyecto
echo -e "\n${YELLOW}Paso 2: Instalando dependencias del proyecto...${NC}"
if command -v bun &> /dev/null; then
  echo -e "${GREEN}Usando Bun para instalar dependencias (más rápido)${NC}"
  bun install
else
  echo -e "${YELLOW}Usando npm para instalar dependencias${NC}"
  npm install
fi

# Paso 3: Configurar variables de entorno
echo -e "\n${YELLOW}Paso 3: Configurando variables de entorno...${NC}"

# Crear archivo .env.local si no existe
if [ ! -f .env.local ]; then
  echo -e "${YELLOW}Creando archivo .env.local para variables de entorno...${NC}"
  cat > .env.local << EOL
# Variables de entorno para WhatsApp UI Clone
# Agregar tu clave API de OpenAI aquí
OPENAI_API_KEY=

# Puerto para el servidor (opcional)
PORT=3000
EOL
  echo -e "${GREEN}Archivo .env.local creado. Por favor, edita este archivo y añade tu API key de OpenAI.${NC}"
  echo -e "${GREEN}Puedes editarlo con: nano .env.local${NC}"
else
  echo -e "${GREEN}El archivo .env.local ya existe.${NC}"
fi

# Paso 4: Construir la aplicación
echo -e "\n${YELLOW}Paso 4: Construyendo la aplicación...${NC}"
if command -v bun &> /dev/null; then
  bun run build
else
  npm run build
fi

# Paso 5: Configurar servicio PM2 (para mantener la aplicación en ejecución)
echo -e "\n${YELLOW}Paso 5: Configurando PM2 para mantener la aplicación en ejecución...${NC}"
if ! command -v pm2 &> /dev/null; then
  echo -e "${YELLOW}PM2 no está instalado. Instalando PM2 globalmente...${NC}"
  sudo npm install -g pm2
else
  echo -e "${GREEN}PM2 ya está instalado.${NC}"
fi

# Crear archivo de configuración para PM2
cat > ecosystem.config.js << EOL
module.exports = {
  apps: [{
    name: 'whatsapp-ui-clone',
    script: 'npm',
    args: 'start',
    cwd: '$(pwd)',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
EOL

echo -e "\n${GREEN}=========================================================${NC}"
echo -e "${GREEN}            Instalación completada                      ${NC}"
echo -e "${GREEN}=========================================================${NC}"
echo -e "\nPara iniciar la aplicación, ejecuta: ${YELLOW}pm2 start ecosystem.config.js${NC}"
echo -e "Para ver los logs: ${YELLOW}pm2 logs whatsapp-ui-clone${NC}"
echo -e "Para que la aplicación se inicie automáticamente al reiniciar: ${YELLOW}pm2 startup${NC} y sigue las instrucciones."
echo -e "\n${GREEN}Tu aplicación estará disponible en: http://tu-ip-servidor:3000${NC}"
echo -e "${RED}IMPORTANTE: Edita src/components/chat-area.tsx para añadir tu API key de OpenAI${NC}"
echo -e "${RED}O configura OPENAI_API_KEY en el archivo .env.local${NC}\n"
