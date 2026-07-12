// ── HISTORY ──────────────────────────────────────────────────
const HISTORY_KEY = 'mgv_history';

function getHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }
    catch { return []; }
}

function recordPlay(game) {
    const history = getHistory();
    const idx = history.findIndex(g => g.file === game.file);
    if (idx !== -1) history.splice(idx, 1);
    history.unshift({ file: game.file, title: game.title });
    if (history.length > 60) history.length = 60;
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); }
    catch {}
}

// ── CARD BUILDER ─────────────────────────────────────────────
const inGameDir = window.location.pathname.includes('/gamefiles/');
const base = inGameDir ? '../' : '';

function getGameImg(game) {
    if (!game.img) return `${base}favicon.png`;
    const isUrl = /^https?:\/\/|^\/\//.test(game.img);
    return isUrl ? game.img : `${base}gameimages/${game.img}`;
}

function buildCard(game) {
    const a = document.createElement('a');
    a.className = 'game-link';

    const onHub = !inGameDir && typeof openGameOverlay === 'function';
    if (onHub) {
        a.href = '#';
        a.addEventListener('click', e => {
            e.preventDefault();
            openGameOverlay(game);
        });
    } else {
        a.href = `${base}gamefiles/${game.file}`;
        a.addEventListener('click', () => recordPlay(game));
    }

    const img = document.createElement('img');
    img.src = getGameImg(game);
    img.alt = game.title;
    img.loading = 'lazy';
    img.onerror = () => { img.src = `${base}favicon.png`; };

    const label = document.createElement('div');
    label.className = 'card-title';
    label.textContent = game.title;

    a.appendChild(img);
    a.appendChild(label);
    return a;
}

// ── UNIVERSAL SEARCH INDEX ──────────────────────────────────────
// Pulls together every catalog on the site (games, movies, TV, anime,
// comics, apps) into one flat, searchable list.
function isPlaceholderTitle(title) {
    return /add another|your pick|add a /i.test(title || '');
}

function getUnifiedCatalog() {
    const items = [];
    if (typeof GAMES !== 'undefined') {
        GAMES.forEach(g => items.push({ type: 'game', label: 'Game', icon: '🎮', title: g.title, img: getGameImg(g), data: g }));
    }
    if (typeof MOVIES !== 'undefined') {
        MOVIES.forEach(m => { if (!isPlaceholderTitle(m.title)) items.push({ type: 'movie', label: 'Movie', icon: '🎬', title: m.title, img: m.posterImage || m.heroImage, data: m }); });
    }
    if (typeof TV_CATALOG !== 'undefined') {
        TV_CATALOG.forEach(t => { if (!isPlaceholderTitle(t.title)) items.push({ type: 'tv', label: 'TV Show', icon: '📺', title: t.title, img: t.coverThumb || t.thumb, data: t }); });
    }
    if (typeof ANIME_CATALOG !== 'undefined') {
        ANIME_CATALOG.forEach(a => { if (!isPlaceholderTitle(a.title)) items.push({ type: 'anime', label: 'Anime', icon: '⛩️', title: a.title, img: a.coverThumb || a.thumb, data: a }); });
    }
    if (typeof MANGA_CATALOG !== 'undefined') {
        MANGA_CATALOG.forEach(m => { if (!isPlaceholderTitle(m.title)) items.push({ type: 'comic', label: 'Comic', icon: '📚', title: m.title, img: m.coverUrl, data: m }); });
    }
    if (typeof APPS !== 'undefined') {
        APPS.forEach(a => items.push({ type: 'app', label: 'App', icon: '🧩', title: a.name, img: a.icon, data: a }));
    }
    return items;
}

function openUnifiedResult(item) {
    const dropdown = document.getElementById('search-dropdown');
    switch (item.type) {
        case 'game':
            if (typeof openGameOverlay === 'function') openGameOverlay(item.data);
            break;
        case 'movie':
            showSection('streaming');
            setTimeout(() => { const idx = MOVIES.indexOf(item.data); if (idx !== -1) openMovieView(idx); }, 60);
            break;
        case 'tv':
            showSection('streaming');
            setTimeout(() => openTVSeries(item.data), 60);
            break;
        case 'anime':
            showSection('streaming');
            setTimeout(() => openAnimeSeries(item.data), 60);
            break;
        case 'comic':
            showSection('manga');
            setTimeout(() => openMangaShelf(item.data), 60);
            break;
        case 'app':
            if (typeof openApp === 'function') openApp(item.data);
            break;
    }
    if (dropdown) dropdown.style.display = 'none';
}

function buildUnifiedResultCard(item) {
    const card = document.createElement('div');
    card.className = 'unified-result-card';
    card.innerHTML = `
        <div class="unified-result-thumb">
            <img src="${item.img || ''}" alt="${item.title}" loading="lazy" onerror="this.style.display='none'">
        </div>
        <div class="unified-result-title">${item.title}</div>
        <div class="unified-result-type">${item.icon} ${item.label}</div>
    `;
    card.addEventListener('click', () => openUnifiedResult(item));
    return card;
}

