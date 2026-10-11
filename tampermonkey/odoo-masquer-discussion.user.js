// ==UserScript==
// @name         Odoo : masquer le panneau de discussion
// @namespace    https://www.asmozia.com/
// @version      1.0.0
// @description  Masque ou affiche le panneau de discussion (chatter) des fiches Odoo 19, par un bouton ou Alt+Maj+C, et élargit la fiche dans l'espace libéré.
// @author       Asmozia
// @match        https://votre-domaine.odoo.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    const STORAGE_KEY = "asm_chatter_hidden";
    const HIDDEN_CLASS = "asm-chatter-hidden";
    const CHATTER = ".o-mail-Form-chatter";

    // Le chatter masqué libère sa colonne : la fiche reprend toute la largeur.
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
                ? '<i class="fa fa-comments"></i> Afficher la discussion'
                : '<i class="fa fa-eye-slash"></i> Masquer la discussion';
        }
    };

    const toggle = () => {
        const hidden = !isHidden();
        try {
            localStorage.setItem(STORAGE_KEY, hidden ? "1" : "0");
        } catch {
            // Stockage indisponible : l'état ne vaut que pour la page en cours.
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
        button.title = "Raccourci : Alt+Maj+C";
        button.addEventListener("click", toggle);
        document.body.appendChild(button);
        apply(isHidden());
    };

    // Odoo est une application monopage : le bouton n'apparaît que sur une fiche avec chatter.
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
