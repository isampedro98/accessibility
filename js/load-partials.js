const DEFAULT_COLOR_THEME = "contrastes";
const DEFAULT_FONT_THEME = "open-dyslexic";
const COLOR_THEME_KEY = "color-theme";
const FONT_THEME_KEY = "font-theme";

function getCurrentPage() {
    const path = window.location.pathname.split("/").pop();
    return path || "index.html";
}

function applyStoredPreferences() {
    const root = document.documentElement;
    const savedColorTheme = localStorage.getItem(COLOR_THEME_KEY) || DEFAULT_COLOR_THEME;
    const savedFontTheme = localStorage.getItem(FONT_THEME_KEY) || DEFAULT_FONT_THEME;

    root.dataset.colorTheme = savedColorTheme;
    root.dataset.fontTheme = savedFontTheme;
}

function setActiveNavItem(root) {
    const currentPage = getCurrentPage();
    const currentLink = root.querySelector(`[data-nav-link="${currentPage}"]:not(.navbar-brand)`);

    if (!currentLink) {
        return;
    }

    currentLink.classList.add("active");
    currentLink.setAttribute("aria-current", "page");

    const subnav = currentLink.closest(".subnav");
    if (subnav) {
        subnav.classList.add("has-active");
    }
}

function setupSubnav(root) {
    const subnav = root.querySelector(".subnav");

    if (!subnav) {
        return;
    }

    const button = subnav.querySelector(".subnavbtn");

    if (!button) {
        return;
    }

    function closeSubnav() {
        subnav.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
    }

    function toggleSubnav() {
        const isOpen = subnav.classList.toggle("open");
        button.setAttribute("aria-expanded", String(isOpen));
    }

    button.addEventListener("click", toggleSubnav);

    document.addEventListener("click", (event) => {
        if (!subnav.contains(event.target)) {
            closeSubnav();
        }
    });

    subnav.addEventListener("focusout", (event) => {
        if (!subnav.contains(event.relatedTarget)) {
            closeSubnav();
        }
    });
}

function setupThemeControls(root) {
    const colorThemeSelect = root.querySelector("#color-theme-select");
    const fontThemeSelect = root.querySelector("#font-theme-select");
    const html = document.documentElement;

    if (colorThemeSelect) {
        colorThemeSelect.value = html.dataset.colorTheme || DEFAULT_COLOR_THEME;
        colorThemeSelect.addEventListener("change", (event) => {
            const value = event.target.value;
            html.dataset.colorTheme = value;
            localStorage.setItem(COLOR_THEME_KEY, value);
        });
    }

    if (fontThemeSelect) {
        fontThemeSelect.value = html.dataset.fontTheme || DEFAULT_FONT_THEME;
        fontThemeSelect.addEventListener("change", (event) => {
            const value = event.target.value;
            html.dataset.fontTheme = value;
            localStorage.setItem(FONT_THEME_KEY, value);
        });
    }
}

async function loadPartial(includeName, path, setup = null) {
    const placeholder = document.querySelector(`[data-include="${includeName}"]`);

    if (!placeholder) {
        return;
    }

    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`No se pudo cargar el parcial ${includeName}: ${response.status}`);
    }

    placeholder.innerHTML = await response.text();

    if (setup) {
        setup(placeholder);
    }
}

applyStoredPreferences();

Promise.all([
    loadPartial("site-header", "./partials/site-header.html", (placeholder) => {
        setActiveNavItem(placeholder);
        setupSubnav(placeholder);
        setupThemeControls(placeholder);
    }),
    loadPartial("site-footer", "./partials/site-footer.html")
]).catch((error) => {
    console.error(error);
});

