
// Mock product data
const products = [
  {
    id: 1,
    name: "Handcrafted Ceramic Vase",
    description: "A beautiful handcrafted ceramic vase with an elegant matte finish. Perfect for displaying fresh or dried flowers in any room of your home.",
    price: 49.99,
    category: "Ceramics",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1526043446186-2ff4ececa0bc?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a6c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    featured: true,
    sale: false,
    stockQuantity: 15
  },
  {
    id: 2,
    name: "Clay Face Mask",
    description: "Rejuvenate your skin with our natural clay face mask. Made with pure bentonite clay and essential oils to cleanse and refresh your complexion.",
    price: 24.99,
    salePrice: 19.99,
    category: "Cosmetics",
    image: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?q=80&w=2570&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    featured: true,
    sale: true,
    stockQuantity: 42
  },
  {
    id: 3,
    name: "Ceramic Dinner Plate Set",
    description: "Set of four handmade ceramic dinner plates in a natural earthy tone. Each plate has a unique texture and glaze, making every dining experience special.",
    price: 89.99,
    category: "Ceramics",
    image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1540554183278-afe0c8ce3679?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1564705604160-c8676de8f88d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    featured: true,
    sale: false,
    stockQuantity: 8
  },
  {
    id: 4,
    name: "Rosehip Facial Serum",
    description: "Our luxurious facial serum is packed with organic rosehip oil, vitamin C, and antioxidants to hydrate and brighten your skin, reducing fine lines and promoting a youthful glow.",
    price: 34.99,
    category: "Cosmetics",
    image: "https://images.unsplash.com/photo-1571781565036-d3f759314bab?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1571781565036-d3f759314bab?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1556227834-09f1de7a7d14?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    featured: true,
    sale: false,
    stockQuantity: 23
  },
  {
    id: 5,
    name: "Ceramic Coffee Mug",
    description: "Hand-thrown ceramic coffee mug with a comfortable handle. Each mug is uniquely glazed, making your morning coffee ritual more special.",
    price: 21.99,
    salePrice: 17.99,
    category: "Ceramics",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1576699678877-e58eca4b8325?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    featured: false,
    sale: true,
    stockQuantity: 31
  },
  {
    id: 6,
    name: "Herbal Body Scrub",
    description: "Exfoliate and nourish your skin with our herbal body scrub. Made with natural ingredients including sea salt, essential oils, and dried herbs for soft, glowing skin.",
    price: 28.99,
    category: "Cosmetics",
    image: "https://images.unsplash.com/photo-1608613304899-ea8098577e38?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1608613304899-ea8098577e38?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?q=80&w=2570&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    featured: false,
    sale: false,
    stockQuantity: 19
  },
  {
    id: 7,
    name: "Ceramic Flower Pot",
    description: "Beautiful ceramic flower pot with drainage hole. Perfect for indoor plants and herbs. The textured exterior adds a touch of elegance to any room.",
    price: 32.99,
    category: "Ceramics",
    image: "https://images.unsplash.com/photo-1602763288580-79a0da152785?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1602763288580-79a0da152785?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1611083360739-bdad6e0eb1fa?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1622467827417-bbe6542033f0?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    featured: false,
    sale: false,
    stockQuantity: 12
  },
  {
    id: 8,
    name: "Lavender Bath Bombs",
    description: "Set of 3 handmade lavender bath bombs. Made with essential oils, Epsom salts, and dried lavender flowers for a relaxing bath experience.",
    price: 18.99,
    category: "Cosmetics",
    image: "https://images.unsplash.com/photo-1607006889686-78660b86921f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1607006889686-78660b86921f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1608248585153-a3018913023a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1602904226211-a3a1d6de040a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    featured: false,
    sale: false,
    stockQuantity: 27
  }
];

export default products;
