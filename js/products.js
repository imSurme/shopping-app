// Product Catalog - single source of truth for all pages
const CLOTHING_SIZES = ['S', 'M', 'L', 'XL'];
const SHOE_SIZES = ['38', '39', '40', '41', '42', '43', '44'];
const KIDS_SIZES = ['4-5 Yaş', '6-7 Yaş', '8-9 Yaş', '10-11 Yaş'];

const PRODUCTS = [
    {
        id: 1,
        name: 'Minimalist Sandalye',
        price: 1800,
        originalPrice: null,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2RqPWbNcMBcbXG0BfRqJ9w9Bgvmhawn6zSdcqHsh2-zn5T0GjVe_hCShY2NT7CMtu4DJSyZICLRM1HZAeACkwpI40Th11jnFJEUlrS9zOta6vH09ZYNIhq7UL0QkXak8om4025fzBZNeLo6XYKQ0xfCMHEgly4pxL7-PwU4m8hisGy0_wdbjaNZ8-AvFtfl71HJf2tuOZKp5x5Y6Iw4sW-0IjbnYkkgL4fbQAdFj926LjMFa6w5yyFEo4llyYoGh4pgYleAkLrqQ',
        category: 'ev',
        description: 'Modern ve minimalist tasarıma sahip, ergonomik yapısıyla konforu ön planda tutan şık sandalye. Doğal ahşap ve metal detaylarıyla her ortama uyum sağlar.',
        sizes: null,
        rating: 4.6,
        reviewCount: 214,
        addedAt: '2026-06-02'
    },
    {
        id: 2,
        name: 'Bej Deri Çanta',
        price: 1760,
        originalPrice: 2200,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO4XsLp4M-IOY6tPWycGOfHIHu7_q0kZi-a5ue_DKu2X7HcYwC7LPqwzMenx9hH7t03eUgT6gi8nygd9Nvwq8NYlWAeq8gRSU9L1_fpWGsM5qOwa-baCPAbhbZvjFGLw6Z-1DFuZra_SVgobrXep93KBVdNsZ8vstnKFbSbM43VRN_TphLRh5BAWpPavnjcZWmCR3NJ6fFvNamVkN5XOsncQb8mUCRhI_wzTiZaNTgi5IMC1r84OEl6EmW6iZcIJqUeMlcw-FGNEo',
        category: 'kadin',
        description: 'Premium kalite deri ile üretilmiş, günlük kullanıma uygun şık çanta. Geniş iç hacmi ve çoklu cep tasarımı ile pratik kullanım sunar.',
        sizes: null,
        rating: 4.4,
        reviewCount: 532,
        addedAt: '2026-05-18'
    },
    {
        id: 3,
        name: 'Seramik Vazo Seti',
        price: 950,
        originalPrice: null,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyn7u4vB5h-5hbJzGJoBkUsqtXlnuR8aaNi-BEGDtZjNBovvO4HA34R9uGro-rPmdq15rYv17bqQKd9F3qu3R_bmdWAjRMr29qAOTeqwzfVY0z0nLhS4fieYoD1J-d4PvANFC1bQMD-7jR4vYEgW2vQ7fTYfJwk2CZySd9MbpSF4ph1_TMhIJd1uPq_CGmff2YSm5mbe2wXLguotEv4fGHmVXaL0auQM8cDUCg3V46ZaTzXDSbkjnQp0Gvij0cKsdJlwdxelw0T34',
        category: 'ev',
        description: 'El yapımı seramik vazo seti, ev dekorasyonunuza doğal ve sanatsal bir dokunuş katar. Farklı boyutlarda 3 parçadan oluşur.',
        sizes: null,
        rating: 4.8,
        reviewCount: 97,
        addedAt: '2026-07-11'
    },
    {
        id: 4,
        name: 'Klasik Beyaz Spor Ayakkabı',
        price: 1040,
        originalPrice: 1300,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4GoF1L2wqXpqrbtnXBLwlCjUot60kSl-fI7pFlGQ26BYlFLKf-5qsHw6TPme2e3njDuTNPa0zd2EJZdRpuX9zXD9-i8vFyY2jA9eqUGOATu26apnEocLZODIFENIn0S18X-w5Coza3vjQvDrSfjgyvFW-PRR5gZawhXwPmV3SQif-Pt6AZTtWJb_LkYliERx-0oQDstJTexFJ31TXbdVvY-CNzmGGs4RyzBKRTWW_G_kpkwFOqL2jqA8JkzcMsVj5brC0_jLyxro',
        category: 'erkek',
        description: 'Her kombine uyum sağlayan klasik beyaz spor ayakkabı. Hafif ve esnek tabanı ile gün boyu konfor sağlar. 38-44 numara arası mevcuttur.',
        sizes: SHOE_SIZES,
        rating: 4.5,
        reviewCount: 1204,
        addedAt: '2026-04-27'
    },
    {
        id: 5,
        name: 'Pirinç Masa Lambası',
        price: 1500,
        originalPrice: null,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6JCMQCJHoXQd2fE7mDya4r-14Y4t7SUnFKJyNYuDE1-wyy1PM7em3X4NHK0J3A-lXv8TJ1oFm48doyaNZ_Qx0m0kvFF1qwRDbsaXLvljvDyIVvG0l8E-nIq1nOv4URFN_7zZS4T2PkJQHczyUPV-3DNHR04bgvy48ChzUjdBIHScDGDnT1QAdaf2R28jPM8IsCHDpp9evOJ9A7lS9LIhhmELd0qG8iesCMcdWyJlKeLgDKfSBAJf0XPpQT6B2VTJOMWBGljfiJ5U',
        category: 'ev',
        description: 'Vintage pirinç görünümlü masa lambası, yatak odası veya oturma odası için ideal. Ayarlanabilir parlaklık özelliği ile göz yormayan ışık sağlar.',
        sizes: null,
        rating: 4.3,
        reviewCount: 158,
        addedAt: '2026-03-14'
    },
    {
        id: 6,
        name: 'Oversize Denim Ceket',
        price: 770,
        originalPrice: 1100,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcx0BKcIrhPsGiZ5HDdBO8KjpkEUNm4xE5n9QJ0s4C4lMwg4Lik76MJpGyW6uh-np1K_8kcRVxaaYMEeC2QDKNHLztD7o5A84xxini6MJWdqyKYvjB5r-bwVlVUsU3e3uqKkO4VhPSB7Hf5NydM7ARqWnE3UQG1gwGyIzMS08ugH5p3_VWoEd7xWh2lnz_imRpg-ulzopnH-Z0goZUSkvkr0Kf1OSMCYNixxzR3gHNgNPQMFxCdSwa9UU3y-A15G8aVu6vozzQOHc',
        category: 'kadin',
        description: 'Trend oversize kesimli denim ceket, casual kombinlerin vazgeçilmezi. %100 pamuklu kumaşı ile dört mevsim kullanılabilir. S-XL bedenlerde mevcuttur.',
        sizes: CLOTHING_SIZES,
        rating: 4.2,
        reviewCount: 689,
        addedAt: '2026-06-20'
    },
    {
        id: 7,
        name: 'Kırmızı Koşu Ayakkabısı',
        price: 1450,
        originalPrice: 1800,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
        category: 'erkek',
        description: 'Nefes alabilen örgü yüzeyi ve yastıklamalı tabanıyla uzun koşularda bile hafiflik sunan performans ayakkabısı.',
        sizes: SHOE_SIZES,
        rating: 4.7,
        reviewCount: 842,
        addedAt: '2026-09-05'
    },
    {
        id: 8,
        name: 'Siyah Deri Ceket',
        price: 2400,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
        category: 'erkek',
        description: 'Fermuar detaylı, klasik biker kesim deri ceket. İçi astarlı yapısıyla serin havalarda şıklığı ve sıcaklığı bir arada sunar.',
        sizes: CLOTHING_SIZES,
        rating: 4.6,
        reviewCount: 311,
        addedAt: '2026-08-22'
    },
    {
        id: 9,
        name: 'Basic Beyaz Tişört',
        price: 250,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
        category: 'erkek',
        description: '%100 pamuklu, bisiklet yaka basic tişört. Gardırobun vazgeçilmezi, tek başına ya da katmanlı kombinlerde kullanılabilir.',
        sizes: CLOTHING_SIZES,
        rating: 4.4,
        reviewCount: 2310,
        addedAt: '2026-02-10'
    },
    {
        id: 10,
        name: 'Puantiyeli Denim Gömlek',
        price: 650,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
        category: 'kadin',
        description: 'Yumuşak dokulu denim kumaştan, puantiye desenli rahat kesim gömlek. Ofiste ve hafta sonu kombinlerinde rahatlıkla kullanılabilir.',
        sizes: CLOTHING_SIZES,
        rating: 4.3,
        reviewCount: 176,
        addedAt: '2026-09-18'
    },
    {
        id: 11,
        name: 'Örgü Panço',
        price: 890,
        originalPrice: 1100,
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
        category: 'kadin',
        description: 'Püskül detaylı, krem rengi örgü panço. Elbise ve tişörtlerin üzerine kolayca kombinlenebilen hafif bir katman.',
        sizes: ['S', 'M', 'L'],
        rating: 4.1,
        reviewCount: 88,
        addedAt: '2026-10-01'
    },
    {
        id: 12,
        name: 'Gri Zincirli Çanta',
        price: 1350,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?w=600&q=80',
        category: 'kadin',
        description: 'Zımba detaylı, zincir askılı gri omuz çantası. Kompakt boyutu ile özel davetler ve günlük kullanım için idealdir.',
        sizes: null,
        rating: 4.5,
        reviewCount: 243,
        addedAt: '2026-08-03'
    },
    {
        id: 13,
        name: 'Baskılı Çocuk Tişörtü',
        price: 320,
        originalPrice: 400,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
        category: 'cocuk',
        description: 'Eğlenceli baskılı, pamuklu çocuk tişörtü. Yıkamaya dayanıklı baskısı ve yumuşak kumaşı ile gün boyu rahatlık sağlar.',
        sizes: KIDS_SIZES,
        rating: 4.6,
        reviewCount: 129,
        addedAt: '2026-09-28'
    },
    {
        id: 14,
        name: 'Bebek Hediye Seti',
        price: 690,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80',
        category: 'cocuk',
        description: 'Organik pamuk tişört, örgü bere ve peluş ayıcıktan oluşan bebek hediye seti. Yeni doğan hediyesi için şık bir kutuda gönderilir.',
        sizes: null,
        rating: 4.9,
        reviewCount: 64,
        addedAt: '2026-10-08'
    },
    {
        id: 15,
        name: 'Oyun Karakteri Figür Seti',
        price: 540,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80',
        category: 'cocuk',
        description: 'Renkli oyun karakterlerinden oluşan figür seti. Koleksiyon yapmak ve oyun oynamak için ideal, 3 yaş ve üzeri için uygundur.',
        sizes: null,
        rating: 4.7,
        reviewCount: 402,
        addedAt: '2026-07-30'
    },
    {
        id: 16,
        name: 'Yeşil Kadife Kanepe',
        price: 12500,
        originalPrice: 14900,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
        category: 'ev',
        description: 'Zümrüt yeşili kadife kumaşlı, ahşap ayaklı üç kişilik kanepe. Retro tasarımı ile oturma odanıza karakter katar.',
        sizes: null,
        rating: 4.5,
        reviewCount: 73,
        addedAt: '2026-09-12'
    },
    {
        id: 17,
        name: 'Yumuşak Uyku Yastığı',
        price: 350,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80',
        category: 'ev',
        description: 'Boyun ve omuzları destekleyen, antialerjik elyaf dolgulu uyku yastığı. Makinede yıkanabilir pamuklu kılıfı ile gelir.',
        sizes: null,
        rating: 4.2,
        reviewCount: 958,
        addedAt: '2026-05-05'
    }
];

