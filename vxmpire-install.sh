#!/bin/bash
set -e

# Configuration
REPO="vxmpirefr/vxmpire"
EQUILOTL_URL="https://github.com/Equicord/Equilotl/releases/latest/download/Equilotl.MacOS.zip"
INSTALL_DIR="$HOME/Library/Application Support/Vxmpire"
DIST_DIR="$INSTALL_DIR/dist"
INSTALLER_DIR="$INSTALL_DIR/installer"
ZIP_PATH="$INSTALL_DIR/vxmpire-dist.zip"
EQUILOTL_ZIP="$INSTALLER_DIR/Equilotl.MacOS.zip"
EQUILOTL_APP="$INSTALLER_DIR/Equilotl.app"
EQUILOTL_BIN="$EQUILOTL_APP/Contents/MacOS/Equilotl"

echo "============================================="
echo "             VXMPIRE INSTALLER               "
echo "        Injection dans Discord (macOS)       "
echo "============================================="
echo ""

# Créer les répertoires
mkdir -p "$INSTALL_DIR"
mkdir -p "$INSTALLER_DIR"
mkdir -p "$DIST_DIR"

# 1. Télécharger / Mettre à jour Equilotl
echo "[1/3] Vérification de l'outil d'installation..."
if [ ! -f "$EQUILOTL_BIN" ]; then
    echo "      Téléchargement de l'installeur macOS..."
    curl -L -o "$EQUILOTL_ZIP" "$EQUILOTL_URL"
    unzip -o -q "$EQUILOTL_ZIP" -d "$INSTALLER_DIR"
    rm -f "$EQUILOTL_ZIP"
    # Supprimer la quarantaine macOS sur l'application téléchargée pour éviter les alertes de sécurité
    xattr -dr com.apple.quarantine "$EQUILOTL_APP" 2>/dev/null || true
    chmod +x "$EQUILOTL_BIN"
    echo "      ✓ Installeur prêt."
else
    echo "      ✓ Installeur déjà présent."
fi

# 2. Télécharger les fichiers Vxmpire
echo "[2/3] Téléchargement des fichiers Vxmpire depuis GitHub..."
API_URL="https://api.github.com/repos/$REPO/releases/latest"
RELEASE_JSON=$(curl -s "$API_URL")

VERSION=$(echo "$RELEASE_JSON" | grep -o '"tag_name": "[^"]*' | head -n 1 | cut -d'"' -f4)
DOWNLOAD_URL=$(echo "$RELEASE_JSON" | grep -o '"browser_download_url": "[^"]*' | grep "vxmpire-dist.zip" | head -n 1 | cut -d'"' -f4)

if [ -z "$DOWNLOAD_URL" ]; then
    echo "[ERREUR] Impossible de trouver 'vxmpire-dist.zip' dans la dernière release."
    exit 1
fi

echo "      Version détectée : $VERSION"
echo "      Téléchargement en cours..."
curl -L -o "$ZIP_PATH" "$DOWNLOAD_URL"

# Extraire proprement
echo "      Extraction..."
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"
unzip -o -q "$ZIP_PATH" -d "$DIST_DIR"
rm -f "$ZIP_PATH"

echo "$VERSION" > "$INSTALL_DIR/version.txt"
echo "      ✓ Fichiers Vxmpire prêts."

# 3. Lancer l'injection
echo "[3/3] Lancement de l'interface d'injection..."
echo "      Sélectionnez le Discord cible dans la fenêtre qui s'ouvre."
echo ""

export EQUICORD_USER_DATA_DIR="$INSTALL_DIR"
export EQUICORD_DIRECTORY="$DIST_DIR"
export EQUICORD_DEV_INSTALL="1"
export VXMPIRE_DIRECTORY="$DIST_DIR"

# Lancer Equilotl
"$EQUILOTL_BIN" --install

echo ""
echo "============================================="
echo "  Vxmpire installé avec succès !             "
echo "  Redémarrez Discord pour appliquer.         "
echo "============================================="
