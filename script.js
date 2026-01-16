// Sabhi 'Order Now' buttons ko select karein
const orderButtons = document.querySelectorAll('.order-btn');

orderButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Button ke attributes se flavor aur price nikalna
        const flavor = button.getAttribute('data-flavor');
        const price = button.getAttribute('data-price');
        
        // Ab humein yahan prompt() ya alert() ki zaroorat nahi hai
        // Seedha order.html par redirect karein taaki item cart mein add ho jaye
        const url = `order.html?flavor=${encodeURIComponent(flavor)}&price=${encodeURIComponent(price)}`;
        
        // Button ka look thodi der ke liye badlein (User experience ke liye)
        button.innerText = "Adding...";
        button.style.background = "#fab1a0";

        // Redirection
        window.location.href = url;
    });
});
