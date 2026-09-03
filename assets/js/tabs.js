/**
 * Switch tabs, manage scroll-button visibility.
 */
document.addEventListener("DOMContentLoaded", () => {
    const navCache = new WeakMap();
    const getNavData = (nav) => {
        if (navCache.has(nav)) return navCache.get(nav);
        const tabs = nav.closest(".tabs");
        const buttons = tabs ? Array.from(tabs.querySelectorAll(".scroll-button")) : [];
        navCache.set(nav, buttons);
        return buttons;
    };

    const globalRO = new ResizeObserver((entries) => {
        for (const entry of entries) {
            updateScrollButtons(entry.target);
        }
    });

    const updateScrollButtons = (nav) => {
        const scrollButtons = getNavData(nav);
        if (scrollButtons.length === 0) return;

        const overflowing = nav.scrollWidth - nav.clientWidth > 1;
        for (const btn of scrollButtons) {
            btn.classList.toggle("visible", overflowing);
        }
    };

    const scrollToActive = (nav) => {
        const active = nav.querySelector(".tabs-button.activated");
        if (active) {
            active.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
    };

    document.querySelectorAll(".tabs-nav-scroll").forEach((nav) => {
        globalRO.observe(nav);
        updateScrollButtons(nav);
        scrollToActive(nav);
    });

    const handleTabsClick = (event) => {
        const button = event.target.closest(".tabs-button");
        if (!button) return;

        const tabs = button.closest(".tabs");
        if (!tabs) return;

        const index = button.dataset.tab;

        tabs.querySelectorAll(".tabs-button").forEach((btn) => {
            btn.classList.toggle("activated", btn.dataset.tab === index);
        });

        tabs.querySelectorAll(".tabs-panel").forEach((panel) => {
            panel.classList.toggle("activated", panel.dataset.panel === index);
        });

        requestAnimationFrame(() => {
            button.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth"});
        });
    };

    document.addEventListener("click", handleTabsClick);
});
