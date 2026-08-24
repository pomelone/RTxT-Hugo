/**
 * Back to Top Button Script
 */
document.addEventListener("DOMContentLoaded", () => {
    const backTopButton = document.getElementById("backtop");
    if (!backTopButton) return;

    let isVisible = false;
    let ticking = false;

    function updateVisibility () {
        const shouldShow = window.scrollY > window.innerHeight / 4;
        if (shouldShow === isVisible) return;

        isVisible = shouldShow;
        backTopButton.classList.toggle("visible", isVisible);

        if (!isVisible && document.activeElement === backTopButton) {
            backTopButton.blur();
        }
    }

    function onScroll () {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateVisibility();
                ticking = false;
            });
            ticking = true;
        }
    }

    function scrollToTop () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    backTopButton.addEventListener("click", scrollToTop);

    updateVisibility();
});
