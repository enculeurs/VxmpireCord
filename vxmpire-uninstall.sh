#!/bin/bash
set -e

INSTALL_DIR="$HOME/Library/Application Support/Vxmpire"
INSTALLER_DIR="$INSTALL_DIR/installer"
EQUILOTL_BIN="$INSTALLER_DIR/Equilotl.app/Contents/MacOS/Equilotl"

echo "============================================="
echo "             VXMPIRE UNINSTALLER             "
echo "      Désinstallation de Discord (macOS)     "
echo "============================================="
echo ""

if [ ! -f "$EQUILOTL_BIN" ]; then
    echo "[ERREUR] L'installeur Equilotl est introuvable."
    echo "         Vxmpire n'est probablement pas installé ou le dossier de base a été supprimé."
    exit 1
fi

export EQUICORD_USER_DATA_DIR="$INSTALL_DIR"
export EQUICORD_DIRECTORY="$INSTALL_DIR/dist"
export EQUICORD_DEV_INSTALL="1"
export VXMPIRE_DIRECTORY="$INSTALL_DIR/dist"

# Lancer la désinstallation
"$EQUILOTL_BIN" --uninstall

echo ""
echo "============================================="
echo "  Vxmpire désinstallé avec succès !          "
echo "============================================="
