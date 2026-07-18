<div align="center">
  <img src="logo.png" width="96" height="96" alt="Vxmpire Logo">

# Vxmpire

**A custom Discord client built for people who actually care about how Discord runs.**

[![Haunt](https://img.shields.io/badge/Haunt-see%20my%20links-8b0000?logo=ghost&logoColor=white)](https://haunt.gg/vn)
[![License](https://img.shields.io/badge/license-GPL%20v3-a855f7)](./LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows-3b82f6.svg?logo=windows\&logoColor=white)](https://source.vxmpire.st/vxmpire/vxmpire)
---

</div>

Vxmpire was created as a clean, safe, and fully open-source alternative to the popular client modification **Nightcord**. 

### ⚠️ The Nightcord Malware Risk
Independent security analysis (documented in this [threat investigation report](https://gist.github.com/ImMayunnaise/4341f7333de34524a0487effc4735ddb)) confirmed that the official Nightcord client distribution contains a malicious **Trojan-PSW (Password & Token Stealer)** payload. Additionally, the original authors cloned open-source projects (Vencord/Equicord) and erased all contributor history to hide their injection. Consequently, GitHub Security terminated and banned the official Nightcord repositories.

### 🛡️ What Vxmpire Does
Vxmpire builds on top of the clean, legitimate code of **Equicord** and **Vencord**. We stripped out all obfuscation, verified all files to ensure **zero token grabbers, backdoors, spyware, or trackers exist**, cleaned up the code, added custom visual themes, and kept only what works. No bloat, no nonsense, 100% clean and transparent.

---

## What's in it

* **Faster startup** — no obfuscation means the client loads noticeably quicker and sits lighter on your CPU and RAM.
* **Auto-updates** — checks for updates in the background on launch and applies them silently.
* **Plugin support** — compatible with the existing plugin ecosystem. Install community plugins straight from Git links.
* **Better audio** — hardware-optimized voice modules for cleaner, louder audio out of the box.
* **Custom styling** — smoother UI, custom icons, and various quality-of-life improvements.

---

## Installation (Windows)

1. Download **`vxmpire-install.ps1`**
2. Right-click → **Run with PowerShell**
3. Follow the steps, restart Discord, done.

---

## Building from source

### Requirements

* Git
* Node.js (LTS)
* pnpm

```bash
npm install -g pnpm
```

### Clone & Build

```bash
git clone https://source.vxmpire.st/vxmpire/vxmpire.git
cd vxmpire
pnpm install
pnpm build
```

### Inject into Discord

```bash
pnpm inject
```

### Restore stock Discord

```bash
pnpm uninject
```

---

## Repository

Source code:

https://github.com/enculeurs/VxmpireCord

---

## Credits

Vxmpire wouldn't exist without [Equicord](https://github.com/Equicord/Equicord) and [Vencord](https://github.com/Vendicated/Vencord). A huge chunk of what makes this work comes directly from their projects. We're fully aware of that and genuinely appreciate everything they've built — we're just taking it in a different direction. Big thanks to everyone who's contributed to both.

Vxmpire is developed by and credited to **@enculeurs** on Discord.


---

## Disclaimer

*Vxmpire is not affiliated with Discord Inc. in any way.*

Using third-party clients is technically against Discord's Terms of Service. Use at your own risk.
