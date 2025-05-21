#!/bin/bash

# === Caminho absoluto da pasta do projeto ===
PROJETO="/home/publicsync"
cd "$PROJETO" || exit 1

# === Geração da data e nomes ===
DATA=$(date +%Y-%m-%d-%H%M)
MENSAGEM_COMMIT="🔒 Backup automático via backend em $DATA"
TAG="backup-$DATA"

echo "📦 Iniciando backup automático..."

# Adiciona arquivos ao stage
git add .

# Faz commit (não falha se não houver mudanças)
git commit -m "$MENSAGEM_COMMIT" >/dev/null 2>&1 || echo "📝 Nenhuma alteração para commitar."

# Cria a tag somente se ainda não existir
if ! git rev-parse "$TAG" >/dev/null 2>&1; then
  git tag "$TAG"
  echo "🏷️  Tag criada: $TAG"
else
  echo "⚠️  Tag já existe: $TAG"
fi

# Push da branch principal e da tag
git push origin main
git push origin "$TAG"

echo "✅ Backup finalizado com sucesso."

