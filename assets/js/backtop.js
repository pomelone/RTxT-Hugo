/**
 * Back to Top Button Script
 */
document.addEventListener("DOMContentLoaded", () => {
    const backTopButton = document.getElementById("backtop");
    if (!backTopButton) return;
    let isScrolling = false;

    window.addEventListener("scroll", () => {
        if (isScrolling) return;
        isScrolling = true;
        setTimeout(() => {
            if (window.scrollY > window.innerHeight / 4) {
                backTopButton.style.display = "block";
            } else {
                backTopButton.style.display = "none";
            }
            isScrolling = false;
        }, 200);  // 200ms per check
    });
    
    backTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" 
        });
    });
});
