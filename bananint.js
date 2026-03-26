// BananINT - Ultimate Transformation Script (V4 - High Perf)
document.addEventListener('DOMContentLoaded', () => {
    const replacements = [
        ["Croissanté", "Banané"],
        ["Croissant", "Banane"],
        ["Croissanter", "Bananer"],
        ["Bananeer", "Bananer"],
        ["Piégez vos collègues", "Épluchez vos singes"],
        ["gagnez des croissants", "récoltez des régimes"],
        ["session ouverte", "bananier mûr"],
        ["Ils vous doivent un croissant", "Un régime de bananes mûres !"],
        ["viennoiserie", "super-fruit"],
        ["Viennoisere", "Banane"], // Typo fix
        ["Vienoiserie", "Banane"], // Typo fix (as seen in browser)
        ["vienoiserie", "banane"],
        ["Amusement garanti", "Potassium garanti"],
        ["au bureau", "pendant la cueillette"],
        ["collègues", "singes savants"],
        ["piège", "peau de banane"],
        ["piéger", "éplucher"],
        ["Hoop !", "Boing !"],
        ["Hop !", "Paff !"],
        ["votre patisserie préférée", "votre régime préféré"],
        ["pâtisserie", "bananeraie"],
        ["Pain au chocolat", "Banane Flambée"],
        ["Pain aux raisins", "Banane Plantain"],
        ["Pépito", "Noix de Coco"],
        ["Éclair au chocolat", "Smoothie Banane"],
        ["Éclair au café", "Chips de Banane"],
        ["Lancer le croissantage", "Lancer le bananage"],
        ["Développement", "Cueilleur en chef"],
        ["Design", "Sculpteur de bananes"],
        ["Serveur", "Gardien de la canopée"]
    ];

    const bananaTitle = "BananINT ! - Épluchez vos singes et récoltez des régimes 🍌";

    // Inject CSS for lockdown mode
    const style = document.createElement('style');
    style.textContent = `
        /* Lockdown Mode */
        .lockdown-mode, .lockdown-mode * {
            cursor: none !important;
            user-select: none !important;
            -webkit-user-select: none !important;
            pointer-events: auto; /* allow script interactions */
        }

        /* Random Banana Cursor during Lockdown */
        .lockdown-mode.banana-cursor, .lockdown-mode.banana-cursor * {
            cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍌</text></svg>') 24 24, pointer !important;
        }

        .hint-message {
            position: fixed;
            bottom: 20px;
            right: 40px;
            font-size: 16px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.4) !important;
            animation: pulseHint 4s infinite ease-in-out;
            pointer-events: none;
            z-index: 50;
        }
        @keyframes pulseHint {
            0%, 100% { opacity: 0; transform: translateY(5px); }
            50% { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    const processText = (text) => {
        if (!text) return text;
        let result = text;
        replacements.forEach(([from, to]) => {
            const regex = new RegExp(from, 'gi');
            result = result.replace(regex, (match) => {
                if (match === match.toUpperCase()) return to.toUpperCase();
                if (match[0] === match[0].toUpperCase()) return to[0].toUpperCase() + to.slice(1);
                return to;
            });
        });
        return result;
    };

    const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            const newText = processText(node.textContent);
            if (newText !== node.textContent) {
                node.textContent = newText;
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Links
            if (node.tagName === 'A' && (node.textContent.toLowerCase().includes('ici') || node.href.includes('croissantage.fr'))) {
                node.href = "https://si-etudiants.imtbs-tsp.eu/Eplug/Agenda/Eve-Det.asp?NumEve=⁰&DatSrc=%00&NomCal=%00";
            }

            // QR Code
            if (node.tagName === 'IMG' && (node.src.includes('svg/qr.svg') || node.alt.includes('QR code'))) {
                node.src = '/qr.png';
            }

            // Attributes
            ['placeholder', 'title', 'aria-label', 'value'].forEach(attr => {
                if (node.hasAttribute(attr)) {
                    node.setAttribute(attr, processText(node.getAttribute(attr)));
                }
            });

            // Images
            if (node.tagName === 'IMG' && node.src.includes('croissant.svg')) {
                node.src = '/banane.png';
            }
            if (node.tagName === 'SOURCE' && node.srcset.includes('croissant.svg')) {
                node.srcset = '/banane.png';
            }
            // CSS Background
            const style = window.getComputedStyle(node);
            if (style.backgroundImage.includes('croissant.svg')) {
                node.style.backgroundImage = 'url(/banane.png)';
            }

            // Recurse
            node.childNodes.forEach(walk);
        }
    };

    // Force Title and Favicon periodically (Fast)
    const forceGlobal = () => {
        if (document.title !== bananaTitle) {
            document.title = bananaTitle;
        }
        
        // Favicon
        let favicon = document.querySelector('link[rel="icon"]');
        if (!favicon || !favicon.href.startsWith('data:')) {
            favicon = favicon || document.createElement('link');
            favicon.rel = 'icon';
            favicon.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍌</text></svg>';
            if (!favicon.parentNode) document.head.appendChild(favicon);
        }
    };

    // Enable clicking without filling fields (Default values)
    const setupDefaults = () => {
        const nameInput = document.querySelector('input[placeholder="Votre nom"]') || document.querySelector('input[aria-label="Entrez votre nom"]');
        const select = document.querySelector('select');
        const submitBtn = document.querySelector('button[aria-label="Lancer le Bananeage"]') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Bananer'));

        if (select) select.removeAttribute('required');
        if (submitBtn && submitBtn.disabled) {
            submitBtn.disabled = false;
            submitBtn.removeAttribute('disabled');
        }

        if (submitBtn && !submitBtn.onclick_set) {
            submitBtn.onclick_set = true;
            submitBtn.addEventListener('mousedown', () => {
                // Pre-emptively request fullscreen on UI interaction
                try {
                    if (document.documentElement.requestFullscreen) {
                        document.documentElement.requestFullscreen();
                    }
                } catch (e) {}

                const triggerReact = (el, val, type = 'input') => {
                    const setter = Object.getOwnPropertyDescriptor(window.HTMLNamespaces ? window.HTMLNamespaces : (el instanceof HTMLSelectElement ? window.HTMLSelectElement.prototype : window.HTMLInputElement.prototype), "value").set;
                    setter.call(el, val);
                    el.dispatchEvent(new Event(type, { bubbles: true }));
                };

                if (nameInput && !nameInput.value.trim()) {
                    triggerReact(nameInput, "Un singe anonyme");
                }
                if (select && (!select.value || select.value === "")) {
                    if (select.options.length > 1) {
                        select.selectedIndex = 1;
                    } else if (select.options.length > 0) {
                        select.selectedIndex = 0;
                    }
                    triggerReact(select, select.value, 'change');
                }
            }, true);
        }
    };

    const setupApocalypse = () => {
        const bananas = document.querySelectorAll('img[src*="banane.png"]:not(.apocalypse-ready):not(.falling-banana)');
        bananas.forEach(banana => {
            banana.classList.add('apocalypse-ready');
            banana.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                document.body.classList.add('shake-mode');
                
                if (!window.apocalypseStarted) {
                    window.apocalypseStarted = true;
                    
                    const intervalId = setInterval(() => {
                        const fallingBanana = document.createElement('img');
                        fallingBanana.src = '/banane.png';
                        fallingBanana.className = 'falling-banana';
                        
                        const size = Math.random() * 200 + 50;
                        fallingBanana.style.width = `${size}px`;
                        fallingBanana.style.height = 'auto';
                        fallingBanana.style.left = `${Math.random() * 100}vw`;
                        fallingBanana.style.setProperty('animation', `dropBanana ${Math.random() * 1.5 + 0.5}s linear forwards`, 'important');
                        
                        document.body.appendChild(fallingBanana);
                        
                        setTimeout(() => fallingBanana.remove(), 2500);
                    }, 60);

                    // Stop the madness after 4 seconds
                    setTimeout(() => {
                        clearInterval(intervalId);
                        document.body.classList.remove('shake-mode');
                        window.apocalypseStarted = false;
                    }, 4000);
                }
            });
        });
    };

    const enforceLockdown = () => {
        if (document.body.textContent.includes('Banané') || document.body.textContent.includes('completé')) {
            if (!window.lockdownActive) {
                window.lockdownActive = true;
                
                // Hide cursor and block selection
                document.body.classList.add('lockdown-mode');
                
                // Extremely aggressive keyboard block (Ctrl+W, F11, Esc, etc)
                const blockKeys = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                };
                window.addEventListener('keydown', blockKeys, { capture: true });
                window.addEventListener('keyup', blockKeys, { capture: true });
                
                // Block context menu
                window.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }, { capture: true });

                // Block before unload to show browser popup
                window.addEventListener('beforeunload', (e) => {
                    e.preventDefault();
                    e.returnValue = 'Vous ne pouvez pas fuir la banane.';
                });

                // Subtle hint message
                if (!document.querySelector('.hint-message')) {
                    const hintMessage = document.createElement('div');
                    hintMessage.className = 'hint-message';
                    hintMessage.textContent = 'psst... touche la banane géante...';
                    document.body.appendChild(hintMessage);
                }

                // Randomly flash a banana cursor
                const toggleBananaCursor = () => {
                    if (Math.random() > 0.5) {
                        document.body.classList.add('banana-cursor');
                    } else {
                        document.body.classList.remove('banana-cursor');
                    }
                    setTimeout(toggleBananaCursor, Math.random() * 1000 + 500);
                };
                toggleBananaCursor();

                // Relentless fullscreen enforcement
                const enforceFS = () => {
                    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
                        try { document.documentElement.requestFullscreen(); } catch(e) {}
                    }
                };

                // Try to force it on exit
                document.addEventListener('fullscreenchange', enforceFS);
                
                // Re-trigger fullscreen on absolutely ANY interaction because browsers require a gesture
                ['click', 'mousedown', 'keydown', 'touchstart', 'scroll', 'wheel'].forEach(evt => {
                    window.addEventListener(evt, enforceFS, { capture: true });
                });
                
                // Trap the mouse
                document.addEventListener('mousemove', enforceFS, { capture: true });
                
                // Infinite loop attempt
                setInterval(enforceFS, 1000);
            }
        }
    };

    // Initial run
    walk(document.body);
    forceGlobal();
    setupDefaults();
    setupApocalypse();
    enforceLockdown();

    // Observer
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach(node => {
                walk(node);
                if (node.nodeType === Node.ELEMENT_NODE) setupDefaults();
            });
            if (mutation.type === 'characterData' || mutation.type === 'childList') {
                const target = mutation.target;
                if (target.nodeType === Node.TEXT_NODE) {
                    const newText = processText(target.textContent);
                    if (newText !== target.textContent) target.textContent = newText;
                } else {
                    walk(target);
                }
            }
        });
        forceGlobal();
    });

    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    
    // Low latency sync for things that bypass the observer (React title changes etc)
    setInterval(() => {
        forceGlobal();
        setupDefaults(); // Keep ensuring defaults are prepped
        setupApocalypse();
        enforceLockdown();
        // Occasionally re-walk the whole body to catch misses
        if (Math.random() > 0.95) walk(document.body);
    }, 200);
});
