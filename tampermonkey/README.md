# Scripts Tampermonkey

## Odoo : masquer le panneau de discussion

[`odoo-masquer-discussion.user.js`](odoo-masquer-discussion.user.js) ajoute sur les fiches Odoo 19 un bouton « Masquer la discussion » (en bas à droite) et le raccourci Alt+Maj+C. Le panneau de discussion disparaît et la fiche prend toute la largeur. Le choix est mémorisé après un rechargement.

Vidéo pas à pas : [lien YouTube à venir]

### Installation

1. Installez [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) dans le navigateur qui porte votre application Odoo (Chrome ou Edge).
2. Dans les détails de l'extension (`chrome://extensions` ou `edge://extensions`, Tampermonkey, Détails), activez « Autoriser les scripts utilisateur ».
3. Ouvrez [le script en version brute](https://raw.githubusercontent.com/Asmozia/scripts-utiles/main/tampermonkey/odoo-masquer-discussion.user.js) : Tampermonkey propose de l'installer. Vous pouvez aussi le copier, puis dans Tampermonkey : « Créer un nouveau script… », tout remplacer par le contenu copié, Fichier, Enregistrer.
4. Remplacez la ligne `@match` par l'adresse de votre Odoo, en gardant `https://` au début et `/*` à la fin :

   ```
   // @match        https://mon-entreprise.odoo.com/*
   ```

5. Enregistrez, puis rechargez Odoo.
