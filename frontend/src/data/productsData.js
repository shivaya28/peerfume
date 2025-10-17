// Central Product Database - Single source of truth
export const PRODUCTS_DB = {
  // ... existing products 1-13 remain same ...
  1: {
    id: 1,
    name: 'Faun Walk',
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    style: 'WH-2024-BLK',
    description: 'Elevate your personal aura with timeless luxury and refined craftsmanship. This exquisite FAUN WALK perfume delivers sophisticated elegance and a striking visual appeal for display on any vanity or shelf.',
    features: [
      'Style: VETEMENT-PARFUM-100ML',
      'Color: Black to Gold Ombre Glass',
      'Premium heavy glass construction',
      'Multi-faceted crystal-cut stopper',
      'Gold-toned collar and intricate crest logo',
      '100ml volume for long-lasting use'
    ],
    image: '/products/p1.png',
    images: [
      '/productDetails/p1-1.png',
      '/productDetails/p1-2.png',
      '/productDetails/p1-3.png',
      '/productDetails/p1-4.png',
    ],
    rating: 4.8,
    reviews: 342,
    inStock: true,
    shipping: 'Free shipping on all orders',
    returns: 'Free returns within 30 days',
    category: 'perfume'
  },
  2: {
    id: 2,
    name: 'Mamaearth',
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    style: 'DJ-2024-LB',
    description: 'Immerse yourself in freshness with a clean, aquatic fragrance and soothing aesthetic. Perfect for those who seek a light, refreshing scent with a focus on safe, gentle ingredients.',
    features: [
      'Style: MM-WAVES-2024-BLUE',
      'Color: Deep Ocean Blue/Silver Cap',
      'Volume: 100ml / 3.4 fl. oz',
      'Certification: MADE SAFE (Non-Toxic and Safe)',
      'Bottle Design: Clear blue-to-dark ombre glass',
      'Fragrance Type: Eau De Parfum (EDP)'
    ],
    image: '/products/p2.png',
    images: [
      '/productDetails/p2-1.png',
      '/productDetails/p2-2.png',
      '/productDetails/p2-3.png',
      '/productDetails/p2-4.png',
    ],
    rating: 4.5,
    reviews: 156,
    inStock: true,
    shipping: 'Free shipping on orders above ₹999',
    returns: 'Free returns within 15 days',
    category: 'perfume'
  },
  3: {
    id: 3,
    name: 'Denver',
    price: 3499,
    originalPrice: 5999,
    discount: 42,
    style: 'CM-2024-SS',
    description: 'Elevate your daily routine with a masculine, active fragrance and long-lasting freshness. Perfect for men who seek a strong scent and confidence to match a vigorous, sporting lifestyle.',
    features: [
      'Style: DEN-SPORT-VIC-2024',
      'Color: Matte Silver Finish',
      'Product Type: Deodorant Body Spray',
      'Theme: Sporting Club / Equestrian (Polo)',
      'Design: Gold crest logo with Polo rider silhouette',
      'Fragrance Name: Victor'
    ],
    image: '/products/p3.png',
    images: [
      '/productDetails/p3-1.png',
      '/productDetails/p3-2.png',
      '/productDetails/p3-3.png',
      '/productDetails/p3-4.png',
    ],
    rating: 4.7,
    reviews: 289,
    inStock: true,
    shipping: 'Free shipping on all orders',
    returns: 'Free returns within 10 days',
    category: 'deodorant'
  },
  4: {
    id: 4,
    name: 'Atarstory',
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    style: 'RS-2024-EB',
    description: 'Experience a rich, deep fragrance with a touch of traditional heritage and luxurious packaging. This small perfume bottle is ideal for travel, sampling, or carrying a concentrated, long-lasting scent.',
    features: [
      'Style: ATAR-STORY-MINI-023',
      'Color: Golden Amber Liquid / Clear Glass',
      'Volume: 7ml e (0.23 fl oz)',
      'Cap Design: Clear circular flat stopper with ribbed gold collar',
      'Label: Black label with gold tree and text logo',
      'Product Type: Concentrated Perfume Oil or Attar'
    ],
    image: '/products/p4.png',
    images: [
      '/productDetails/p4-1.png',
      '/productDetails/p4-2.png',
      '/productDetails/p4-3.png',
      '/productDetails/p4-4.png',
    ],
    rating: 4.9,
    reviews: 512,
    inStock: true,
    shipping: 'Free shipping on all orders',
    returns: 'Free returns within 30 days',
    category: 'attar'
  },
  5: {
    id: 5,
    name: 'Valintino Black',
    price: 3599,
    originalPrice: 7198,
    discount: 50,
    style: 'VL-2024-GOL',
    description: 'A vibrant and bold fragrance designed for the adventurous spirit. Features spicy notes with a refreshing citrus finish, perfect for evening wear.',
    features: [
      'Style: VAL-EDT-VIB-100ML',
      'Color: Black Matte Glass',
      'Volume: 100ml / 3.4 fl. oz',
      'Fragrance Type: Eau De Toilette (EDT)',
      'Design: Modern geometric bottle with silver sprayer',
      'Notes: Black Pepper, Mandarin, Tonka Bean'
    ],
    image: '/products/p5.png',
    images: [
      '/productDetails/p5-1.png',
      '/productDetails/p5-2.png',
      '/productDetails/p5-3.png',
      '/productDetails/p5-4.png',
    ],
    rating: 4.6,
    reviews: 150,
    inStock: true,
    shipping: 'Free shipping on orders above ₹1500',
    returns: 'Free returns within 30 days',
    category: 'perfume'
  },
  6: {
    id: 6,
    name: 'Whisky Smoke',
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    style: 'WS-2024-AMB',
    description: 'A deep, complex scent with smoky and woody undertones, evoking a sense of rugged sophistication. Ideal for a cozy, intimate setting.',
    features: [
      'Style: WS-EDP-SMO-050ML',
      'Color: Deep Amber Glass',
      'Volume: 50ml / 1.7 fl. oz',
      'Fragrance Type: Eau De Parfum (EDP)',
      'Design: Rustic bottle with metallic cap',
      'Notes: Oakwood, Tobacco, Leather'
    ],
    image: '/products/p6.png',
    images: [
      '/productDetails/p6-1.png',
      '/productDetails/p6-2.png',
      '/productDetails/p6-3.png',
      '/productDetails/p6-4.png',
    ],
    rating: 4.2,
    reviews: 80,
    inStock: true,
    shipping: 'Standard shipping charges apply',
    returns: 'No returns on opened items',
    category: 'perfume'
  },
  7: {
    id: 7,
    name: 'Bright Peach',
    price: 3199,
    originalPrice: 6398,
    discount: 50,
    style: 'BP-2024-PIN',
    description: 'A sweet, fruity, and intoxicating aroma that captures the essence of summer. Provides a refreshing burst of energy for daily use.',
    features: [
      'Style: BP-AQUA-FRT-100ML',
      'Color: Pastel Pink Gradient',
      'Volume: 100ml / 3.4 fl. oz',
      'Product Type: Body Mist/Deodorant Spray',
      'Design: Sleek, tall can with fine mist sprayer',
      'Notes: Ripe Peach, Blood Orange, Patchouli'
    ],
    image: '/products/p7.png',
    images: [
      '/productDetails/p7-1.png',
      '/productDetails/p7-2.png',
      '/productDetails/p7-3.png',
      '/productDetails/p7-4.png',
    ],
    rating: 4.9,
    reviews: 400,
    inStock: true,
    shipping: 'Free shipping on all orders',
    returns: 'Free returns within 14 days',
    category: 'perfume'
  },
  8: {
    id: 8,
    name: 'Clive Oriental Attar',
    price: 2299,
    originalPrice: 4598,
    discount: 50,
    style: 'CO-2024-GRN',
    description: 'A pure, traditional attar (perfume oil) with intense oriental notes. Its high concentration ensures a very long-lasting and potent fragrance.',
    features: [
      'Style: CO-OIL-PURE-012ML',
      'Color: Clear Oil / Artisan Glass Bottle',
      'Volume: 12ml e (0.40 fl oz)',
      'Product Type: Concentrated Perfume Oil (Attar)',
      'Cap Design: Ornate gold applicator stick cap',
      'Notes: Sandalwood, Agarwood (Oud), Rose'
    ],
    image: '/products/p8.png',
    images: [
      '/productDetails/p8-1.png',
      '/productDetails/p8-2.png',
      '/productDetails/p8-3.png',
      '/productDetails/p8-4.png',
    ],
    rating: 4.7,
    reviews: 350,
    inStock: false,
    shipping: 'Only available for pickup',
    returns: 'Final sale, no returns',
    category: 'attar'
  },
  11: {
    id: 11,
    name: 'Gold Series Luxury Attar',
    price: 999,
    originalPrice: 1999,
    discount: 50,
    style: 'GLD-2024-ATR',
    description: 'Premium gold series attar with authentic oriental fragrance. Perfect for special occasions and traditional wear.',
    features: [
      'Style: GOLD-SERIES-2024',
      'Authentic Arabian fragrance',
      'Long-lasting scent',
      'Premium glass bottle',
      'Volume: 10ml'
    ],
    image: '/set/p1-1.png',
    images: [
      '/set/p1-1.png',
      '/set/p1-1.png',
      '/set/p1-1.png',
      '/set/p1-1.png',
    ],
    rating: 4.6,
    reviews: 145,
    inStock: true,
    shipping: 'Free shipping on all orders',
    returns: 'Free returns within 15 days',
    category: 'attar'
  },
  12: {
    id: 12,
    name: 'Oud of Dubai Premium',
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    style: 'OUD-2024-DXB',
    description: 'Luxurious Oud fragrance inspired by Dubai. Rich, woody notes with hints of amber and musk.',
    features: [
      'Style: OUD-DUBAI-PREMIUM',
      'Authentic Oud essence',
      'Imported fragrance oils',
      'Premium packaging',
      'Volume: 12ml'
    ],
    image: '/set/p1-2.png',
    images: [
      '/set/p1-2.png',
      '/set/p1-2.png',
      '/set/p1-2.png',
      '/set/p1-2.png',
    ],
    rating: 4.8,
    reviews: 210,
    inStock: true,
    shipping: 'Free shipping on all orders',
    returns: 'Free returns within 30 days',
    category: 'attar'
  },
  13: {
    id: 13,
    name: 'Royal Essence Collection',
    price: 799,
    originalPrice: 1599,
    discount: 50,
    style: 'RYL-2024-ESS',
    description: 'Royal collection of premium attars. A blend of traditional and modern fragrances for the discerning individual.',
    features: [
      'Style: ROYAL-ESSENCE-2024',
      'Premium blend of attars',
      'Traditional craftsmanship',
      'Elegant bottle design',
      'Volume: 8ml'
    ],
    image: '/set/p1-3.png',
    images: [
      '/set/p1-3.png',
      '/set/p1-3.png',
      '/set/p1-3.png',
      '/set/p1-3.png',
    ],
    rating: 4.5,
    reviews: 98,
    inStock: true,
    shipping: 'Standard shipping charges apply',
    returns: 'Free returns within 10 days',
    category: 'attar'
  }
};

