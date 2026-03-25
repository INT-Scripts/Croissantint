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

    // Initial run
    walk(document.body);
    forceGlobal();

    // Observer
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach(walk);
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
        // Occasionally re-walk the whole body to catch misses
        if (Math.random() > 0.95) walk(document.body);
    }, 200);
});
