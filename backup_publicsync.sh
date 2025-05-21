#!/bin/bash

# === Caminho absoluto da pasta do projeto ===
PROJETO="/home/publicsync"
cd "$PROJETO" || exit 1

# === Verifica conexão com o repositório remoto ===
echo "🔌 Testando conexão com o Git remoto..."
if git ls-remote &>/dev/null; then
  echo "✅ Conexão com o Git remoto OK."
else
  echo "❌ Falha na conexão com o Git remoto. Abortando backup."
  exit 1
fi

# === Geração de data e hora ===
DATA=$(date +%Y-%m-%d-%H%M)
MENSAGEM_COMMIT="💾 Backup automático via backend em $DATA"
TAG="backup-$DATA"

echo "📦 Iniciando backup automático..."

# Adiciona arquivos ao stage
git add .

# Faz commit se houver alterações
if git diff --cached --quiet; then
  echo "📝 Nenhuma alteração para commitar."
else
  git commit -m "$MENSAGEM_COMMIT"
  echo "📌 Commit realizado: $MENSAGEM_COMMIT"
fi

# Cria tag se ainda não existir
if ! git rev-parse "$TAG" >/dev/null 2>&1; then
  git tag "$TAG"
  echo "🏷️  Tag criada: $TAG"
else
  echo "⚠️  Tag já existe: $TAG"
fi

# Push para o repositório remoto
git push origin main
git push origin "$TAG"

echo "✅ Backup finalizado com sucesso."
