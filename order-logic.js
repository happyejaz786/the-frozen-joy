// 1. URL se Flavor aur Price nikalna
const params = new URLSearchParams(window.location.search);
const flavor = params.get('flavor') || "Ice Cream";
const price = params.get('price') || "0";

document.getElementById('display-flavor').innerText = flavor;
document.getElementById('display-price').innerText = price;

// 2. WhatsApp bhejney ka function
function sendToWhatsApp() {
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;

    if (name.trim() === "" || phone.trim() === "") {
        alert("Kirpya apna naam aur WhatsApp number sahi se bharein!");
        return;
    }

    // Number cleaning: Sirf digits rakhein
    let cleanPhone = phone.replace(/\D/g, '');

    // Agar 10 digit hai toh 91 jodein
    if (cleanPhone.length === 10) {
        cleanPhone = "91" + cleanPhone;
    }

    // Message Content
    const message = `*Order Confirmation - The Frozen Joy* 🍨\n\n` +
                    `Namaste *${name}*! Aapka order confirm ho gaya hai.\n\n` +
                    `🍦 *Item:* ${flavor}\n` +
                    `💰 *Price:* ₹${price}\n\n` +
                    `Dhanyawad! Jaldi milte hain. ✨`;

    // FIX: + Prefix ke saath universal link ka istemal
    // Hum "https://wa.me/" use karenge jo sabse zyada compatible hai
    const waUrl = `https://wa.me/+${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    // Console mein check karne ke liye (F12 daba kar dekh sakte hain)
    console.log("Redirecting to:", waUrl);

    // Redirect logic
    window.location.href = waUrl;
}
