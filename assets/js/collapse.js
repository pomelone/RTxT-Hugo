/**
 * Collapse controls: toggle the closest .callout-block / .code-block
 */
document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("content");
    if (!el) return;

    const handleCollapseClick = (event) => {
        const btn = event.target.closest(".collapse-button");
        if (!btn) return;

        const container = btn.closest(".callout-block, .code-block");
        if (!container) return;

        container.classList.toggle('collapsed');
    };

    el.addEventListener("click", handleCollapseClick);
});
