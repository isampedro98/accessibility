(() => {
    const FOCUSABLE_SELECTOR = [
        'a[href]',
        'area[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(", ");

    function getFocusableElements(container) {
        if (!container) {
            return [];
        }

        return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => {
            return !element.hasAttribute("hidden") && element.getAttribute("aria-hidden") !== "true";
        });
    }

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
})();
