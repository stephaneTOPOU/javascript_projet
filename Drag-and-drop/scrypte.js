
// Fonction d'initialisation
function initDragAndDrop() {
    // Récupérer la liste
    const sortableList = document.getElementById('sortable-list');

    // Récupérer les éléments enfants de la liste
    const listItems = sortableList.children;

    // Écouter l'événement de glisser-déposer pour chaque élément
    Array.from(listItems).forEach(item => {
        item.draggable = true;
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', drop);
    });
}

// Fonction de démarrage du glisser-déposer
function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

// Fonction de survol lors du glisser-déposer
function dragOver(event) {
    event.preventDefault();
}

// Fonction de lâcher lors du glisser-déposer
function drop(event) {
    event.preventDefault();

    // Récupérer l'élément déplacé
    const draggedItemId = event.dataTransfer.getData('text/plain');
    const draggedItem = document.getElementById(draggedItemId);

    // Récupérer l'élément cible
    const targetItem = event.currentTarget;

    // Insérer l'élément déplacé avant l'élément cible
    targetItem.parentNode.insertBefore(draggedItem, targetItem);

    // Enregistrer l'ordre dans le stockage local du navigateur
    saveListOrder();
}

// Fonction pour enregistrer l'ordre de la liste dans le stockage local du navigateur
function saveListOrder() {
    const sortableList = document.getElementById('sortable-list');

    // Récupérer les identifiants des éléments dans l'ordre actuel
    const itemIds = Array.from(sortableList.children).map(item => item.id);

    // Enregistrer les identifiants dans le stockage local
    localStorage.setItem('listOrder', JSON.stringify(itemIds));
}

// Fonction pour charger l'ordre de la liste depuis le stockage local du navigateur
function loadListOrder() {
    const sortableList = document.getElementById('sortable-list');

    // Récupérer l'ordre des identifiants depuis le stockage local
    const savedOrder = localStorage.getItem('listOrder');

    if (savedOrder) {
        // Convertir l'ordre en tableau
        const itemIds = JSON.parse(savedOrder);

        // Réorganiser les éléments de la liste selon l'ordre enregistré
        itemIds.forEach(itemId => {
            const item = document.getElementById(itemId);
            sortableList.appendChild(item);
        });
    }
}

// Appeler la fonction d'initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    initDragAndDrop();
    loadListOrder();
});

