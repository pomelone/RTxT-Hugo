/**
 * Initialize theme
 */
(function () {
    const key = "rtxt-theme";
    const stored = localStorage.getItem(key);

    if (stored) {
        document.documentElement.dataset.theme = stored;
    }
})();