// Dummy Orders Database
export const DUMMY_ORDERS = [
  {
    id: 'ORD-2025-001',
    orderNumber: 'ORD-2025-001',
    date: '2025-10-05',
    deliveryDate: '2025-10-12',
    total: 5998,
    subtotal: 5080,
    shipping: 0,
    tax: 918,
    status: 'Delivered',
    trackingNumber: 'TRK123456789',
    shippingAddress: {
      name: 'John Doe',
      address: 'C-23, Park Street, Gandhi Nagar',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302015',
      phone: '+91 98765 43210'
    },
    items: [
      {
        id: 1,
        name: 'Faun Walk',
        image: '/products/p1.png',
        quantity: 2,
        price: 2999,
        color: 'Black',
        size: null
      }
    ],
    timeline: [
      { status: 'Order Placed', date: '2025-10-05', time: '10:30 AM', completed: true },
      { status: 'Order Confirmed', date: '2025-10-05', time: '11:00 AM', completed: true },
      { status: 'Shipped', date: '2025-10-07', time: '09:15 AM', completed: true },
      { status: 'Out for Delivery', date: '2025-10-12', time: '08:00 AM', completed: true },
      { status: 'Delivered', date: '2025-10-12', time: '02:30 PM', completed: true }
    ]
  },
  {
    id: 'ORD-2025-002',
    orderNumber: 'ORD-2025-002',
    date: '2025-10-08',
    deliveryDate: '2025-10-15',
    total: 5894,
    subtotal: 4998,
    shipping: 0,
    tax: 896,
    status: 'Processing',
    trackingNumber: 'TRK987654321',
    shippingAddress: {
      name: 'John Doe',
      address: 'C-23, Park Street, Gandhi Nagar',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302015',
      phone: '+91 98765 43210'
    },
    items: [
      {
        id: 2,
        name: 'Mamaearth',
        image: '/products/p2.png',
        quantity: 1,
        price: 1499,
        color: 'Blue',
        size: null
      },
      {
        id: 3,
        name: 'Denver',
        image: '/products/p3.png',
        quantity: 1,
        price: 3499,
        color: 'Silver',
        size: null
      }
    ],
    timeline: [
      { status: 'Order Placed', date: '2025-10-08', time: '03:45 PM', completed: true },
      { status: 'Order Confirmed', date: '2025-10-08', time: '04:15 PM', completed: true },
      { status: 'Processing', date: '2025-10-09', time: '10:00 AM', completed: true },
      { status: 'Shipped', date: '', time: '', completed: false },
      { status: 'Delivered', date: '', time: '', completed: false }
    ]
  }
];

// Helper function to get all products as array
export const getAllProducts = () => {
  return Object.values(PRODUCTS_DB);
};

// Helper function to get product by ID
export const getProductById = (id) => {
  return PRODUCTS_DB[id] || null;
};

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  return Object.values(PRODUCTS_DB).filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

// Helper function to search products
export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return Object.values(PRODUCTS_DB).filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
};

// Helper function to get all orders
export const getAllOrders = () => {
  return DUMMY_ORDERS;
};

// Helper function to get order by ID
export const getOrderById = (orderId) => {
  return DUMMY_ORDERS.find(order => order.id === orderId) || null;
};
