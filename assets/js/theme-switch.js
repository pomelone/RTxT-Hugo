/**
 * Change theme.
 */
document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "rtxt-theme";

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const btn = document.getElementById("theme-switch");
    if (!btn) return;

    const currentTheme = () => {
        const current = document.documentElement.dataset.theme || null;
        if (current) {
            return current;
        }
        return media.matches ? "dark" : "light";
    };

    const nextTheme = () => {
        const current = currentTheme();
        return current === "dark" ? "light" : "dark";
    };

    const changeTheme = () => {
        const next = nextTheme();
        document.documentElement.dataset.theme = next;
        localStorage.setItem(STORAGE_KEY, next);
        btn.dataset.theme = next;
    };

    const syncTheme = () => {
        btn.dataset.theme = currentTheme();
    }

    syncTheme();

    btn.addEventListener("click", changeTheme);
    media.addEventListener("change", () => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            syncTheme();
        }
    });
});
