/* =========================================
   SOUFYA SHOP
   STORE FUNCTIONALITY
========================================= */


/* =========================================
   WHATSAPP NUMBER
========================================= */

// بدّل هاد الرقم برقم WhatsApp ديال المتجر
// خاصو يكون بالصيغة الدولية بدون +
const WHATSAPP_NUMBER = "212627775849";
/* =========================================
   PRODUCTS
========================================= */

const products = [

    {
        id: 1,
        name: "Glow Face Serum",
        category: "beauty",
        categoryName: "الجمال",
        price: 149,
        oldPrice: 199,
        badge: "الأكثر مبيعاً",
        rating: 5,
        image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=700&q=85",
        description: "سيروم للعناية بالبشرة وإعطائها مظهراً أكثر نضارة."
    },

    {
        id: 2,
        name: "Luxury Beauty Set",
        category: "beauty",
        categoryName: "الجمال",
        price: 249,
        oldPrice: 329,
        badge: "خصم 24%",
        rating: 5,
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=700&q=85",
        description: "مجموعة عناية أنيقة مناسبة للاستعمال اليومي."
    },

    {
        id: 3,
        name: "Makeup Essentials",
        category: "beauty",
        categoryName: "الجمال",
        price: 179,
        oldPrice: 229,
        badge: "جديد",
        rating: 4,
        image: "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?auto=format&fit=crop&w=700&q=85",
        description: "مجموعة أساسية لمحبي المكياج والعناية بالمظهر."
    },

    {
        id: 4,
        name: "Smart Kitchen Tool",
        category: "home",
        categoryName: "المنزل",
        price: 119,
        oldPrice: 159,
        badge: "عرض",
        rating: 5,
        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=700&q=85",
        description: "أداة عملية للمطبخ تساعدك على ربح الوقت."
    },

    {
        id: 5,
        name: "Portable Mini Gadget",
        category: "gadgets",
        categoryName: "Gadgets",
        price: 199,
        oldPrice: 249,
        badge: "الأكثر طلباً",
        rating: 5,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85",
        description: "Gadget صغير وعملي للاستعمال اليومي."
    },

    {
        id: 6,
        name: "Pet Grooming Brush",
        category: "pets",
        categoryName: "الحيوانات",
        price: 89,
        oldPrice: 119,
        badge: "عرض",
        rating: 5,
        image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=700&q=85",
        description: "فرشاة للعناية بشعر الحيوانات الأليفة."
    },

    {
        id: 7,
        name: "Premium Skincare Set",
        category: "beauty",
        categoryName: "الجمال",
        price: 299,
        oldPrice: 399,
        badge: "خصم",
        rating: 5,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=700&q=85",
        description: "مجموعة Premium للعناية بالبشرة."
    },

    {
        id: 8,
        name: "Home Organizer",
        category: "home",
        categoryName: "المنزل",
        price: 129,
        oldPrice: 169,
        badge: "جديد",
        rating: 4,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=85",
        description: "منظم عملي للبيت يساعدك على ترتيب الأشياء."
    }

];


/* =========================================
   CART
========================================= */

let cart = JSON.parse(localStorage.getItem("soufyaCart")) || [];


/* =========================================
   DOM
========================================= */

const productsGrid = document.getElementById("productsGrid");

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const checkoutBtn = document.getElementById("checkoutBtn");

const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutForm = document.getElementById("checkoutForm");

const searchBtn = document.getElementById("searchBtn");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

const toast = document.getElementById("toast");


/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {
    return `${price.toLocaleString("fr-MA")} DH`;
}


/* =========================================
   RENDER PRODUCTS
========================================= */

