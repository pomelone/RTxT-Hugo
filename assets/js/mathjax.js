/**
 * Render mathematical expressions in the content of the page
 */
MathJax = {
    loader:{
        load: [
                // "[tex]/textmacros",  // loaded
                // "[tex]/unicode",
                // "[tex]/ams",  // loaded
                // "[tex]/physics",
                // "[tex]/mhchem",
                // "[tex]/color",
                "[tex]/tagformat",
                // "[tex]/html",
                // "[tex]/noundefined",  // loaded
                // "[tex]/noerrors",
                // "[tex]/newcommand",  // loaded
                // "[tex]/configmacros",  // loaded
                "output/chtml",
                "ui/lazy",
        ],
    },

    tex: {
        packages: {
            "[+]": [
                // "physics",
                // "mhchem",
                // "color",
                "tagformat",
                // "html",
                // "noerrors",
            ],
            "[-]": [
                // "autoload",
                "require",
                "newcommand",
                "configmacros",
            ],
        },
        autoload: {
            unicode: ["unicode", "U", "char"],
            mhchem: ["ce", "pu"],
            color: ["color", "definecolor", "textcolor", "colorbox", "fcolorbox"],
            newcommand: [],
            action: [],
            amscd: [],
            bbox: [],
            boldsymbol: [],
            braket: [],
            bussproofs: [],
            cancel: [],
            enclose: [],
            extpfeil: [],
            html: [],
            verb: [],
        },
        displayMath: [["\\[", "\\]"], ["$$", "$$"]],
        inlineMath: [["\\(", "\\)"], ["$", "$"]],
        useLabelIds: false,
        tags: "ams",
        tagformat: {
            id: (id) => "eq:" + id.replace(/\s/g, "_"),
        },
    },

    output: {
        displayOverflow: "scroll",
    },

    options: {
        enableMenu: false,
    },
};
