/**
 * Search modal: open from the navbar trigger, close on backdrop click.
 */
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector("pagefind-modal");
    const trigger = document.querySelector(".search-trigger");
    if (!modal || !trigger) return;

    trigger.addEventListener("click", () => {
        modal.open?.();
    });

    // Close when clicking the backdrop
    document.addEventListener("click", (event) => {
        const dialog =
            modal.querySelector("dialog.pf-modal") ??
            modal.shadowRoot?.querySelector("dialog.pf-modal");
        if (!dialog?.open) return;

        const path = event.composedPath();
        if (path[0] === dialog || event.target === dialog) {
            modal.close?.();
        }
    });
});
