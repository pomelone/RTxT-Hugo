/**
 * Toc modal: shown while the side panels are hidden
 */
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".toc-toggle");
    const modal = document.getElementById("toc-modal");
    if (!toggle || !modal) return;

    if (!modal.querySelector(".toc-body a")) {
        toggle.hidden = true;
        return;
    }

    toggle.addEventListener("click", () => {
        if (modal.open) return;
        modal.showModal();
    });

    modal.querySelector(".toc-modal-close")?.addEventListener("click", () => {
        modal.close();
    });

    modal.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            modal.close();
            return;
        }

        if (event.target !== modal) return;

        const { left, top, right, bottom } = modal.getBoundingClientRect();
        const inside = event.clientX >= left && event.clientX <= right
            && event.clientY >= top && event.clientY <= bottom;
        if (!inside) modal.close();
    });

    // Reset the state when switching back to the desktop layout
    // (keep in sync with $breakpoint-side in scss/size/_common.scss)
    const media = window.matchMedia("(max-width: 70rem)");
    media.addEventListener("change", (event) => {
        if (event.matches) return;
        if (modal.open) modal.close();
    });
});
