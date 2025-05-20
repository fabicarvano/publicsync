#!/bin/bash

# === CONFIGURAÇÕES ===
DATA=$(date +"%Y%m%d-%H%M") # Exemplo: 20250520-1230
DESTINO="/home/backup_publisync-$DATA.zip"

# === REMOVER BACKUP ANTIGO (opcional) ===
# rm -f /home/backup_publisync-*.zip

# === CRIAR BACKUP DO PROJETO, EXCLUINDO ARQUIVOS DESNECESSÁRIOS ===
echo "📦 Criando backup do projeto PubliSync..."

zip -r "$DESTINO" /home/publicsync \
  -x "**/node_modules/*" \
     "**/venv/*" \
     "**/__pycache__/*" \
     "**/*.pyc" \
     "**/.git/*" \
     "**/.DS_Store" \
     "**/dist/*" \
     "**/.env" \
     "**/.next/*" \
     "**/*.log" \
     "**/coverage/*" \
     "**/build/*" \
  > /dev/null

echo "✅ Backup criado com sucesso em: $DESTINO"
