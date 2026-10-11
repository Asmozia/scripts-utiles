# Tampermonkey scripts for Odoo 19

## Hide the chatter

[`odoo-hide-chatter.user.js`](odoo-hide-chatter.user.js) adds a "Hide chatter" button (bottom right) and the Alt+Shift+C shortcut to Odoo 19 forms. The chatter disappears and the form takes the full width. The choice is remembered after a reload. Labels follow the Odoo interface language (French or English).

Step-by-step video (in French): https://youtu.be/wLbmtvHQQS4

### Installation

1. Install [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) in the browser that runs your Odoo app (Chrome or Edge).
2. In the extension details (`chrome://extensions` or `edge://extensions`, Tampermonkey, Details), turn on "Allow user scripts".
3. Open [the raw script](https://raw.githubusercontent.com/Asmozia/tools/main/odoo-19/tampermonkey/odoo-hide-chatter.user.js): Tampermonkey offers to install it. You can also copy it, then in Tampermonkey: "Create a new script...", replace everything with the copied content, File, Save.
4. Replace the `@match` line with the address of your Odoo, keeping `https://` at the start and `/*` at the end:

   ```
   // @match        https://my-company.odoo.com/*
   ```

5. Save, then reload Odoo.
