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

    function setFieldErrorState(field, isInvalid) {
        if (!field) {
            return;
        }

        field.style.borderColor = isInvalid ? "var(--color-error)" : "";

        if (isInvalid) {
            field.setAttribute("aria-invalid", "true");
            return;
        }

        field.removeAttribute("aria-invalid");
    }

    function clearLoginFeedback() {
        if (errorContainer) {
            errorContainer.hidden = true;
            errorContainer.textContent = "";
            errorContainer.classList.remove("error-text");
        }

        setFieldErrorState(userField, false);
        setFieldErrorState(passwordField, false);
    }

    function showLoginError(message, options = {}) {
        const {
            userInvalid = false,
            passwordInvalid = false,
            focusTarget = null
        } = options;

        if (errorContainer) {
            errorContainer.textContent = message;
            errorContainer.hidden = false;
            errorContainer.classList.add("error-text");
        }

        setFieldErrorState(userField, userInvalid);
        setFieldErrorState(passwordField, passwordInvalid);

        if (focusTarget && typeof focusTarget.focus === "function") {
            focusTarget.focus();
        }
    }

    function handleLoginSubmit(event) {
        event.preventDefault();

        const username = userField?.value.trim() || "";
        const password = passwordField?.value.trim() || "";

        if (honeypotField && honeypotField.value.trim() !== "") {
            showLoginError("No fue posible procesar la solicitud.", { focusTarget: userField });
            return;
        }

        const userMissing = username === "";
        const passwordMissing = password === "";

        if (userMissing || passwordMissing) {
            showLoginError("Los campos obligatorios deben completarse antes de continuar.", {
                userInvalid: userMissing,
                passwordInvalid: passwordMissing,
                focusTarget: userMissing ? userField : passwordField
            });
            return;
        }

        window.SiuSession?.setUser(username, Boolean(rememberSessionField?.checked));
        window.location.href = "index.html";
    }

    loginForm.addEventListener("submit", handleLoginSubmit);

    if (userField) {
        userField.addEventListener("input", clearLoginFeedback);
    }

    if (passwordField) {
        passwordField.addEventListener("input", clearLoginFeedback);
    }
})();