function renderProducts(category = "all", search = "") {

    const searchText = search.toLowerCase().trim();

    const filteredProducts = products.filter(product => {

        const categoryMatch =
            category === "all" ||
            product.category === category;

        const searchMatch =
            product.name.toLowerCase().includes(searchText) ||
            product.categoryName.toLowerCase().includes(searchText);

        return categoryMatch && searchMatch;
    });


    if (filteredProducts.length === 0) {

        productsGrid.innerHTML = `
            <div style="
                grid-column: 1/-1;
                text-align:center;
                padding:60px 20px;
            ">
                <h3>ما لقيناش المنتج 😔</h3>
                <p style="color:#888;margin-top:10px;">
                    جرب كلمة بحث أخرى.
                </p>
            </div>
        `;

        return;
    }


    productsGrid.innerHTML = filteredProducts.map(product => {

        const stars = "★".repeat(product.rating) +
                      "☆".repeat(5 - product.rating);


        return `

            <article class="product-card">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                    <span class="product-badge">
                        ${product.badge}
                    </span>

                    <button
                        class="quick-add"
                        onclick="addToCart(${product.id})"
                    >
                        + أضف للسلة
                    </button>

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${product.categoryName}
                    </span>

                    <h3 class="product-name">
                        ${product.name}
                    </h3>

                    <div class="product-rating">
                        ${stars}
                    </div>

                    <div class="product-price">

                        <strong class="current-price">
                            ${formatPrice(product.price)}
                        </strong>

                        <span class="old-price">
                            ${formatPrice(product.oldPrice)}
                        </span>

                    </div>

                    <button
                        class="quick-add"
                        style="opacity:1;transform:none;position:static;margin-top:10px;border:1px solid #eee4df;"
                        onclick="addToCart(${product.id})"
                    >
                        أضف للسلة
                    </button>

                </div>

            </article>

        `;

    }).join("");
}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(productId) {

    const product = products.find(
        product => product.id === productId
    );

    if (!product) return;


    const existingProduct = cart.find(
        item => item.id === productId
    );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            id: product.id,
            quantity: 1
        });

    }


    saveCart();

    renderCart();

    showToast("تمت إضافة المنتج للسلة ✅");

}


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "soufyaCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   CART TOTAL
========================================= */

function getCartTotal() {

    return cart.reduce((total, item) => {

        const product = products.find(
            product => product.id === item.id
        );

        if (!product) return total;

        return total + product.price * item.quantity;

    }, 0);

}


/* =========================================
   CART COUNT
========================================= */

function getCartCount() {

    return cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

}


/* =========================================
   RENDER CART
========================================= */

function renderCart() {

    const count = getCartCount();

    cartCount.textContent = count;


    const total = getCartTotal();

    cartTotal.textContent = formatPrice(total);


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                🛒

                <p>
                    السلة خاوية
                </p>

            </div>
        `;

        return;
    }


    cartItems.innerHTML = cart.map(item => {

        const product = products.find(
            product => product.id === item.id
        );

        if (!product) return "";


        return `

            <div class="cart-item">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >


                <div>

                    <div class="cart-item-name">
                        ${product.name}
                    </div>

                    <div class="cart-item-price">
                        ${formatPrice(product.price)}
                    </div>


                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${product.id}, -1)"
                        >
                            −
                        </button>

                        <strong>
                            ${item.quantity}
                        </strong>

                        <button
                            onclick="changeQuantity(${product.id}, 1)"
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="remove-item"
                        onclick="removeFromCart(${product.id})"
                    >
                        حذف
                    </button>

                </div>

            </div>

        `;

    }).join("");

}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(productId, amount) {

    const item = cart.find(
        item => item.id === productId
    );

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== productId
        );

    }


    saveCart();

    renderCart();

}


/* =========================================
   REMOVE PRODUCT
========================================= */

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();

    renderCart();

}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    cartDrawer.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================
   CLOSE CART
========================================= */

function closeCartDrawer() {

    cartDrawer.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================
   CHECKOUT
========================================= */

function openCheckout() {

    if (cart.length === 0) {

        showToast("السلة خاوية 🛒");

        return;
    }


    checkoutModal.classList.add("active");

}


function closeCheckoutModal() {

    checkoutModal.classList.remove("active");

}


/* =========================================
   WHATSAPP CHECKOUT
========================================= */

checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();


    if (cart.length === 0) {

        showToast("السلة خاوية 🛒");

        return;
    }


    const name =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();

    const city =
        document.getElementById("customerCity").value.trim();

    const address =
        document.getElementById("customerAddress").value.trim();


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    const paymentName =
        payment === "cod"
            ? "الدفع عند الاستلام"
            : "الدفع الإلكتروني";


    let message =
`🛍️ *طلب جديد من Soufya Shop*

