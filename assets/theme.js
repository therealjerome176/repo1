// ── THEME & SETTINGS ENGINE ──────────────────────────────────────────────────
const SETTINGS_KEY = 'tae_settings';

const DEFAULTS = {
    theme: 'driftwood',
    accentColor: null,
    fontSize: 'normal',
    animationsEnabled: true,
    compactNav: false,
};

function getSettings() {
    try {
        const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
        // Theme always resets to default on page load
        delete saved.theme;
        return Object.assign({}, DEFAULTS, saved);
    }
    catch { return Object.assign({}, DEFAULTS); }
}

function saveSettings(settings) {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }
    catch {}
}

const THEME_DEFS = {
    'driftwood': {
        '--bg':      '#0b0e0d',
        '--surface': '#111614',
        '--surface2':'#181f1d',
        '--surface3':'#1e2724',
        '--text':    '#eeeef2',
        '--muted':   '#7a9490',
        '--border':  'rgba(255,255,255,0.07)',
        accent:      '#5fc7b0',
        accentFg:    '#020a08',
        heroImage:   'images/defaulthero.jpg',
        bgImage:     'images/defaulthero.jpg',
        particleColor: '#5fc7b0',
        particleGlow:  '#5fc7b0',
        showNets: false,
    },
    'obsidian-minimalist': {
        '--bg':      '#0a0a0c',
        '--surface': '#111113',
        '--surface2':'#1a1a1e',
        '--surface3':'#222228',
        '--text':    '#e8e8f0',
        '--muted':   '#ffffff',
        '--border':  'rgba(255,255,255,0.06)',
        accent:      '#c8c8da',
        accentFg:    '#0a0a0c',
        heroImage:   'images/obsidianminimalisthero.png',
        bgImage:     'images/obsidianminimalisthero.png',
        particleColor: 'rgba(200,200,220,0.8)',
        particleGlow:  'rgba(200,200,220,0.3)',
        showNets: false,
    },
    'cyberneon-lounge': {
        '--bg':      '#080816',
        '--surface': '#0d0d22',
        '--surface2':'#121230',
        '--surface3':'#16163c',
        '--text':    '#e0e8ff',
        '--muted':   '#ffffff',
        '--border':  'rgba(100,100,255,0.12)',
        accent:      '#00ffcc',
        accentFg:    '#020d10',
        heroImage:   'images/cyberneonloungehero.png',
        bgImage:     'images/cyberneonloungehero.png',
        particleColor: '#00ffcc',
        particleGlow:  '#00ffcc',
        showNets: false,
    },
    'vintage-tokyo': {
        '--bg':      '#1a100a',
        '--surface': '#221408',
        '--surface2':'#2c1a0c',
        '--surface3':'#36200e',
        '--text':    '#f7f4f0',
        '--muted':   '#ffffff',
        '--border':  'rgba(247,228,238,0.1)',
        accent:      '#A8534C',
        accentFg:    '#1a0a02',
        heroImage:   'images/vintagetokyohero.png',
        bgImage:     'images/vintagetokyohero.png',
        particleColor: '#A8534C',
        particleGlow:  '#eb46e6',
        showNets: false,
    },
    'nord-matrix': {
        '--bg':      '#0d1117',
        '--surface': '#161b22',
        '--surface2':'#1c2128',
        '--surface3':'#222831',
        '--text':    '#cdd9e5',
        '--muted':   '#4a6070',
        '--border':  'rgba(57,211,83,0.12)',
        accent:      '#b2ccd1',
        accentFg:    '#020d04',
        heroImage:   'images/nordmatrixhero.png',
        bgImage:     'images/nordmatrixhero.png',
        particleColor: '#b2ccd1',
        particleGlow:  '#b2cdfe',
        showNets: false,
    },
    'coastal-drift': {
        '--bg':      '#051018',
        '--surface': '#081520',
        '--surface2':'#0c1e2d',
        '--surface3':'#10273a',
        '--text':    '#c8e8f8',
        '--muted':   '#4a6880',
        '--border':  'rgba(70,160,220,0.12)',
        accent:      '#48cae4',
        accentFg:    '#020810',
        heroImage:   'images/coastaldrifthero.png',
        bgImage:     'images/coastaldrifthero.png',
        particleColor: '#5fc7b0',
        particleGlow:  '#5fc7b0',
        showNets: false,
    },
    'simple-light': {
        '--bg':      '#ffffff',
        '--surface': '#f8f8fa',
        '--surface2':'#f0f0f4',
        '--surface3':'#e8e8ee',
        '--text':    '#313138',
        '--muted':   '#ffffff',
        '--border':  'rgba(0,0,0,0.08)',
        accent:      '#3f3f45',
        accentFg:    '#cbcbcb',
        heroImage:   null,
        bgImage:     null,
        particleColor: '#aaaacc',
        particleGlow:  '#aaaacc',
        netColor:    'rgba(180,180,200,0.35)',
        showNets: true,
    },
    'simple-dark': {
        '--bg':      '#0f0f0f',
        '--surface': '#1a1a1a',
        '--surface2':'#222222',
        '--surface3':'#2a2a2a',
        '--text':    '#ffffff',
        '--muted':   '#888888',
        '--border':  'rgba(255,255,255,0.08)',
        accent:      '#ffffff',
        accentFg:    '#0f0f0f',
        heroImage:   null,
        bgImage:     null,
        particleColor: 'rgba(255,255,255,0.9)',
        particleGlow:  'rgba(255,255,255,0.5)',
        netColor:    'rgba(255,255,255,0.18)',
        showNets: true,
    },
};

