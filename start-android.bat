@echo off
REM 📱 Script para iniciar Expo con Android en Windows

echo.
echo 🚀 Iniciando Expo para Android...
echo.

REM Verificar si se pasa --clean
if "%1"=="--clean" (
  echo 🧹 Limpiando cache...
  if exist .expo rmdir /s /q .expo
  if exist node_modules\.cache rmdir /s /q node_modules\.cache
)

REM Iniciar Expo
echo 📡 Iniciando servidor en puerto 8082...
echo.

call npx expo start --android

REM Instrucciones
echo.
echo ============================================
echo ✅ Servidor iniciado en puerto 8082
echo ============================================
echo.
echo 📱 En tu emulador Android:
echo    1. Abre Expo Go
echo    2. Escanea el QR que aparece arriba, O
echo    3. Ingresa la URL manualmente
echo.
echo 💡 Atajos disponibles:
echo    - Presiona 'a' para forzar Android
echo    - Presiona 'r' para recargar
echo    - Presiona 'c' para limpiar cache
echo    - Presiona 'q' para salir
echo.