// ── HEADER SEARCH (glassmorphism, searches everything) ──────────
(function initHeaderSearch() {
    const toggle   = document.getElementById('search-toggle');
    const dropdown = document.getElementById('search-dropdown');
    const input    = document.getElementById('header-search');
    const results  = document.getElementById('search-results');
    if (!toggle || !dropdown || !input) return;

    toggle.addEventListener('click', () => {
        const open = dropdown.style.display !== 'none';
        dropdown.style.display = open ? 'none' : 'block';
        if (!open) setTimeout(() => input.focus(), 50);
    });

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        results.innerHTML = '';
        if (!q) return;
        const hits = getUnifiedCatalog().filter(item => item.title.toLowerCase().includes(q)).slice(0, 18);
        if (!hits.length) { results.innerHTML = '<p class="no-results">No results. Try a different search!</p>'; return; }
        hits.forEach(item => results.appendChild(buildUnifiedResultCard(item)));
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { dropdown.style.display = 'none'; }
    });
    document.addEventListener('click', e => {
        if (!e.target.closest('.search-dropdown') && !e.target.closest('#search-toggle')) {
            dropdown.style.display = 'none';
        }
    });
}());

// ── SURPRISE ME (picks a random item from every catalog) ────────
function surpriseMeGlobal() {
    const pool = getUnifiedCatalog();
    if (!pool.length) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    openUnifiedResult(pick);
}

// ── FOG + PARTICLE ATMOSPHERE (with theme-aware colors & optional nets) ─────
function getParticleConfig() {
    const def = window._currentThemeDef;
    if (def) {
        return {
            color: def.particleColor || '#5fc7b0',
            glow:  def.particleGlow  || def.particleColor || '#5fc7b0',
            showNets: def.showNets || false,
            netColor: def.netColor  || 'rgba(255,255,255,0.12)',
        };
    }
    return {
        color: '#5fc7b0',
        glow:  '#5fc7b0',
        showNets: false,
        netColor: 'rgba(255,255,255,0.12)',
    };
}

function initNetwork() {
    if (window._fogInitialized) return;
    window._fogInitialized = true;

    let mouseXRaw = 0, mouseYRaw = 0;

    document.addEventListener('mousemove', e => {
        mouseXRaw = e.clientX;
        mouseYRaw = e.clientY;
    });

    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const PARTICLE_COUNT = 65;
    const particles = [];

    class Particle {
        constructor() {
            this.reset();
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
        reset() {
            this.x            = Math.random() * canvas.width;
            this.y            = Math.random() * canvas.height;
            this.size         = Math.random() * 2 + 0.5;
            this.speedX       = (Math.random() - 0.5) * 0.4;
            this.speedY       = (Math.random() - 0.5) * 0.4;
            this.alpha        = Math.random();
            this.twinkleSpeed = 0.01 + Math.random() * 0.02;
            this.glowRadius   = Math.random() * 6 + 4;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha += this.twinkleSpeed;
            if (this.alpha > 1 || this.alpha < 0) this.twinkleSpeed = -this.twinkleSpeed;

            const dx = mouseXRaw - this.x;
            const dy = mouseYRaw - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130 && dist > 0) {
                const force = (130 - dist) / 130;
                this.x -= (dx / dist) * force * 2;
                this.y -= (dy / dist) * force * 2;
            }

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
                if (Math.random() > 0.5) this.x = Math.random() > 0.5 ? 0 : canvas.width;
                else                      this.y = Math.random() > 0.5 ? 0 : canvas.height;
            }
        }
        draw(cfg) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
            ctx.shadowBlur  = this.glowRadius;
            ctx.shadowColor = cfg.glow;
            ctx.fillStyle   = cfg.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function drawNets(cfg) {
        const NET_DIST = 120;
        ctx.save();
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < NET_DIST) {
                    const alpha = (1 - dist / NET_DIST) * 0.6;
                    ctx.globalAlpha = alpha;
                    ctx.strokeStyle = cfg.netColor;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
            // Connect to mouse too
            const dxm = mouseXRaw - particles[i].x;
            const dym = mouseYRaw - particles[i].y;
            const mdist = Math.sqrt(dxm * dxm + dym * dym);
            if (mdist < NET_DIST * 1.4) {
                const alpha = (1 - mdist / (NET_DIST * 1.4)) * 0.7;
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = cfg.netColor;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouseXRaw, mouseYRaw);
                ctx.stroke();
            }
        }
        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cfg = getParticleConfig();
        if (cfg.showNets) drawNets(cfg);
        particles.forEach(p => { p.update(); p.draw(cfg); });
        requestAnimationFrame(animate);
    }
    animate();
}
