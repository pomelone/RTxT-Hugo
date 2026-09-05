/**
 * Switch tabs, manage scroll-button visibility.
 */
document.addEventListener("DOMContentLoaded", () => {
    const navCache = new WeakMap();
    const getNavData = (nav) => {
        let cached = navCache.get(nav);
        if (cached) return cached;

        const tabs = nav.closest(".tabs");
        const leftBtn = tabs ? tabs.querySelector('.scroll-button[data-scroll="left"]') : null;
        const rightBtn = tabs ? tabs.querySelector('.scroll-button[data-scroll="right"]') : null;
        cached =  { leftBtn, rightBtn };
        navCache.set(nav, cached);
        return cached;
    };

    const globalRO = new ResizeObserver((entries) => {
        for (const entry of entries) {
            updateButtonStates(entry.target);
        }
    });

    const updateButtonStates = (nav) => {
        const {leftBtn, rightBtn } = getNavData(nav);

        const { scrollLeft, scrollWidth, clientWidth } = nav;
        const overflowing = scrollWidth - clientWidth > 1;

        leftBtn?.classList.toggle("visible", overflowing && !(scrollLeft <= 1));
        rightBtn?.classList.toggle("visible", overflowing && !(scrollLeft + clientWidth >= scrollWidth - 1));
    };

    const scrollToActive = (nav) => {
        const active = nav.querySelector(".tabs-button.activated");
        if (active) {
            active.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
    };

    document.querySelectorAll(".tabs-nav-scroll").forEach((nav) => {
        globalRO.observe(nav);
        updateButtonStates(nav);
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
