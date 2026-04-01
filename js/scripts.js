const FOCUSABLE_SELECTOR = [
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
].join(", ");
const AUTH_STORAGE_KEY = "siu-auth-user";

function getFocusableElements(container) {
    if (!container) {
        return [];
    }

    return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => {
        return !element.hasAttribute("hidden") && element.getAttribute("aria-hidden") !== "true";
    });
}

function initPromoModal() {
    const promoModal = document.getElementById("promoModal");

    if (!promoModal) {
        return;
    }

    const promoModalCloseButton = document.getElementById("promo-modal-close");
    const backgroundRoots = [
        document.querySelector('[data-include="site-header"]'),
        document.getElementById("main"),
        document.querySelector('[data-include="site-footer"]')
    ].filter(Boolean);

    let previousFocusedElement = null;

    function setBackgroundState(isModalOpen) {
        backgroundRoots.forEach((element) => {
            if (isModalOpen) {
                element.setAttribute("inert", "");
                element.setAttribute("aria-hidden", "true");
            } else {
                element.removeAttribute("inert");
                element.removeAttribute("aria-hidden");
            }
        });

        document.body.classList.toggle("modal-open", isModalOpen);
    }

    function closePromoModal() {
        if (promoModal.hidden) {
            return;
        }

        promoModal.hidden = true;
        setBackgroundState(false);
        document.removeEventListener("keydown", handlePromoModalKeydown);

        if (previousFocusedElement && typeof previousFocusedElement.focus === "function") {
            previousFocusedElement.focus();
        }
    }

    function handlePromoModalKeydown(event) {
        if (promoModal.hidden) {
            return;
        }

        if (event.key === "Escape") {
            event.preventDefault();
            closePromoModal();
            return;
        }

        if (event.key !== "Tab") {
            return;
        }

        const focusableElements = getFocusableElements(promoModal);

        if (focusableElements.length === 0) {
            event.preventDefault();
            promoModal.focus();
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
            return;
        }

        if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }

    function openPromoModal() {
        if (!promoModal.hidden) {
            return;
        }

        previousFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        promoModal.hidden = false;
        setBackgroundState(true);
        document.addEventListener("keydown", handlePromoModalKeydown);

        window.requestAnimationFrame(() => {
            const focusTarget = promoModalCloseButton || getFocusableElements(promoModal)[0] || promoModal;
            focusTarget.focus();
        });
    }

    window.setTimeout(openPromoModal, 2000);

    promoModal.addEventListener("click", (event) => {
        if (event.target === promoModal) {
            closePromoModal();
        }
    });

    if (promoModalCloseButton) {
        promoModalCloseButton.addEventListener("click", closePromoModal);
    }
}

function initLoginForm() {
    const loginForm = document.getElementById("login-form");

    if (!loginForm) {
        return;
    }

    const errorContainer = document.getElementById("form-error");
    const userField = document.getElementById("user");
    const passwordField = document.getElementById("pass");
    const honeypotField = document.getElementById("website");
    const rememberSessionField = document.getElementById("remember-session");
    const submitButton = loginForm.querySelector('button[type="submit"]');

    function clearLoginFeedback() {
        if (errorContainer) {
            errorContainer.textContent = "";
            errorContainer.removeAttribute("role");
            errorContainer.classList.remove("error-text");
        }

        if (userField) {
            userField.style.borderColor = "";
            userField.removeAttribute("aria-invalid");
        }

        if (passwordField) {
            passwordField.style.borderColor = "";
            passwordField.removeAttribute("aria-invalid");
        }
    }

    function showLoginError(message) {
        if (errorContainer) {
            errorContainer.textContent = message;
            errorContainer.setAttribute("role", "alert");
            errorContainer.classList.add("error-text");
        }

        if (userField) {
            userField.style.borderColor = "var(--color-error)";
            userField.setAttribute("aria-invalid", "true");
        }

        if (passwordField) {
            passwordField.style.borderColor = "var(--color-error)";
            passwordField.setAttribute("aria-invalid", "true");
        }

        if (userField && userField.value.trim() === "") {
            userField.focus();
            return;
        }

        if (passwordField && passwordField.value.trim() === "") {
            passwordField.focus();
        }
    }

    function persistUser(username) {
        if (rememberSessionField?.checked) {
            localStorage.setItem(AUTH_STORAGE_KEY, username);
            sessionStorage.removeItem(AUTH_STORAGE_KEY);
        } else {
            sessionStorage.setItem(AUTH_STORAGE_KEY, username);
            localStorage.removeItem(AUTH_STORAGE_KEY);
        }

        window.dispatchEvent(new CustomEvent("siu-auth-change", {
            detail: { username }
        }));
    }

    function handleLoginSubmit(event) {
        event.preventDefault();

        const username = userField?.value.trim() || "";
        const password = passwordField?.value.trim() || "";

        if (honeypotField && honeypotField.value.trim() !== "") {
            showLoginError("No fue posible procesar la solicitud.");
            return;
        }

        if (username !== "" && password !== "") {
            persistUser(username);
            window.location.assign("index.html");
            return;
        }

        showLoginError("Los campos obligatorios deben completarse antes de continuar.");
    }

    loginForm.addEventListener("submit", handleLoginSubmit);

    if (submitButton) {
        submitButton.addEventListener("click", handleLoginSubmit);
    }

    if (userField) {
        userField.addEventListener("input", clearLoginFeedback);
    }

    if (passwordField) {
        passwordField.addEventListener("input", clearLoginFeedback);
    }
}

initPromoModal();
initLoginForm();
