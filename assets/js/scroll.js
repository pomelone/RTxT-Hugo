/**
 * Scroll controls: toggle the closest .tabs
 */
document.addEventListener("DOMContentLoaded", () => {
    const globalRO = new ResizeObserver((entries) => {
        for (const entry of entries) {
            updateButtonStates(entry.target);
        }
    });

    const updateButtonStates = (nav) => {
        const tabs = nav.closest(".tabs");
        if (!tabs) return;

        const { scrollLeft, scrollWidth, clientWidth } = nav;
        const atStart = scrollLeft <= 1;
        const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;

        tabs.querySelector('.scroll-button[data-scroll="left"]')
            ?.toggleAttribute("disabled", atStart);
        tabs.querySelector('.scroll-button[data-scroll="right"]')
            ?.toggleAttribute("disabled", atEnd);
    };

    const activateTabs = (nav) => {
        if (nav._tabsActivated) return;
        nav._tabsActivated = true;

        globalRO.observe(nav);
        updateButtonStates(nav);
    };

    const onScroll = (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const nav = target.closest(".tabs-nav-scroll");
        if (!nav) return;

        activateTabs(nav);

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

        activateTabs(nav);

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