👤 الاسم: ${name}

📱 الهاتف: ${phone}

📍 المدينة: ${city}

🏠 العنوان:
${address}

💳 طريقة الدفع:
${paymentName}

🛒 المنتجات:

`;


    cart.forEach(item => {

        const product = products.find(
            product => product.id === item.id
        );

        if (!product) return;


        message +=
`• ${product.name}
  الكمية: ${item.quantity}
  السعر: ${formatPrice(product.price * item.quantity)}

`;

    });


    message +=
`💰 *المجموع: ${formatPrice(getCartTotal())}*

شكراً لطلبكم من Soufya Shop ❤️`;


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );


    /*
       هنا ما كنمسحوش السلة مباشرة.
       من بعد ما نربطو المتجر بقاعدة البيانات
       نقدروا نضيفو نظام الطلبات الحقيقي.
    */

});


/* =========================================
   SEARCH
========================================= */

function openSearch() {

    searchOverlay.classList.add("active");

    searchInput.focus();

}


function closeSearchBox() {

    searchOverlay.classList.remove("active");

    searchInput.value = "";

    renderProducts();

}


searchInput.addEventListener("input", function() {

    renderProducts("all", searchInput.value);

});


/* =========================================
   CATEGORY FILTER
========================================= */

document.querySelectorAll(".filter").forEach(button => {

    button.addEventListener("click", function() {

        document
            .querySelectorAll(".filter")
            .forEach(btn => {
                btn.classList.remove("active");
            });


        this.classList.add("active");


        const category =
            this.dataset.category;


        renderProducts(category);

    });

});


/* =========================================
   MOBILE MENU
========================================= */

function openMobileMenu() {

    mobileMenu.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeMobileMenu() {

    mobileMenu.classList.remove("active");

    document.body.style.overflow = "";

}


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


/* =========================================
   TOAST
========================================= */

let toastTimeout;


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================================
   NEWSLETTER
========================================= */

document
    .getElementById("newsletterForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        showToast("شكراً على الاشتراك ❤️");

        this.reset();

    });


/* =========================================
   EVENTS
========================================= */

cartBtn.addEventListener(
    "click",
    openCart
);

closeCart.addEventListener(
    "click",
    closeCartDrawer
);

cartOverlay.addEventListener(
    "click",
    closeCartDrawer
);

checkoutBtn.addEventListener(
    "click",
    openCheckout
);

closeCheckout.addEventListener(
    "click",
    closeCheckoutModal
);

searchBtn.addEventListener(
    "click",
    openSearch
);

closeSearch.addEventListener(
    "click",
    closeSearchBox
);

menuBtn.addEventListener(
    "click",
    openMobileMenu
);

closeMenu.addEventListener(
    "click",
    closeMobileMenu
);


/* =========================================
   CLOSE MODALS WHEN CLICK OUTSIDE
========================================= */

checkoutModal.addEventListener(
    "click",
    function(event) {

        if (event.target === checkoutModal) {

            closeCheckoutModal();

        }

    }
);


searchOverlay.addEventListener(
    "click",
    function(event) {

        if (event.target === searchOverlay) {

            closeSearchBox();

        }

    }
);


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeCartDrawer();

            closeCheckoutModal();

            closeSearchBox();

            closeMobileMenu();

        }

    }
);


/* =========================================
   YEAR
========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================
   INITIALIZE
========================================= */

renderProducts();

renderCart();

