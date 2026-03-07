@echo off
echo Starting SciAsk Backend Server...
cd /d "%~dp0backend"
node server.js
pause