function getProductById(id) {
    // Accepts 1, '1' or cart item ids like 'product-1'
    const numericId = parseInt(String(id).replace('product-', ''), 10);
    return PRODUCTS.find(p => p.id === numericId) || null;
}

// detailPagePath: path to product-detail.html relative to the current page
function getProductUrl(id, detailPagePath = 'product-detail.html', size = '') {
    const product = getProductById(id);
    let url = `${detailPagePath}?id=${product ? product.id : id}`;
    if (size && size !== 'Standart') {
        url += `&size=${encodeURIComponent(size)}`;
    }
    return url;
}

function getDiscountPercent(product) {
    if (!product.originalPrice || product.originalPrice <= product.price) return 0;
    return Math.round((1 - product.price / product.originalPrice) * 100);
}

// Favorites (stored as a list of product ids)
const Favorites = {
    key: 'favorites',

    get() {
        try {
            return JSON.parse(localStorage.getItem(this.key) || '[]');
        } catch (error) {
            return [];
        }
    },

    has(id) {
        return this.get().includes(Number(id));
    },

    // Returns true if the product is now a favorite
    toggle(id) {
        const productId = Number(id);
        let favorites = this.get();
        const isFavorite = favorites.includes(productId);
        favorites = isFavorite ? favorites.filter(f => f !== productId) : [productId, ...favorites];
        localStorage.setItem(this.key, JSON.stringify(favorites));
        return !isFavorite;
    }
};
