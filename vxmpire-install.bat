@echo off
:: Wrapper .bat pour lancer vxmpire-install.ps1 facilement (double-clic)
title Vxmpire — Installation
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0vxmpire-install.ps1"
if %errorlevel% neq 0 pause
