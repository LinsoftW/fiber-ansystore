#!/bin/bash
# 📱 Script para iniciar Expo con Android

echo "🚀 Iniciando Expo para Android..."
cd "$(dirname "$0")"

# Limpiar cache si se pasa --clean
if [ "$1" = "--clean" ]; then
  echo "🧹 Limpiando caché..."
  rm -rf .expo
  rm -rf node_modules/.cache
fi

# Iniciar Expo
echo "📡 Iniciando servidor en puerto 8082..."
npx expo start --android

# Instrucciones
echo ""
echo "✅ Servidor iniciado!"
echo ""
echo "📱 En tu emulador Android:"
echo "  1. Abre Expo Go"
echo "  2. Escanea el QR que aparece arriba O"
echo "  3. Ingresa la URL manualmente"
echo ""
echo "💡 Presiona 'a' en esta consola para forzar Android"
echo "💡 Presiona 'r' para recargar"
echo "💡 Presiona 'c' para limpiar caché"
echo "💡 Presiona 'q' para salir"
