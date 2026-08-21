/**
 * Render mathematical expressions in the content of the page
 */
document.addEventListener("DOMContentLoaded", () => {
    let el = document.getElementById("content");
    if (el) {
        renderMathInElement(el, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '\\[', right: '\\]', display: true },
                { left: '$', right: '$', display: false },
                { left: '\\(', right: '\\)', display: false }
            ],
            throwOnError: false
        });
    }
});
