# Tutoriel Modale (Modals en JavaScript)

Ce projet montre comment implémenter une boîte modale accessible, stylisée avec CSS et gérée en JavaScript. Il inclut deux types de modales :

- Une modale **locale** directement présente dans la page (`index.html`)
- Une modale **chargée dynamiquement via Ajax** à partir d'une autre page (`modal.html`)

---

## 📁 Fichiers inclus

### `index.html`
- Page principale.
- Contient un lien pour ouvrir une modale locale avec l'ID `#modal`.
- Contient un lien pour charger une modale via Ajax depuis `modal.html#modal2`.

### `modal.html`
- Fichier partiel contenant une modale nommée `#modal2`.
- Elle peut être chargée dynamiquement par `index.html`.

### `style.css`
- Gère l'apparence des modales et leurs animations.
- Inclut :
  - Le fond sombre (`.modal`)
  - L’animation d’apparition/disparition (`fadeIn`, `fadeOut`)
  - Le contenu de la modale (`.modal-wrapper`) avec animation verticale

### `app.js ou script.js`
- Script JavaScript qui :
  - Ouvre les modales locales via un clic sur un lien.
  - Charge et affiche dynamiquement une modale distante via `fetch()`.
  - Gère la fermeture de la modale via bouton ou touche `Échap`.
  - Met à jour les attributs `aria-hidden` pour l'accessibilité.
  - Gèle le défilement de la page en arrière-plan lors de l'ouverture d'une modale.

---

## ▶️ Fonctionnement

1. **Modale locale :**
   ```html
   <a href="#modal" class="js-modal">Ouvrir la boite modale</a>