// Expose current theme config globally for particle system
window._currentThemeDef = null;
window._currentThemeName = 'driftwood';

function applyTheme(settings) {
    const root = document.documentElement;
    const def = THEME_DEFS[settings.theme];

    if (def) {
        const cssVars = ['--bg','--surface','--surface2','--surface3','--text','--muted','--border'];
        cssVars.forEach(k => { if (def[k]) root.style.setProperty(k, def[k]); });

        // Use theme's accent unless user has overridden it
        const accentColor = settings.accentColor || def.accent || '#5fc7b0';
        root.style.setProperty('--accent', accentColor);
        const hex = accentColor.replace('#','');
        const r = parseInt(hex.slice(0,2),16)||128, g = parseInt(hex.slice(2,4),16)||128, b = parseInt(hex.slice(4,6),16)||128;
        const lum = (0.299*r + 0.587*g + 0.114*b) / 255;
        root.style.setProperty('--accent-fg', lum > 0.5 ? '#000000' : '#ffffff');

        window._currentThemeDef = def;
        window._currentThemeName = settings.theme;
    } else {
        // Legacy fallback
        const legacyThemes = {
            dark:     { '--bg':'#0b0e0d','--surface':'#111614','--surface2':'#181f1d','--surface3':'#1e2724','--text':'#eeeef2','--muted':'#7a9490','--border':'rgba(255,255,255,0.07)' },
            midnight: { '--bg':'#06060e','--surface':'#0e0e18','--surface2':'#141420','--surface3':'#1a1a28','--text':'#e4e4f4','--muted':'#5858a0','--border':'rgba(100,100,200,0.1)' },
            light:    { '--bg':'#f2f2f6','--surface':'#ffffff','--surface2':'#eaeaef','--surface3':'#e0e0e8','--text':'#0f0f13','--muted':'#6666aa','--border':'rgba(0,0,0,0.07)' },
            gold:     { '--bg':'#0a0900','--surface':'#131100','--surface2':'#1c1800','--surface3':'#231e00','--text':'#fff8e7','--muted':'#9a8820','--border':'rgba(244,196,1,0.1)' },
        };
        const palette = legacyThemes[settings.theme] || legacyThemes.dark;
        for (const [k, v] of Object.entries(palette)) root.style.setProperty(k, v);
        const accentColor = settings.accentColor || '#5fc7b0';
        root.style.setProperty('--accent', accentColor);
        const hex = accentColor.replace('#','');
        const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
        const lum = (0.299*r + 0.587*g + 0.114*b) / 255;
        root.style.setProperty('--accent-fg', lum > 0.5 ? '#000000' : '#ffffff');
        window._currentThemeDef = null;
        window._currentThemeName = settings.theme;
    }

    const fontSizes = { small: '14px', normal: '16px', large: '18px' };
    root.style.setProperty('--base-font-size', fontSizes[settings.fontSize] || '16px');

    const applyBodyTheme = () => {
        document.body.style.fontSize = fontSizes[settings.fontSize] || '16px';
        document.body.dataset.theme = settings.theme;
        applyThemeImages(settings.theme);
    };

    if (document.body) {
        applyBodyTheme();
    } else {
        document.addEventListener('DOMContentLoaded', applyBodyTheme);
    }

    // Notify particle system to update colors
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: settings.theme } }));
}

// Two-layer crossfade state
window._bgActive = { hero: 'a', section: 'a' };

function _crossfade(idA, idB, slot, newImage) {
    const layerA = document.getElementById(idA);
    const layerB = document.getElementById(idB);
    if (!layerA || !layerB) return;

    const active = window._bgActive[slot];
    const front  = active === 'a' ? layerA : layerB;
    const back   = active === 'a' ? layerB : layerA;

    if (newImage) {
        // Load new image on the back layer (invisible), then swap
        back.style.backgroundImage = `url('${newImage}')`;
        // Force reflow so transition fires
        void back.offsetWidth;
        back.style.opacity   = '1';
        front.style.opacity  = '0';
        window._bgActive[slot] = active === 'a' ? 'b' : 'a';
    } else {
        // No image — fade both out
        front.style.opacity = '0';
        back.style.opacity  = '0';
        setTimeout(() => {
            front.style.backgroundImage = '';
            back.style.backgroundImage  = '';
        }, 600);
    }
}

function applyThemeImages(themeName) {
    const def = THEME_DEFS[themeName];
    _crossfade('hero-bg-layer', 'hero-bg-layer-b', 'hero',
               def && def.heroImage ? def.heroImage : null);
    _crossfade('section-bg-layer', 'section-bg-layer-b', 'section',
               def && def.bgImage ? def.bgImage : null);
}

// Apply immediately on script load to prevent flash
(function() {
    applyTheme(getSettings());
}());
