/**
 * Collapse controls: toggle the closest .callout-block / .code-block
 */
document.addEventListener("DOMContentLoaded", () => {
    const updateButtonTitle = (btn) => {
        const container = btn.closest(".callout-block, .code-block");
        if (!container) return;

        const collapsed = container.classList.contains("collapsed");
        const title = collapsed ? btn.dataset.titleShow : btn.dataset.titleHide;
        if (title) btn.title = title;
    };

    document.querySelectorAll(".collapse-button").forEach(updateButtonTitle);

    const handleCollapseClick = (event) => {
        const btn = event.target.closest(".collapse-button");
        if (!btn) return;

        const container = btn.closest(".callout-block, .code-block");
        if (!container) return;

        container.classList.toggle("collapsed");
        updateButtonTitle(btn);
    };

    document.addEventListener("click", handleCollapseClick);
});
