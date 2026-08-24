/**
 * Initializes the code block copy functionality
 */
document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("content");
    if (!el) return;

    const timerMap = new WeakMap();

    function showFeedback (btn, isError = false) {
        const prevTimer = timerMap.get(btn);
        if (prevTimer) clearTimeout(prevTimer);

        btn.classList.toggle("copied", !isError);
        btn.classList.toggle("failed", isError);

        const timer = setTimeout(() => {
            btn.classList.remove("copied", "failed");
            timerMap.delete(btn);
        }, 3000);
        timerMap.set(btn, timer);
    };

    async function handleCodeCopyClick (event) {
        const btn = event.target.closest(".copy-button");
        if (!btn) return;

        const container = btn.closest(".code-block");
        if (!container) return;

        const pres = container.querySelectorAll("pre");
        const pre = pres.length ? pres[pres.length - 1] : null;
        if (!pre) return;

        if (btn.dataset.copying === "true") return;
        btn.dataset.copying = 'true';

        const text = (pre.querySelector("code") || pre).textContent;
        try {
            await navigator.clipboard.writeText(text);
            showFeedback(btn, false);
        } catch (err) {
            showFeedback(btn, true);
        } finally {
            delete btn.dataset.copying;
        }
    }

    el.addEventListener("click", handleCodeCopyClick);
});
