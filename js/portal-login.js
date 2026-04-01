(() => {
    const loginForm = document.getElementById("login-form");

    if (!loginForm) {
        return;
    }

    const errorContainer = document.getElementById("form-error");
    const userField = document.getElementById("user");
    const passwordField = document.getElementById("pass");
    const honeypotField = document.getElementById("website");
    const rememberSessionField = document.getElementById("remember-session");

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

    function handleLoginSubmit(event) {
        event.preventDefault();

        const username = userField?.value.trim() || "";
        const password = passwordField?.value.trim() || "";

        if (honeypotField && honeypotField.value.trim() !== "") {
            showLoginError("No fue posible procesar la solicitud.");
            return;
        }

        if (username !== "" && password !== "") {
            window.SiuSession?.setUser(username, Boolean(rememberSessionField?.checked));
            window.location.href = "index.html";
            return;
        }

        showLoginError("Los campos obligatorios deben completarse antes de continuar.");
    }

    loginForm.addEventListener("submit", handleLoginSubmit);

    if (userField) {
        userField.addEventListener("input", clearLoginFeedback);
    }

    if (passwordField) {
        passwordField.addEventListener("input", clearLoginFeedback);
    }
})();
