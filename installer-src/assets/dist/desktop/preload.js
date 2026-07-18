// Vxmpire a9845058e8f6a9b01a7d249f1d4cea9766f66cd7
// Standalone: false
// Platform: win32
// Updater Disabled: false
"use strict";function l(e,o=300){let r;return function(...s){clearTimeout(r),r=setTimeout(()=>{e(...s)},o)}}var i=require("electron/renderer");var n=require("electron/renderer");function t(e,...o){return n.ipcRenderer.invoke(e,...o)}function _(e,...o){return n.ipcRenderer.sendSync(e,...o)}var c={},C=_("VencordGetPluginIpcMethodMap");for(let[e,o]of Object.entries(C)){let r=c[e]={};for(let[s,E]of Object.entries(o))r[s]=(...d)=>t(E,...d)}var T={themes:{uploadTheme:async(e,o)=>{throw new Error("uploadTheme is WEB only")},deleteTheme:e=>t("VencordDeleteTheme",e),getThemesDir:()=>t("VencordGetThemesDir"),getThemesList:()=>t("VencordGetThemesList"),getThemeData:e=>t("VencordGetThemeData",e),getSystemValues:()=>t("VencordGetThemeSystemValues"),openFolder:()=>t("VencordOpenThemesFolder")},updater:{getUpdates:()=>t("VencordGetUpdates"),update:()=>t("VencordUpdate"),rebuild:()=>t("VencordBuild"),getRepo:()=>t("VencordGetRepo"),downloadAndRun:e=>t("VxmpireDownloadAndRun",e)},settings:{get:()=>_("VencordGetSettings"),set:(e,o)=>t("VencordSetSettings",e,o),getSettingsDir:()=>t("VencordGetSettingsDir"),openFolder:()=>t("VencordOpenSettingsFolder")},quickCss:{get:()=>t("VencordGetQuickCss"),set:e=>t("VencordSetQuickCss",e),addChangeListener(e){n.ipcRenderer.on("VencordQuickCssUpdate",(o,r)=>e(r))},addThemeChangeListener(e){n.ipcRenderer.on("VencordThemeUpdate",()=>e())},openFile:()=>t("VencordOpenQuickCss"),openEditor:()=>t("VencordOpenMonacoEditor"),getEditorTheme:()=>_("VencordGetMonacoTheme")},native:{getVersions:()=>process.versions,openExternal:e=>t("VencordOpenExternal",e),getRendererCss:()=>t("VencordGetRendererCss"),onRendererCssUpdate:e=>{}},csp:{isDomainAllowed:(e,o)=>t("VencordCspIsDomainAllowed",e,o),removeOverride:e=>t("VencordCspRemoveOverride",e),requestAddOverride:(e,o,r)=>t("VencordCspRequestAddOverride",e,o,r)},tray:{setUpdateState:e=>n.ipcRenderer.send("VencordSetTrayUpdateState",e),onCheckUpdates:e=>{n.ipcRenderer.on("VencordTrayCheckUpdates",e)},onRepair:e=>{n.ipcRenderer.on("VencordTrayRepair",e)}},desktopCapture:{getSources:()=>t("VencordGetDesktopSources")},vxmpire:{getInstallerPrefs:()=>_("VxmpireGetInstallerPrefs"),checkVBCable:()=>t("VxmpireCheckVBCable"),installVBCable:()=>t("VxmpireInstallVBCable"),relaunch:()=>t("VxmpireRelaunchApp")},mellowtel:{setConsent:(e,o)=>t("VxmpireMellowtelSetConsent",e,o),getConsent:()=>_("VxmpireMellowtelGetConsent")},pluginHelpers:c,window:{setBackgroundMaterial:e=>t("VxmpireSetWindowBackgroundMaterial",e),setThumbarButtons:e=>t("SoundCordSetThumbarButtons",e),onThumbarClick:e=>{n.ipcRenderer.on("SoundCordThumbarButtonClick",(o,r)=>e(r))},removeThumbarClickListener:()=>{n.ipcRenderer.removeAllListeners("SoundCordThumbarButtonClick")}},worldBomb:{type:(e,o)=>t("WorldBombType",e,o),pressEnter:()=>t("WorldBombPressEnter"),pressBackspace:()=>t("WorldBombPressBackspace"),sequence:(e,o,r,s=-1,E=-1)=>t("WorldBombSequence",e,o,r,s,E),openWindow:(e,o,r,s,E,d,R,O,u)=>t("WorldBombOpenWindow",e,o,r,s,E,d,R,O,u),closeWindow:()=>t("WorldBombCloseWindow"),getCursorPos:()=>t("WorldBombGetCursorPos")},setContentProtection:e=>t("VxmpireSetContentProtection",e)};i.contextBridge.exposeInMainWorld("VencordNative",T);location.protocol!=="data:"?(t("VencordInitFileWatchers"),i.webFrame.executeJavaScript(`
            window.addEventListener('unhandledrejection', function(event) {
                const reason = event.reason;
                if (reason && (
                    (reason.name === 'AbortError') ||
                    (reason instanceof DOMException && reason.name === 'AbortError') ||
                    (typeof reason.message === 'string' && reason.message.includes('play() request was interrupted'))
                )) {
                    event.preventDefault();
                }
            });
        `),i.webFrame.executeJavaScript(_("VencordPreloadGetRendererJs")),require(process.env.DISCORD_PRELOAD),i.webFrame.executeJavaScript(`
            (function() {
                function patchTitle(t) {
                    return t ? t.replace(/Discord/g, 'Vxmpire') : t;
                }
                // Patch initial
                if (document.title) document.title = patchTitle(document.title);
                // Observe les changements futurs
                const titleEl = document.querySelector('title');
                if (titleEl) {
                    new MutationObserver(() => {
                        const cur = document.title;
                        const patched = patchTitle(cur);
                        if (cur !== patched) document.title = patched;
                    }).observe(titleEl, { childList: true });
                } else {
                    // Si <title> n'existe pas encore, attend le DOM
                    new MutationObserver((_, obs) => {
                        const el = document.querySelector('title');
                        if (!el) return;
                        obs.disconnect();
                        if (document.title) document.title = patchTitle(document.title);
                        new MutationObserver(() => {
                            const cur = document.title;
                            const patched = patchTitle(cur);
                            if (cur !== patched) document.title = patched;
                        }).observe(el, { childList: true });
                    }).observe(document.documentElement || document, { childList: true, subtree: true });
                }
            })()
        `)):(i.contextBridge.exposeInMainWorld("setCss",l(T.quickCss.set)),i.contextBridge.exposeInMainWorld("getCurrentCss",T.quickCss.get),i.contextBridge.exposeInMainWorld("getTheme",T.quickCss.getEditorTheme));
//# sourceURL=file:///VencordPreload
//# sourceMappingURL=vencord://preload.js.map
