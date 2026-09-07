/**
 * Change theme.
 */
document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "rtxt-theme";

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const btn = document.getElementById("theme-switch");
    if (!btn) return;

    const currentTheme = (isMedia=false) => {
        let current = media.matches ? "dark" : "light";
        if (isMedia) {
            return current;
        }
        current = document.documentElement.dataset.theme || current;
        return current;
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

    const syncTheme = (isMedia=false) => {
        const current = currentTheme(isMedia);
        if (isMedia) {
            document.documentElement.dataset.theme = current;
        }
        btn.dataset.theme = current;
    }

    syncTheme();

    btn.addEventListener("click", changeTheme);
    media.addEventListener("change", () => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            syncTheme(true);
        }
    });
});
