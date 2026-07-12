// ── TAB DISGUISE SYSTEM ─────────────────────────────────────────────
const DISGUISE_KEY = 'mgv_disguise';

function getDisguise() {
    try { 
        return JSON.parse(localStorage.getItem(DISGUISE_KEY)); 
    } catch { 
        return null; 
    }
}

function applyDisguise(icon, name) {
    const data = { icon, name };
    try { 
        localStorage.setItem(DISGUISE_KEY, JSON.stringify(data)); 
    } catch {}
    _applyToDOM(icon, name);
}

function clearDisguise() {
    try { 
        localStorage.removeItem(DISGUISE_KEY); 
    } catch {}
    
    // Use the real app name — do NOT read document.title / #page-title because
    // setting document.title also mutates that element, so it already holds the disguise name.
    const realTitle = 'Driftwood';
    const base = window.location.pathname.includes('gamefiles') ? '../' : '';
    const defaultIcon = base + 'favicon.png';
    
    _applyToDOM(defaultIcon, realTitle);
}

function _applyToDOM(icon, name) {
    // Always set title immediately — works even during head parsing
    document.title = name;

    function _swapFavicon() {
        const newFavicon = document.createElement('link');
        newFavicon.id = 'favicon-link';
        newFavicon.rel = 'icon';
        newFavicon.setAttribute('href', icon);

        if (icon.includes('.ico')) {
            newFavicon.setAttribute('type', 'image/x-icon');
        } else if (icon.includes('.webp')) {
            newFavicon.setAttribute('type', 'image/webp');
        } else {
            newFavicon.setAttribute('type', 'image/png');
        }

        const existing = document.getElementById('favicon-link') || document.querySelector("link[rel*='icon']");
        if (existing && existing.parentNode) {
            existing.parentNode.replaceChild(newFavicon, existing);
        } else {
            document.head.appendChild(newFavicon);
        }
    }

    // Favicon swap requires document.head to exist
    if (document.head) {
        _swapFavicon();
    } else {
        // Script is executing inside <head> before it has finished parsing —
        // defer the favicon swap to DOMContentLoaded
        document.addEventListener('DOMContentLoaded', _swapFavicon, { once: true });
    }
}

// SAFE EXECUTION ENGINE
// Sets the title IMMEDIATELY (sync) to prevent the real title flashing,
// then swaps the favicon once the DOM is ready.
(function _initTabDisguise() {
    const saved = getDisguise();
    if (!saved || !saved.icon || !saved.name) return;

    // Title can be set synchronously right now — no DOM needed
    document.title = saved.name;

    // Favicon swap needs document.head
    function _swapFavicon() {
        const newFavicon = document.createElement('link');
        newFavicon.id = 'favicon-link';
        newFavicon.rel = 'icon';
        newFavicon.setAttribute('href', saved.icon);

        if (saved.icon.includes('.ico')) {
            newFavicon.setAttribute('type', 'image/x-icon');
        } else if (saved.icon.includes('.webp')) {
            newFavicon.setAttribute('type', 'image/webp');
        } else {
            newFavicon.setAttribute('type', 'image/png');
        }

        const existing = document.getElementById('favicon-link') || document.querySelector("link[rel*='icon']");
        if (existing && existing.parentNode) {
            existing.parentNode.replaceChild(newFavicon, existing);
        } else if (document.head) {
            document.head.appendChild(newFavicon);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', _swapFavicon, { once: true });
    } else {
        _swapFavicon();
    }
})();
