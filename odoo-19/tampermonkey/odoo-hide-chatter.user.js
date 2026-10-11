// ==UserScript==
// @name         Odoo 19: hide the chatter
// @namespace    https://www.asmozia.com/
// @version      1.1.0
// @description  Hides or shows the chatter on Odoo 19 forms, with a button or Alt+Shift+C, and widens the form into the freed space.
// @author       Asmozia
// @match        https://your-domain.odoo.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    const STORAGE_KEY = "asm_chatter_hidden";
    const HIDDEN_CLASS = "asm-chatter-hidden";
    const CHATTER = ".o-mail-Form-chatter";

    // Labels follow the Odoo interface language (French or English).
    const FR = (document.documentElement.lang || navigator.language || "").toLowerCase().startsWith("fr");
    const LABELS = FR
        ? { show: "Afficher la discussion", hide: "Masquer la discussion", shortcut: "Raccourci : Alt+Maj+C" }
        : { show: "Show chatter", hide: "Hide chatter", shortcut: "Shortcut: Alt+Shift+C" };

    // A hidden chatter frees its column: the form takes the full width.
    const style = document.createElement("style");
    style.textContent = `
        html.${HIDDEN_CLASS} ${CHATTER} { display: none !important; }
        html.${HIDDEN_CLASS} .o_form_view .o_form_sheet_bg,
        html.${HIDDEN_CLASS} .o_form_view .o_form_renderer { max-width: none !important; }
        #asm-chatter-toggle {
            position: fixed; right: 16px; bottom: 16px; z-index: 1050;
            display: none; align-items: center; gap: 6px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, .15);
        }
        #asm-chatter-toggle.asm-visible { display: inline-flex; }
    `;
    document.documentElement.appendChild(style);

    const isHidden = () => {
        try {
            return localStorage.getItem(STORAGE_KEY) === "1";
        } catch {
            return false;
        }
    };

    const apply = (hidden) => {
        document.documentElement.classList.toggle(HIDDEN_CLASS, hidden);
        const button = document.getElementById("asm-chatter-toggle");
        if (button) {
            button.innerHTML = hidden
                ? `<i class="fa fa-comments"></i> ${LABELS.show}`
                : `<i class="fa fa-eye-slash"></i> ${LABELS.hide}`;
        }
    };

    const toggle = () => {
        const hidden = !isHidden();
        try {
            localStorage.setItem(STORAGE_KEY, hidden ? "1" : "0");
        } catch {
            // Storage unavailable: the state only lasts for the current page.
        }
        apply(hidden);
    };

    apply(isHidden());

    const mountButton = () => {
        if (document.getElementById("asm-chatter-toggle")) {
            return;
        }
        const button = document.createElement("button");
        button.id = "asm-chatter-toggle";
        button.type = "button";
        button.className = "btn btn-secondary btn-sm";
        button.title = LABELS.shortcut;
        button.addEventListener("click", toggle);
        document.body.appendChild(button);
        apply(isHidden());
    };

    // Odoo is a single-page app: the button only shows on a form that has a chatter.
    const refresh = () => {
        mountButton();
        const button = document.getElementById("asm-chatter-toggle");
        button.classList.toggle("asm-visible", !!document.querySelector(CHATTER));
    };

    document.addEventListener("DOMContentLoaded", () => {
        refresh();
        new MutationObserver(refresh).observe(document.body, { childList: true, subtree: true });
    });

    document.addEventListener("keydown", (event) => {
        if (event.altKey && event.shiftKey && event.code === "KeyC") {
            event.preventDefault();
            toggle();
        }
    });
})();
