<script>
    import "focus-visible";
    import {onMount} from "svelte";

    // import Page from "./containers/Page.svelte";
    import Titlebar from "./common/Titlebar.svelte";
    import Footer from "./common/Footer.svelte";
    import Router from "svelte-spa-router";
    import routes from "./routes";

    let canvas;

    onMount(() => {
        const ctx = canvas.getContext("2d");
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const stars = [];
        const MAX = 12;

        function randomStar() {
            const angle = Math.random() * Math.PI * 0.25 + Math.PI * 0.1; // gentle diagonal
            const speed = Math.random() * 1.8 + 0.8;
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height * 0.6,
                len: Math.random() * 60 + 40,
                speed,
                dx: Math.cos(angle) * speed,
                dy: Math.sin(angle) * speed,
                opacity: Math.random() * 0.5 + 0.5,
                life: 0,
                maxLife: Math.floor(Math.random() * 90 + 60)
            };
        }

        function spawnStar() {
            if (stars.length < MAX && Math.random() < 0.03) {
                stars.push(randomStar());
            }
        }

        let raf;
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            spawnStar();

            for (let i = stars.length - 1; i >= 0; i--) {
                const s = stars[i];
                const t = s.life / s.maxLife;
                const alpha = s.opacity * Math.sin(t * Math.PI); // fade in/out

                const x2 = s.x - s.dx * (s.len / s.speed);
                const y2 = s.y - s.dy * (s.len / s.speed);

                const grad = ctx.createLinearGradient(x2, y2, s.x, s.y);
                grad.addColorStop(0, `rgba(255, 60, 90, 0)`);
                grad.addColorStop(1, `rgba(255, 100, 120, ${alpha})`);

                ctx.beginPath();
                ctx.moveTo(x2, y2);
                ctx.lineTo(s.x, s.y);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                s.x += s.dx;
                s.y += s.dy;
                s.life++;

                if (s.life >= s.maxLife) stars.splice(i, 1);
            }

            raf = requestAnimationFrame(draw);
        }

        draw();
        return () => cancelAnimationFrame(raf);
    });
</script>

<div class="main-window platform-{process.platform || "win32"}">
    <Titlebar macButtons={process.platform === "darwin"} />
    <main class="installer-body">
        <canvas bind:this={canvas} class="star-canvas" aria-hidden="true"></canvas>
        <div class="sections">
            <Router {routes} />
        </div>
        <Footer />
    </main>
</div>

<style>
    @import url("https://rsms.me/inter/inter.css");

    :global([data-focus-visible-added]) {
        box-shadow: 0 0 0 4px var(--accent-faded) !important;
    }

    :root {

        /* Primary backgrounds */
        --bg1: #060202;
        --bg2: #0a0404;
        --bg2-alt: #100607;
        --bg3: #160a0b;
        --bg3-alt: #1d0e10;
        --bg4: #281416;

        /* Text Colors */
        --text-light: #fcf2f3;
        --text-normal: #d5c8ca;
        --text-muted: #8e7073;
        --text-link: #ff3355;

        /* Accent colors */
        --accent: #e50914;
        --accent-hover: #b80710;
        --accent-faded: rgba(229, 9, 20, 0.4);

        /* Danger colors */
        --danger: #ff003c;
        --danger-hover: #cc0030;
        --danger-faded: rgba(255, 0, 60, 0.4);
    }

    :global(html),
    :global(body),
    :global(#app) {
        overflow: hidden;
        margin: 0;
        height: 100%;
        width: 100%;
    }

    :global(*),
    :global(*::after),
    :global(*::before) {
        box-sizing: border-box;
        -webkit-user-drag: none;
        font-family: "Inter", sans-serif;
        user-select: none;
        outline: none;
    }

    :global(a) {
        color: var(--accent);
        text-decoration: none;
    }

    :global(::selection) {
        background-color: var(--accent-faded);
        color: var(--text-normal);
    }

    :global(::-webkit-scrollbar) {
        width: 4px;
        height: 4px;
    }

    :global(::-webkit-scrollbar-thumb) {
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 4px;
    }

    :global(::-webkit-scrollbar-thumb:hover) {
        background-color: rgba(255, 255, 255, 0.075);
    }

    :global(::-webkit-scrollbar-thumb:active) {
        background-color: rgba(255, 255, 255, 0.1);
    }

    :global(::-webkit-scrollbar-corner) {
        display: none;
    }

    .main-window {
        display: flex;
        flex-direction: column;
        /* border-radius: 3px; */
        overflow: hidden;
        contain: strict;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
        /* margin: 11.5px 7.5px; */
        width: 100%;
        height: 100%;
        word-break: break-word;
    }

    .main-window.platform-darwin {
        border-radius: 0;
        box-shadow: none;
        width: 100%;
        height: 100%;
        margin: 0;
    }

    .installer-body {
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
        z-index: 1;
        padding: 20px;
        background: radial-gradient(var(--bg2) 50%, var(--bg2-alt));
        flex: 1;
    }

    .installer-body::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: var(--background);
        background-size: 60px;
        background-repeat: repeat;
        background-position: center;
        z-index: -1;
        opacity: 0.35;
        pointer-events: none;
        mask: radial-gradient(transparent, #000);
        -webkit-mask: radial-gradient(transparent, #000);
    }

    .star-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    }

    :global(.page) {
        flex: 1 1 auto;
        overflow: visible;
        display: flex;
        flex-direction: column;
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .sections {
        flex: 1 1 auto;
        overflow: visible;
        position: relative;
        z-index: 1;
    }
</style>