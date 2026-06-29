// ============================================================
// script.js – kompletna logika aplikacji
// ============================================================
// Funkcje: motyw, popupy, tłumaczenia, karty, filtrowanie, modal
// ============================================================

(function () {
  "use strict";

  // ============================================================
  // 1. STAN APLIKACJI
  // ============================================================
  const state = {
    currentLang: "pl",
    theme: localStorage.getItem("archivetheme") || "dark",
    activeCategory: "all",
    searchQuery: "",
    sortValue: "default",
  };

  // ============================================================
  // 2. TŁUMACZENIA (PL / EN)
  // ============================================================
  const translations = {
    pl: {
      choose_lang: "🌐 Wybierz język",
      lang_sub: "Możesz później zmienić w stopce.",
      usfans_coupons: "💰 500$ in coupons here",
      claim_now: "Odbierz teraz →",
      theme_label: "Motyw",
      subtitle: "Katalog sprawdzonych reprodukcji",
      search_placeholder: "Szukaj produktu…",
      all: "Wszystkie",
      clothes: "Ubrania",
      shoes: "Obuwie",
      accessories: "Akcesoria",
      sort: "Sortuj:",
      default_sort: "Domyślnie",
      price_asc: "Cena ↑",
      price_desc: "Cena ↓",
      name_asc: "Nazwa A–Z",
      name_desc: "Nazwa Z–A",
      no_products: "Brak produktów spełniających kryteria.",
      view_product: "Zobacz produkt →",
      kako_link: "📦 Kakolink",
      usfans_link: "⚡ USFans",
      footer_text: "© 2025 ArchiveReps — Katalog tworzony przez społeczność.",
      footer_hint: "Aby dodać produkt, edytuj plik products.js",
      lang_footer: "Język:",
    },
    en: {
      choose_lang: "🌐 Choose language",
      lang_sub: "You can change it later in the footer.",
      usfans_coupons: "💰 500$ in coupons here",
      claim_now: "Claim now →",
      theme_label: "Theme",
      subtitle: "Catalog of verified replicas",
      search_placeholder: "Search products…",
      all: "All",
      clothes: "Clothing",
      shoes: "Footwear",
      accessories: "Accessories",
      sort: "Sort:",
      default_sort: "Default",
      price_asc: "Price ↑",
      price_desc: "Price ↓",
      name_asc: "Name A–Z",
      name_desc: "Name Z–A",
      no_products: "No products matching your criteria.",
      view_product: "View product →",
      kako_link: "📦 Kakolink",
      usfans_link: "⚡ USFans",
      footer_text: "© 2025 ArchiveReps — Catalog created by community.",
      footer_hint: "To add a product, edit the products.js file",
      lang_footer: "Language:",
    },
  };

  // ============================================================
  // 3. POMOCNICZE
  // ============================================================
  function t(key) {
    return translations[state.currentLang][key] || key;
  }

  function formatPrice(price) {
    return price.toFixed(2) + (state.currentLang === "pl" ? " PLN" : " USD");
  }

  // ============================================================
  // 4. ZASTOSOWANIE TŁUMACZEŃ NA STRONIE
  // ============================================================
  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      el.placeholder = t(key);
    });
    document.querySelectorAll(".lang-switch").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === state.currentLang);
    });
  }

  // ============================================================
  // 5. ZMIANA JĘZYKA
  // ============================================================
  function setLanguage(lang) {
    state.currentLang = lang;
    localStorage.setItem("archivelang", lang);
    applyTranslations();
    // Przetłumacz ceny w kartach (przy następnym renderowaniu)
    renderProducts();
  }

  // ============================================================
  // 6. MOTYW (CIEMNY / JASNY)
  // ============================================================
  function applyTheme(theme) {
    state.theme = theme;
    document.body.classList.remove("theme-dark", "theme-light");
    document.body.classList.add("theme-" + theme);
    localStorage.setItem("archivetheme", theme);
    const icon = document.getElementById("themeIcon");
    if (icon) {
      icon.textContent = theme === "dark" ? "🌙" : "☀️";
    }
  }

  function toggleTheme() {
    const newTheme = state.theme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  }

  // ============================================================
  // 7. POPUPY
  // ============================================================
  function showPopup(id) {
    const popup = document.getElementById(id);
    if (popup) popup.style.display = "flex";
  }

  function hidePopup(id) {
    const popup = document.getElementById(id);
    if (popup) popup.style.display = "none";
  }

  // ============================================================
  // 8. RENDEROWANIE KART PRODUKTÓW
  // ============================================================
  function renderProducts() {
    const grid = document.getElementById("productsGrid");
    const emptyMsg = document.getElementById("emptyMessage");
    if (!grid) return;

    // Filtrowanie
    let filtered = [...products];

    if (state.activeCategory !== "all") {
      filtered = filtered.filter((p) => p.category === state.activeCategory);
    }

    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sortowanie
    switch (state.sortValue) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        filtered.sort((a, b) => a.id - b.id);
    }

    grid.innerHTML = "";

    if (filtered.length === 0) {
      emptyMsg.classList.add("visible");
      return;
    }
    emptyMsg.classList.remove("visible");

    filtered.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.dataset.id = product.id;

      card.innerHTML = `
        <div class="product-card__image-wrap">
          <img src="${product.image}" alt="${product.title}" class="product-card__image" loading="lazy" />
        </div>
        <div class="product-card__body">
          <span class="product-card__category">${product.category}</span>
          <h3 class="product-card__title">${product.title}</h3>
          <p class="product-card__description">${product.description}</p>
          <div class="product-card__footer">
            <span class="product-card__price">${formatPrice(product.price)}</span>
            <span class="product-card__link">${t("view_product")}</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => openModal(product));
      grid.appendChild(card);
    });
  }

  // ============================================================
  // 9. MODAL
  // ============================================================
  function openModal(product) {
    const overlay = document.getElementById("modalOverlay");
    const img = document.getElementById("modalImage");
    const title = document.getElementById("modalTitle");
    const cat = document.getElementById("modalCategory");
    const desc = document.getElementById("modalDescription");
    const price = document.getElementById("modalPrice");
    const link = document.getElementById("modalLink");
    const kakolink = document.getElementById("modalKakolink");
    const usfanslink = document.getElementById("modalUsfanslink");

    img.src = product.image;
    img.alt = product.title;
    title.textContent = product.title;
    cat.textContent = product.category;
    desc.textContent = product.description;
    price.textContent = formatPrice(product.price);
    link.href = product.link;

    // Linki dodatkowe
    if (product.kakolink) {
      kakolink.href = product.kakolink;
      kakolink.style.display = "inline-block";
    } else {
      kakolink.style.display = "none";
    }
    if (product.usfanslink) {
      usfanslink.href = product.usfanslink;
      usfanslink.style.display = "inline-block";
    } else {
      usfanslink.style.display = "none";
    }

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    const overlay = document.getElementById("modalOverlay");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  // ============================================================
  // 10. INICJALIZACJA I ZDARZENIA
  // ============================================================
  document.addEventListener("DOMContentLoaded", function () {
    // --- Motyw ---
    const savedTheme = localStorage.getItem("archivetheme") || "dark";
    applyTheme(savedTheme);

    document.getElementById("themeToggle").addEventListener("click", toggleTheme);

    // --- Język ---
    const savedLang = localStorage.getItem("archivelang") || "pl";
    setLanguage(savedLang);

    // Popup językowy – pierwsze wejście (jeśli brak zapisanego języka)
    if (!localStorage.getItem("archivelang")) {
      showPopup("langPopup");
    }

    // Obsługa przycisków językowych w popupie
    document.querySelectorAll(".popup__btn--lang, .lang-switch").forEach((btn) => {
      btn.addEventListener("click", function () {
        const lang = this.dataset.lang;
        setLanguage(lang);
        hidePopup("langPopup");
        // Po wybraniu języka pokaż popup USFans (tylko raz)
        if (!localStorage.getItem("usfansShown")) {
          setTimeout(() => {
            showPopup("usfansPopup");
            localStorage.setItem("usfansShown", "true");
          }, 500);
        }
      });
    });

    // Zamknięcie popupa USFans
    document.getElementById("closeUsfansPopup").addEventListener("click", function () {
      hidePopup("usfansPopup");
    });

    // Kliknięcie w tło popupa zamyka go
    document.querySelectorAll(".popup-overlay").forEach((overlay) => {
      overlay.addEventListener("click", function (e) {
        if (e.target === this) {
          this.style.display = "none";
        }
      });
    });

    // --- Wyszukiwarka ---
    document.getElementById("searchInput").addEventListener("input", function () {
      state.searchQuery = this.value;
      renderProducts();
    });

    // --- Kategorie ---
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        state.activeCategory = this.dataset.category;
        renderProducts();
      });
    });

    // --- Sortowanie ---
    document.getElementById("sortSelect").addEventListener("change", function () {
      state.sortValue = this.value;
      renderProducts();
    });

    // --- Modal ---
    document.getElementById("modalClose").addEventListener("click", closeModal);
    document.getElementById("modalOverlay").addEventListener("click", function (e) {
      if (e.target === this) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });

    // --- Renderowanie startowe ---
    renderProducts();
  });
})();
