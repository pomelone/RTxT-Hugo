/**
 * Back to Top Button Script
 */
document.addEventListener("DOMContentLoaded", () => {
    const backTopButton = document.getElementById("backtop-button");
    if (!backTopButton) return;

    let isVisible = false;
    let ticking = false;

    const updateVisibility = () => {
        const shouldShow = window.scrollY > window.innerHeight / 4;
        if (shouldShow === isVisible) return;

        isVisible = shouldShow;
        backTopButton.classList.toggle("visible", isVisible);

        if (!isVisible && document.activeElement === backTopButton) {
            backTopButton.blur();
        }
    };

    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateVisibility();
                ticking = false;
            });
            ticking = true;
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    backTopButton.addEventListener("click", scrollToTop);

    updateVisibility();
});
