/**
 * Mobile nav menu modal.
 * Close via the panel's close button, the backdrop or Escape.
 */
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".menu-toggle");
    const modal = document.getElementById("menu-modal");
    if (!toggle || !modal) return;

    const closeGroups = () => {
        modal.querySelectorAll(".menu-group.opened").forEach((group) => {
            group.classList.remove("opened");
        });
    };

    toggle.addEventListener("click", () => {
        if (modal.open) return;
        modal.showModal();
    });

    modal.querySelector(".menu-modal-close")?.addEventListener("click", () => {
        modal.close();
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            const { left, top, right, bottom } = modal.getBoundingClientRect();
            const inside = event.clientX >= left && event.clientX <= right
                && event.clientY >= top && event.clientY <= bottom;
            if (!inside) modal.close();
            return;
        }

        const label = event.target.closest(".menu-group > span.menu");
        if (!label) return;

        const group = label.closest(".menu-group");
        const willOpen = !group.classList.contains("opened");
        closeGroups();
        group.classList.toggle("opened", willOpen);
    });

    modal.addEventListener("close", () => {
        closeGroups();
    });

    // Reset the state when switching back to the desktop layout
    // (keep in sync with $breakpoint-narrow in scss/size/_common.scss)
    const media = window.matchMedia("(max-width: 50rem)");
    media.addEventListener("change", (event) => {
        if (event.matches) return;
        if (modal.open) modal.close();
        closeGroups();
    });
});
