import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const shoppingList = document.getElementById('shopping-list');
  const addItemForm = document.getElementById('add-item-form');
  const newItemInput = document.getElementById('new-item');

  // Function to render the shopping list
  async function renderShoppingList() {
    const items = await backend.getItems();
    shoppingList.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      li.className = `shopping-item ${item.completed ? 'completed' : ''}`;
      li.innerHTML = `
        <i class="far ${item.completed ? 'fa-check-square' : 'fa-square'}"></i>
        <span>${item.text}</span>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
      `;
      li.querySelector('i').addEventListener('click', async () => {
        await backend.toggleItem(item.id);
        renderShoppingList();
      });
      li.querySelector('.delete-btn').addEventListener('click', async () => {
        await backend.deleteItem(item.id);
        renderShoppingList();
      });
      shoppingList.appendChild(li);
    });
  }

  // Add new item
  addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = newItemInput.value.trim();
    if (text) {
      await backend.addItem(text);
      newItemInput.value = '';
      renderShoppingList();
    }
  });

  // Initial render
  renderShoppingList();
});
