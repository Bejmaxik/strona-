// ============================================================
// products.js – Baza danych produktów
// ============================================================
// Aby dodać nowy produkt, wystarczy dodać nowy obiekt do tablicy
// `products` z odpowiednimi polami. Strona automatycznie go wyświetli.
// Pola: id, title, description, image, price, category, link, kakolink, usfanslink
// ============================================================

const products = [
  {
    id: 1,
    title: "Trawiaste Pola",
    description: "Lekka kurtka typu windbreaker z nadrukiem roślinnym. Idealna na wiosnę.",
    image: "https://picsum.photos/id/1043/600/400",
    price: 189,
    category: "Ubrania",
    link: "https://example.com/product/1",
    kakolink: "https://kakolink.example.com/1",
    usfanslink: "https://usfans.example.com/1"
  },
  {
    id: 2,
    title: "Urban Shadows",
    description: "Ciemne, minimalistyczne sneakersy z zamszu i siateczki.",
    image: "https://picsum.photos/id/106/600/400",
    price: 349,
    category: "Obuwie",
    link: "https://example.com/product/2",
    kakolink: "https://kakolink.example.com/2",
    usfanslink: "https://usfans.example.com/2"
  },
  {
    id: 3,
    title: "Srebrny Pierścień",
    description: "Ręcznie wykonany pierścień ze stali szlachetnej, szczotkowany.",
    image: "https://picsum.photos/id/316/600/400",
    price: 79,
    category: "Akcesoria",
    link: "https://example.com/product/3",
    kakolink: "https://kakolink.example.com/3",
    usfanslink: "https://usfans.example.com/3"
  },
  {
    id: 4,
    title: "Kwiatowa Koszula",
    description: "Koszula w drobne kwiaty, oversize, z naturalnego lnu.",
    image: "https://picsum.photos/id/175/600/400",
    price: 149,
    category: "Ubrania",
    link: "https://example.com/product/4",
    kakolink: "https://kakolink.example.com/4",
    usfanslink: "https://usfans.example.com/4"
  },
  {
    id: 5,
    title: "Skórzane Derby",
    description: "Klasyczne buty derby z licowej skóry, na gumowej podeszwie.",
    image: "https://picsum.photos/id/219/600/400",
    price: 429,
    category: "Obuwie",
    link: "https://example.com/product/5",
    kakolink: "https://kakolink.example.com/5",
    usfanslink: "https://usfans.example.com/5"
  },
  {
    id: 6,
    title: "Zegarek Analog",
    description: "Minimalistyczny zegarek z tarczą koloru ecru i paskiem z nylonu.",
    image: "https://picsum.photos/id/358/600/400",
    price: 259,
    category: "Akcesoria",
    link: "https://example.com/product/6",
    kakolink: "https://kakolink.example.com/6",
    usfanslink: "https://usfans.example.com/6"
  },
  {
    id: 7,
    title: "Pikowana Kamizelka",
    description: "Lekka, ocieplana kamizelka w stylu retro, zapinana na snapsy.",
    image: "https://picsum.photos/id/380/600/400",
    price: 219,
    category: "Ubrania",
    link: "https://example.com/product/7",
    kakolink: "https://kakolink.example.com/7",
    usfanslink: "https://usfans.example.com/7"
  },
  {
    id: 8,
    title: "Trampki Vintage",
    description: "Wysokie trampki inspirowane latami 90., z grubą podeszwą.",
    image: "https://picsum.photos/id/431/600/400",
    price: 279,
    category: "Obuwie",
    link: "https://example.com/product/8",
    kakolink: "https://kakolink.example.com/8",
    usfanslink: "https://usfans.example.com/8"
  },
  {
    id: 9,
    title: "Skórzany Plecak",
    description: "Niewielki plecak z miękkiej skóry, z regulowanymi sznurkami.",
    image: "https://picsum.photos/id/447/600/400",
    price: 389,
    category: "Akcesoria",
    link: "https://example.com/product/9",
    kakolink: "https://kakolink.example.com/9",
    usfanslink: "https://usfans.example.com/9"
  },
  {
    id: 10,
    title: "Kurtka Jeansowa",
    description: "Klasyczna kurtka z denimu, prosta, z metalowymi guzikami.",
    image: "https://picsum.photos/id/482/600/400",
    price: 319,
    category: "Ubrania",
    link: "https://example.com/product/10",
    kakolink: "https://kakolink.example.com/10",
    usfanslink: "https://usfans.example.com/10"
  },
  {
    id: 11,
    title: "Sandały Skórzane",
    description: "Ręcznie szyte sandały z paskami regulowanymi, bardzo wygodne.",
    image: "https://picsum.photos/id/491/600/400",
    price: 199,
    category: "Obuwie",
    link: "https://example.com/product/11",
    kakolink: "https://kakolink.example.com/11",
    usfanslink: "https://usfans.example.com/11"
  },
  {
    id: 12,
    title: "Pakamera na biżuterię",
    description: "Podróżne etui na pierścionki i łańcuszki, z aksamitu.",
    image: "https://picsum.photos/id/521/600/400",
    price: 99,
    category: "Akcesoria",
    link: "https://example.com/product/12",
    kakolink: "https://kakolink.example.com/12",
    usfanslink: "https://usfans.example.com/12"
  }
];
