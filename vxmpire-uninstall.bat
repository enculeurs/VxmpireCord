@echo off
:: Wrapper .bat pour lancer vxmpire-uninstall.ps1 facilement (double-clic)
title Vxmpire — Désinstallation
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0vxmpire-uninstall.ps1"
if %errorlevel% neq 0 pause
