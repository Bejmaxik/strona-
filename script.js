/* ============================================================
   script.js – BAZA DANYCH + LOGIKA (połączone)
   ============================================================ */

// ---------- DANE PRODUKTÓW (tablica obiektów) ----------
// Aby dodać nowy produkt, wystarczy dodać nowy obiekt do tablicy products
// z polami: id, title, description, image, price, category, link
// Strona automatycznie go wyświetli po odświeżeniu.

const products = [
    {
        id: 1,
        title: "Bluza z kapturem – Essential",
        description: "Wygodna, bawełniana bluza w klasycznym kroju. Idealna na co dzień.",
        image: "https://picsum.photos/seed/bluza1/400/400",
        price: 219.99,
        category: "Odzież",
        link: "https://example.com/product/1"
    },
    {
        id: 2,
        title: "Trampki niskie – Canvas",
        description: "Płócienne trampki z gumową podeszwą. Dostępne w kilku kolorach.",
        image: "https://picsum.photos/seed/trampki2/400/400",
        price: 149.50,
        category: "Obuwie",
        link: "https://example.com/product/2"
    },
    {
        id: 3,
        title: "Skórzany plecak – Vintage",
        description: "Plecak z naturalnej skóry, pojemność 20L, idealny do miasta.",
        image: "https://picsum.photos/seed/plecak3/400/400",
        price: 389.00,
        category: "Akcesoria",
        link: "https://example.com/product/3"
    },
    {
        id: 4,
        title: "T-shirt bawełniany – Logo",
        description: "Lekki, przewiewny t-shirt z nadrukiem. Gramatura 180 g/m².",
        image: "https://picsum.photos/seed/tshirt4/400/400",
        price: 89.99,
        category: "Odzież",
        link: "https://example.com/product/4"
    },
    {
        id: 5,
        title: "Buty sportowe – Runner",
        description: "Lekkie buty do biegania z amortyzacją i siateczką oddychającą.",
        image: "https://picsum.photos/seed/buty5/400/400",
        price: 279.00,
        category: "Obuwie",
        link: "https://example.com/product/5"
    },
    {
        id: 6,
        title: "Zegarek analogowy – Classic",
        description: "Elegancki zegarek z kopertą ze stali szlachetnej i skórzanym paskiem.",
        image: "https://picsum.photos/seed/zegarek6/400/400",
        price: 459.00,
        category: "Akcesoria",
        link: "https://example.com/product/6"
    },
    {
        id: 7,
        title: "Kurtka przejściowa – Field",
        description: "Wodoodporna kurtka z kapturem, zapinana na zamek i zatrzaski.",
        image: "https://picsum.photos/seed/kurtka7/400/400",
        price: 349.90,
        category: "Odzież",
        link: "https://example.com/product/7"
    },
    {
        id: 8,
        title: "Sandały skórzane – Summer",
        description: "Ręcznie wykonane sandały z miękkiej skóry, regulowane paski.",
        image: "https://picsum.photos/seed/sandaly8/400/400",
        price: 189.00,
        category: "Obuwie",
        link: "https://example.com/product/8"
    },
    {
        id: 9,
        title: "Torba na ramię – Messenger",
        description: "Pojemna torba z przegrodą na laptopa, wodoodporna poliestrowa.",
        image: "https://picsum.photos/seed/torba9/400/400",
        price: 159.00,
        category: "Akcesoria",
        link: "https://example.com/product/9"
    },
    {
        id: 10,
        title: "Czapka beanie – Wełniana",
        description: "Ciepła czapka z domieszką wełny, podwójna grubość, uniseks.",
        image: "https://picsum.photos/seed/beanie10/400/400",
        price: 69.99,
        category: "Akcesoria",
        link: "https://example.com/product/10"
    },
    {
        id: 11,
        title: "Jeansy slim fit – 511",
        description: "Wąskie spodnie jeansowe z elastycznym denimem, 5 kieszeni.",
        image: "https://picsum.photos/seed/jeans11/400/400",
        price: 199.00,
        category: "Odzież",
        link: "https://example.com/product/11"
    },
    {
        id: 12,
        title: "Buty zimowe – Trapper",
        description: "Ocieplane buty z cholewką, antypoślizgowa podeszwa, do -20°C.",
        image: "https://picsum.photos/seed/zima12/400/400",
        price: 329.00,
        category: "Obuwie",
        link: "https://example.com/product/12"
    }
];

// ---------- LOGIKA APLIKACJI ----------

// Elementy DOM
const productsGrid = document.getElementById('productsGrid');
const emptyMessage = document.getElementById('emptyMessage');
const filterButtons = document.querySelectorAll('.tools__filter-btn');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalDescription = document.getElementById('modalDescription');
const modalPrice = document.getElementById('modalPrice');
const modalLink = document.getElementById('modalLink');

let currentCategory = 'all';
let currentSearch = '';
let currentSort = 'default';

// ---- Renderowanie kart ---- //
function renderProducts() {
    // Filtrowanie
    let filtered = products.filter(p => {
        const matchCategory = currentCategory === 'all' || p.category === currentCategory;
        const searchTerm = currentSearch.toLowerCase();
        const matchSearch = p.title.toLowerCase().includes(searchTerm) ||
                            p.description.toLowerCase().includes(searchTerm);
        return matchCategory && matchSearch;
    });

    // Sortowanie
    if (currentSort === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'name-asc') {
        filtered.sort((a, b) => a.title.localeCompare(b.title, 'pl'));
    } else if (currentSort === 'name-desc') {
        filtered.sort((a, b) => b.title.localeCompare(a.title, 'pl'));
    }

    // Czyszczenie siatki
    productsGrid.innerHTML = '';

    if (filtered.length === 0) {
        emptyMessage.hidden = false;
        return;
    }
    emptyMessage.hidden = true;

    // Generowanie kart
    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.id = product.id;

        card.innerHTML = `
            <div class="product-card__image-wrap">
                <img class="product-card__image" src="${product.image}" alt="${product.title}" loading="lazy" />
            </div>
            <div class="product-card__body">
                <span class="product-card__category">${product.category}</span>
                <h3 class="product-card__title">${product.title}</h3>
                <p class="product-card__description">${product.description}</p>
            </div>
            <div class="product-card__footer">
                <span class="product-card__price">${product.price.toFixed(2)} zł</span>
                <a class="product-card__link" href="${product.link}" target="_blank" rel="noopener">Zobacz</a>
            </div>
        `;

        // Kliknięcie w kartę otwiera modal (oprócz kliknięcia w link)
        card.addEventListener('click', (e) => {
            if (e.target.closest('.product-card__link')) return; // link otwiera się normalnie
            openModal(product);
        });

        productsGrid.appendChild(card);
    });
}

// ---- Modal ---- //
function openModal(product) {
    modalImage.src = product.image;
    modalImage.alt = product.title;
    modalTitle.textContent = product.title;
    modalCategory.textContent = product.category;
    modalDescription.textContent = product.description;
    modalPrice.textContent = `${product.price.toFixed(2)} zł`;
    modalLink.href = product.link;
    modalOverlay.hidden = false;
    document.body.style.overflow = 'hidden'; // blokada scrolla
}

function closeModal() {
    modalOverlay.hidden = true;
    document.body.style.overflow = '';
}

// ---- Eventy ---- //

// Filtry kategorii
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
       
