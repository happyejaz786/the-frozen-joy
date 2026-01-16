// Jab pura page load ho jaye tabhi logic shuru ho
window.onload = function() {
    
    // 1. URL se naya item nikalna
    const params = new URLSearchParams(window.location.search);
    const newFlavor = params.get('flavor');
    const newPrice = params.get('price');

    // 2. LocalStorage se cart load karna
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];

    // 3. Agar URL mein naya data hai, toh use cart mein add karein
    if (newFlavor && newPrice) {
        cart.push({ 
            name: decodeURIComponent(newFlavor), 
            price: parseInt(newPrice) 
        });
        localStorage.setItem('myCart', JSON.stringify(cart));
        
        // URL saaf karein taaki refresh par repeat na ho
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
    }

    // 4. Cart dikhane ka function
    function displayCart() {
        const cartContainer = document.getElementById('display-flavor');
        const priceContainer = document.getElementById('display-price');
        
        if (!cartContainer || !priceContainer) return; // Error handle agar ID na mile

        if (cart.length === 0) {
            cartContainer.innerHTML = `<p style="text-align:center; color:#999;">Cart khali hai. Menu se kuch chunein!</p>`;
            priceContainer.innerText = "0";
            return;
        }

        let total = 0;
        let htmlContent = "";

        cart.forEach((item, index) => {
            htmlContent += `
                <div class="cart-item" style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
                    <span class="item-info">${item.name} - ₹${item.price}</span>
                    <button class="remove-btn" onclick="removeItem(${index})" style="color:red; cursor:pointer; background:none; border:none;">❌</button>
                </div>`;
            total += item.price;
        });

        cartContainer.innerHTML = htmlContent;
        priceContainer.innerText = total;
    }

    // 5. Item remove karne ka function (Global scope ke liye window. use karein)
    window.removeItem = function(index) {
        cart.splice(index, 1);
        localStorage.setItem('myCart', JSON.stringify(cart));
        displayCart();
    };

    // 6. Final WhatsApp Send function
    window.sendToWhatsApp = function() {
        const nameInput = document.getElementById('cust-name');
        const phoneInput = document.getElementById('cust-phone');
        
        if (!nameInput || !phoneInput) return;

        const name = nameInput.value;
        const phone = phoneInput.value;

        if (name.trim() === "" || phone.trim() === "" || cart.length === 0) {
            alert("Kirpya Naam, Number aur kam se kam 1 Item select karein!");
            return;
        }

        let itemList = cart.map(item => `- ${item.name} (₹${item.price})`).join('\n');
        let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

        const message = `*The Frozen Joy - New Order* 🍨\n\n👤 Customer: ${name}\n📞 Contact: ${phone}\n\n*Items:*\n${itemList}\n\n💰 Total: ₹${totalPrice}`;

        let cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length === 10) cleanPhone = "91" + cleanPhone;

        const waUrl = `https://wa.me/+${cleanPhone}?text=${encodeURIComponent(message)}`;
        
        localStorage.removeItem('myCart'); // Order ke baad cart saaf karein
        window.location.href = waUrl;
    };

    // Page khulte hi cart display karein
    displayCart();
};
