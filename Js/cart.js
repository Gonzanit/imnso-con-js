document.addEventListener('DOMContentLoaded', () => {
    const products = [
      { id: 1, name: 'Pokemon', price: 10 },
      { id: 2, name: 'Blockbuster', price: 20 },
      { id: 3, name: 'Monsters Inc', price: 30 }
    ];
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsElement = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
  
    // Función para renderizar el carrito
    function updateCart() {
      cartItemsElement.innerHTML = '';
      let total = 0;
  
      cart.forEach(item => {
        total += item.price;
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} - $${item.price}`;
        cartItemsElement.appendChild(cartItem);
      });
  
      totalElement.textContent = total.toFixed(2);
    }
  
    // Función para añadir al carrito
    function addToCart(id) {
      const product = products.find(p => p.id === id);
      if (product) {
        cart.push(product);
        updateCart();
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  
    // Función para vaciar el carrito
    document.getElementById('clear-cart').addEventListener('click', () => {
      cart = [];
      updateCart();
      localStorage.removeItem('cart');
    });
  
    // Definir eventos para los botones de compra
    document.querySelectorAll('.productos .btn-dark').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del enlace
        const productId = parseInt(button.getAttribute('data-id'));
        addToCart(productId);
      });
    });
  
    // Inicializar el carrito
    updateCart();
  });
  