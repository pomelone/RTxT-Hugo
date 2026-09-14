class TextExtrude {
    constructor(selector, options = {}) {
        this.el = document.querySelector(selector);
        if (!this.el) return;

        this.config = {
            depth: 200,
            steps: 40,
            colorStart: [0, 98, 204],   // #0062cc
            colorEnd: [0, 122, 255],    // #007aff
            angle: 45,
            ...options
        };

        this.render();
    }

    lerpColor(start, end, ratio) {
        const r = Math.round(start[0] + (end[0] - start[0]) * ratio);
        const g = Math.round(start[1] + (end[1] - start[1]) * ratio);
        const b = Math.round(start[2] + (end[2] - start[2]) * ratio);
        return `rgb(${r},${g},${b})`;
    }

    render() {
        const { depth, steps, colorStart, colorEnd, angle } = this.config;
        const rad = (angle * Math.PI) / 180;
        const dx = Math.cos(rad);
        const dy = Math.sin(rad);
        const shadows = [];

        for (let i = 1; i <= steps; i++) {
            const ratio = i / steps;
            const offset = (depth * i) / steps;
            const color = this.lerpColor(colorStart, colorEnd, ratio);
            shadows.push(`${color} ${offset * dx}px ${offset * dy}px`);
        }

        this.el.style.textShadow = shadows.join(",");
    }

    update(newOptions) {
        Object.assign(this.config, newOptions);
        this.render();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let args = {
        depth: 200,
        steps: 200,
        colorStart: [0, 108, 0],   // 20, 50
        colorEnd: [0, 128, 0]
    };
    if (window.innerWidth < 800) {
        args = {
            depth: 100,
            steps: 100,
            colorStart: [0, 108, 0],   // 20, 50
            colorEnd: [0, 128, 0]
        };
    }
    const title = new TextExtrude(".nf-body h1", args);
});
