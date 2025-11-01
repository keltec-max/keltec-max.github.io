#!/bin/bash
# Script automático de deploy no GitHub Pages

echo "🚀 Atualizando site Keltec-Max..."

# Adiciona tudo
git add .

# Mensagem automática com data e hora
msg="Atualização automática em $(date '+%d/%m/%Y %H:%M:%S')"
git commit -m "$msg"

# Envia pro GitHub
git push origin main

echo "✅ Site atualizado com sucesso!"
echo "🌐 Acesse: https://keltec-max.github.io"
