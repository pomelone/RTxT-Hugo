/**
 * Scroll controls: toggle the closest .tabs
 */
document.addEventListener("DOMContentLoaded", () => {
    const updateButtonStates = (nav) => {
        const tabs = nav.closest(".tabs");
        if (!tabs) return;

        const { scrollLeft, scrollWidth, clientWidth } = nav;
        const overflowing = scrollWidth - clientWidth > 1;

        tabs.querySelector('.scroll-button[data-scroll="left"]')
            ?.classList.toggle("visible", overflowing && !(scrollLeft <= 1));
        tabs.querySelector('.scroll-button[data-scroll="right"]')
            ?.classList.toggle("visible", overflowing && !(scrollLeft + clientWidth >= scrollWidth - 1));
    };

    const onScroll = (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const nav = target.closest(".tabs-nav-scroll");
        if (!nav) return;

        if (!nav._tabsTicking) {
            requestAnimationFrame(() => {
                updateButtonStates(nav);
                nav._tabsTicking = false;
            });
            nav._tabsTicking = true;
        }
    };

    const scrollTabs = (event) => {
        const btn = event.target.closest(".scroll-button");
        if (!btn) return;

        const tabs = btn.closest(".tabs");
        if (!tabs) return;

        const nav = tabs.querySelector(".tabs-nav-scroll");
        if (!nav) return;

        const direction = btn.dataset.scroll;
        const distance = nav.clientWidth * 0.5;

        switch (direction) {
            case "left":
                nav.scrollBy({ left: -distance, behavior: "smooth" });
                break;
            case "right":
                nav.scrollBy({ left: distance, behavior: "smooth" });
                break;
            default:
                return;
        }
    };

    document.addEventListener("scroll", onScroll, { capture: true, passive: true })
    document.addEventListener("click", scrollTabs, { passive: true })
});
