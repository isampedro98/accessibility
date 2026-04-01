(() => {
    const AUTH_COOKIE_NAME = "siu-auth-user";

    function getCookie(name) {
        const cookieMatch = document.cookie
            .split(";")
            .map((item) => item.trim())
            .find((item) => item.startsWith(`${name}=`));

        if (!cookieMatch) {
            return "";
        }

        return decodeURIComponent(cookieMatch.substring(name.length + 1));
    }

    function setCookie(name, value, maxAgeSeconds = null) {
        const segments = [`${name}=${encodeURIComponent(value)}`, "path=/", "SameSite=Lax"];

        if (typeof maxAgeSeconds === "number") {
            segments.push(`Max-Age=${maxAgeSeconds}`);
        }

        document.cookie = segments.join("; ");
    }

    function setUser(username, rememberUser) {
        const maxAge = rememberUser ? 60 * 60 * 24 * 7 : null;
        setCookie(AUTH_COOKIE_NAME, username, maxAge);
        window.dispatchEvent(new CustomEvent("siu-auth-change", {
            detail: { username }
        }));
    }

    function clearUser() {
        setCookie(AUTH_COOKIE_NAME, "", 0);
        window.dispatchEvent(new CustomEvent("siu-auth-change", {
            detail: { username: "" }
        }));
    }

    window.SiuSession = {
        cookieName: AUTH_COOKIE_NAME,
        getUser: () => getCookie(AUTH_COOKIE_NAME),
        setUser,
        clearUser
    };
})();
