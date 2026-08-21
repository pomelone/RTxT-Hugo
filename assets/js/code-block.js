/**
 * Initializes the code block copy functionality
 */
document.addEventListener("DOMContentLoaded", () => {
    const showFeedback = function (btn, isError = false) {
        btn.classList.toggle("copied", !isError);
        btn.classList.toggle("failed", isError);

        clearTimeout(btn._copyTimer);
        btn._copyTimer = setTimeout(() => {
            btn.classList.remove("copied", "failed");
        }, 3000);
    };

    document.querySelectorAll("#content .code-block").forEach(block => {
        const btn = block.querySelector(".code-copy");
        const pres = block.querySelectorAll("pre");
        const pre = pres.length ? pres[pres.length - 1] : null;
        if (!btn || !pre) return;

        btn.addEventListener("click", async () => {
            const text = (pre.querySelector("code") || pre).textContent;
            try {
                await navigator.clipboard.writeText(text);
                showFeedback(btn);
            } catch (err) {
                showFeedback(btn, true);
            }
        });
    });
});
