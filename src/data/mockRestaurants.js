export const RESTAURANTS = [
  {
    id: "dawat-e-khaas",
    name: "Dawat-e-Khaas (Royal Mughlai & Awadhi)",
    tagline: "Slow-dum cooked handi biryanis, melt-in-mouth galouti kebabs, and Awadhi royal recipes.",
    cuisine: "Royal Mughlai & Dum Pukht",
    neighborhood: "Connaught Place, New Delhi",
    city: "New Delhi",
    address: "Block B, Inner Circle, Connaught Place",
    rating: 4.9,
    reviewCount: 1420,
    priceRange: "₹₹₹",
    busyStatus: "Insanely Packed (Waitlist 80+ mins)",
    typicalWaitMinutes: 80,
    avgSpend: "₹1,100/person",
    turnoverBenchmark: "90m standard vs 42m TableRush",
    revenueLiftTonight: "₹18,500",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80",
    tables: [
      { 
        id: "T1", 
        number: 1, 
        name: "Jharokha Window Booth 1", 
        seats: 2, 
        vibe: "Intimate carved wood window booth overlooking the historic heritage arches", 
        zone: "Heritage Jharokha",
        shape: "booth",
        coords: { x: 15, y: 22 },
        available: true 
      },
      { 
        id: "T2", 
        number: 2, 
        name: "Shahi Baithak Booth 2", 
        seats: 4, 
        vibe: "Plush velvet booth with gold zardozi cushions and brass warm lanterns", 
        zone: "Royal Baithak",
        shape: "booth",
        coords: { x: 42, y: 22 },
        available: true 
      },
      { 
        id: "T3", 
        number: 3, 
        name: "Maharaja Round Table 3", 
        seats: 4, 
        vibe: "Hand-inlaid brass round table beneath a grand crystal chandelier", 
        zone: "Central Darbar",
        shape: "round",
        coords: { x: 68, y: 28 },
        available: true 
      },
      { 
        id: "T4", 
        number: 4, 
        name: "Diwan Grand Alcove 4", 
        seats: 6, 
        vibe: "Curtained private alcove designed for royal family feasts and celebrations", 
        zone: "Diwan-e-Khas",
        shape: "large_rect",
        coords: { x: 84, y: 62 },
        available: true 
      },
      { 
        id: "T5", 
        number: 5, 
        name: "Clay Tandoor Counter 5", 
        seats: 2, 
        vibe: "Front-row view of master Ustad slapping roomali rotis and smoking seekh kebabs", 
        zone: "Live Bhatti Pass",
        shape: "bar",
        coords: { x: 32, y: 72 },
        available: true 
      }
    ],
    walkInTables: [
      { id: "W1", number: 10, seats: 2, coords: { x: 12, y: 55 }, status: "Occupied (Walk-in)" },
      { id: "W2", number: 11, seats: 4, coords: { x: 12, y: 78 }, status: "Occupied (Walk-in)" },
      { id: "W3", number: 12, seats: 4, coords: { x: 58, y: 65 }, status: "Waitlist 75m" },
      { id: "W4", number: 14, seats: 2, coords: { x: 84, y: 25 }, status: "Occupied (Walk-in)" },
      { id: "W5", number: 15, seats: 4, coords: { x: 84, y: 42 }, status: "Waitlist 80m" }
    ],
    menu: [
      {
        id: "dw-s1",
        name: "Melt-in-Mouth Galouti Kebabs (4 pcs)",
        category: "Starters",
        price: 495,
        prepMinutes: 6,
        description: "160-spice smoked lamb patties served on warm mini saffron sheermal with mint chutney and sirka pyaaz.",
        dietary: ["Chef Royal Signature"],
        image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "dw-s2",
        name: "Paneer Tikka Angara with Truffle Mint",
        category: "Starters",
        price: 385,
        prepMinutes: 7,
        description: "Malai paneer cubes marinated in Kashmiri deghi mirch and mustard oil, charred in charcoal tandoor.",
        dietary: ["Vegetarian", "Gluten-Free"],
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "dw-m1",
        name: "Nawabi Murgh Dum Biryani (Clay Handi)",
        category: "Mains",
        price: 545,
        prepMinutes: 12,
        description: "Long-grain aged basmati rice layered with succulent chicken, saffron milk, brown onions, sealed with dough & cooked on slow coals.",
        dietary: ["House Legend", "Halal"],
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "dw-m2",
        name: "Dal Dawat-e-Khaas (24-Hr Slow Simmered)",
        category: "Mains",
        price: 395,
        prepMinutes: 5,
        description: "Black urad lentils cooked overnight on tandoor embers with churned white butter, cream, and San Marzano style tomato puree.",
        dietary: ["Vegetarian", "Rich & Creamy"],
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "dw-m3",
        name: "Tandoori Garlic & Butter Naan Basket (3 pcs)",
        category: "Mains",
        price: 195,
        prepMinutes: 4,
        description: "Clay-oven baked leavened bread brushed generously with pure ghee, roasted garlic, and fresh coriander.",
        dietary: ["Vegetarian", "Baked Fresh"],
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "dw-d1",
        name: "Royal Shahi Tukda with Saffron Rabri",
        category: "Desserts",
        price: 245,
        prepMinutes: 4,
        description: "Crispy ghee-fried brioche soaked in cardamom syrup, topped with thick condensed malai rabri, silver vark, and pistachios.",
        dietary: ["Vegetarian", "Royal Sweet"],
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "dw-b1",
        name: "Kesariya Saffron Lassi with Malai",
        category: "Drinks",
        price: 185,
        prepMinutes: 3,
        description: "Thick hand-churned curd blended with royal Kashmiri saffron, crushed green cardamom, and topped with clotted malai.",
        dietary: ["Vegetarian", "Refreshing"],
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "punjab-grill",
    name: "Punjab Heritage & Clay Tandoor",
    tagline: "Hearty North Indian tandoori treasures, rich butter chicken, and Amritsari spiced feasts.",
    cuisine: "North Indian & Tandoor",
    neighborhood: "Cyber City, Gurugram",
    city: "Gurugram",
    address: "DLF Cyber Hub, Ground Floor",
    rating: 4.85,
    reviewCount: 1890,
    priceRange: "₹₹₹",
    busyStatus: "Heavy Waitlist (70m during dinner rush)",
    typicalWaitMinutes: 70,
    avgSpend: "₹950/person",
    turnoverBenchmark: "80m standard vs 38m TableRush",
    revenueLiftTonight: "₹16,200",
    image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=1200&q=80",
    tables: [
      { id: "PG1", number: 1, name: "Pind Courtyard Booth 1", seats: 2, vibe: "Rustic brass-fitted booth near courtyard fountain", zone: "Courtyard Veranda", shape: "booth", coords: { x: 15, y: 25 }, available: true },
      { id: "PG2", number: 2, name: "Grand Punjabi Family Table 2", seats: 4, vibe: "Large cushioned booth with warm copper drinkware", zone: "Main Dining Hall", shape: "booth", coords: { x: 45, y: 25 }, available: true },
      { id: "PG3", number: 3, name: "Haveli Round 3", seats: 4, vibe: "Carved teakwood round table beside the brass tandoor glass", zone: "Hearth Area", shape: "round", coords: { x: 72, y: 30 }, available: true },
      { id: "PG4", number: 4, name: "Sardarji VIP Alcove 4", seats: 6, vibe: "Spacious semi-private alcove for celebrations and reunions", zone: "Private Alcove", shape: "large_rect", coords: { x: 82, y: 65 }, available: true },
      { id: "PG5", number: 5, name: "Bhatti Grill Counter 5", seats: 2, vibe: "Exciting front view of skewered tikkas roasting over coals", zone: "Live Grill Pass", shape: "bar", coords: { x: 30, y: 70 }, available: true }
    ],
    walkInTables: [
      { id: "W1", number: 10, seats: 2, coords: { x: 15, y: 60 }, status: "Occupied (Walk-in)" },
      { id: "W2", number: 12, seats: 4, coords: { x: 60, y: 65 }, status: "Waitlist 60m" }
    ],
    menu: [
      {
        id: "pg-s1",
        name: "Amritsari Bhatti da Murgh (Tandoori)",
        category: "Starters",
        price: 465,
        prepMinutes: 9,
        description: "Bone-in chicken steeped in hung curd, roasted gram flour, crushed coriander seeds, roasted crisp in clay tandoor.",
        dietary: ["House Specialty", "Gluten-Free"],
        image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "pg-s2",
        name: "Crispy Dahi ke Kebabs (5 pcs)",
        category: "Starters",
        price: 365,
        prepMinutes: 6,
        description: "Velvety spiced hung yoghurt pockets with bell pepper, green chilies, crisp panko crust, served with sonth chutney.",
        dietary: ["Vegetarian", "Crispy"],
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "pg-m1",
        name: "Old Delhi 1950s Style Butter Chicken",
        category: "Mains",
        price: 525,
        prepMinutes: 10,
        description: "Tandoori chicken tikka simmered in a velvet silk gravy of ripe tomatoes, fenugreek leaves (kasoori methi), and pure cream butter.",
        dietary: ["All-Time Favorite"],
        image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "pg-m2",
        name: "Amritsari Stuffed Chur-Chur Kulcha",
        category: "Mains",
        price: 215,
        prepMinutes: 5,
        description: "Flaky layered tandoor bread stuffed with spiced aloo, paneer and anardana, crushed with desi ghee.",
        dietary: ["Vegetarian", "Crunchy Desi Ghee"],
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "pg-d1",
        name: "Hot Gulab Jamun with Pista Rabri (2 pcs)",
        category: "Desserts",
        price: 195,
        prepMinutes: 3,
        description: "Deep-fried khoya dumplings bathed in cardamom-rose sugar syrup, served piping hot over chilled thick rabri.",
        dietary: ["Vegetarian"],
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "dakshin-malabar",
    name: "Dakshin Coastal Kitchen & Toddy Bar",
    tagline: "Authentic coastal Kerala & Mangalorean culinary masterpieces, fresh seafood, and fragrant coconut gravies.",
    cuisine: "Coastal South Indian",
    neighborhood: "Indiranagar 100ft Road, Bengaluru",
    city: "Bengaluru",
    address: "740 100 Feet Road, HAL 2nd Stage, Indiranagar",
    rating: 4.92,
    reviewCount: 960,
    priceRange: "₹₹₹",
    busyStatus: "Crazy Weekend Lines (60m waitlist)",
    typicalWaitMinutes: 60,
    avgSpend: "₹850/person",
    turnoverBenchmark: "75m standard vs 36m TableRush",
    revenueLiftTonight: "₹14,800",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    tables: [
      { id: "DK1", number: 1, name: "Backwater Pergola Booth 1", seats: 2, vibe: "Wood-paneled intimate booth with gentle warm cane lighting", zone: "Cane Pergola", shape: "booth", coords: { x: 20, y: 25 }, available: true },
      { id: "DK2", number: 2, name: "Spice Route Table 2", seats: 4, vibe: "Brass top table surrounded by lush potted areca palms", zone: "Spice Garden", shape: "round", coords: { x: 50, y: 25 }, available: true },
      { id: "DK3", number: 3, name: "Coastal Family Lounge 3", seats: 4, vibe: "Deep terracotta bench booth near the seafood display", zone: "Central Deck", shape: "booth", coords: { x: 78, y: 30 }, available: true },
      { id: "DK4", number: 4, name: "Malabar Feast Table 4", seats: 6, vibe: "Long teakwood bench table ideal for traditional banana-leaf feasts", zone: "Grand Veranda", shape: "large_rect", coords: { x: 80, y: 65 }, available: true },
      { id: "DK5", number: 5, name: "Toddy Bar Counter 5", seats: 2, vibe: "Front-row high-top seats to the coastal cocktail bar", zone: "Artisanal Bar", shape: "bar", coords: { x: 30, y: 70 }, available: true }
    ],
    walkInTables: [
      { id: "W1", number: 10, seats: 2, coords: { x: 15, y: 60 }, status: "Occupied (Walk-in)" }
    ],
    menu: [
      {
        id: "dk-s1",
        name: "Mangalorean Prawns Ghee Roast",
        category: "Starters",
        price: 565,
        prepMinutes: 8,
        description: "Fresh Arabian sea prawns roasted in slow-cooked Byadgi chili paste, garlic, and generous pure country ghee.",
        dietary: ["Signature Coastal Dish", "Spicy"],
        image: "https://images.unsplash.com/photo-1559737558-245cb751f8a8?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "dk-m1",
        name: "Meen Pollichathu (Banana Leaf Pearl Spot)",
        category: "Mains",
        price: 645,
        prepMinutes: 14,
        description: "Whole fresh Karimeen fish coated in shallot-tomato masala, wrapped in charred banana leaves and griddled on cast iron.",
        dietary: ["Kerala Masterpiece", "Fresh Catch"],
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "dk-m2",
        name: "Fluffy Appam with Kuttanad Veg Stew (3 pcs)",
        category: "Mains",
        price: 345,
        prepMinutes: 7,
        description: "Lacy, fermented rice and coconut hoppers served with aromatic coconut milk vegetable stew infused with whole spices.",
        dietary: ["Vegetarian", "Gluten-Free"],
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "dk-b1",
        name: "Spiced Kokum & Sol Kadhi Cooler",
        category: "Drinks",
        price: 165,
        prepMinutes: 3,
        description: "Refreshing infusion of coastal kokum, creamy fresh coconut milk, green chili, and roasted cumin.",
        dietary: ["Refreshing Digestive"],
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "bombay-canteen",
    name: "The Bombay Social & Modern Indian",
    tagline: "Playful, progressive Indian gastronomy, nostalgic regional flavors, and innovative Indian botanicals.",
    cuisine: "Modern Regional Indian",
    neighborhood: "Bandra West, Mumbai",
    city: "Mumbai",
    address: "Linking Road, Bandra West",
    rating: 4.88,
    reviewCount: 1650,
    priceRange: "₹₹₹₹",
    busyStatus: "Heavy Standby (85m on weekends)",
    typicalWaitMinutes: 85,
    avgSpend: "₹1,350/person",
    turnoverBenchmark: "85m standard vs 40m TableRush",
    revenueLiftTonight: "₹21,000",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    tables: [
      { id: "BC1", number: 1, name: "Bandra Promenade Booth 1", seats: 2, vibe: "Warm retro art-deco booth with soft golden globe pendants", zone: "Promenade Deck", shape: "booth", coords: { x: 18, y: 22 }, available: true },
      { id: "BC2", number: 2, name: "Artisanal Bar Lounge 2", seats: 4, vibe: "Central lounge table overlooking craft spice mixology bar", zone: "Cocktail Salon", shape: "round", coords: { x: 45, y: 22 }, available: true },
      { id: "BC3", number: 3, name: "Heritage Tile Table 3", seats: 4, vibe: "Surrounded by vintage Mumbai colonial tiles and flora", zone: "Heritage Court", shape: "round", coords: { x: 74, y: 28 }, available: true },
      { id: "BC4", number: 4, name: "Canteen Grand Table 4", seats: 6, vibe: "Lush velvet banquet designed for chef tasting flights", zone: "Private Canteen", shape: "large_rect", coords: { x: 80, y: 65 }, available: true },
      { id: "BC5", number: 5, name: "Tasting Pass Counter 5", seats: 2, vibe: "High wooden stool counter right in front of Head Chef plating line", zone: "Plating Bar", shape: "bar", coords: { x: 30, y: 70 }, available: true }
    ],
    walkInTables: [
      { id: "W1", number: 10, seats: 2, coords: { x: 15, y: 60 }, status: "Occupied (Walk-in)" }
    ],
    menu: [
      {
        id: "bc-s1",
        name: "Chettinad Spiced Pulled Jackfruit Tacos",
        category: "Starters",
        price: 395,
        prepMinutes: 7,
        description: "Slow-roasted tender kathal in Chettinad stone-ground masala on mini thepla tortillas with curry leaf mayo.",
        dietary: ["Vegetarian", "Modern Twist"],
        image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "bc-m1",
        name: "Slow-Cooked Nalli Nihari with Truffle Kulcha",
        category: "Mains",
        price: 695,
        prepMinutes: 13,
        description: "12-hour braised lamb shank in rich bone-marrow gravy with julienned ginger, served with truffle butter kulcha.",
        dietary: ["Chef Masterpiece"],
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "bc-d1",
        name: "South Indian Filter Coffee Tiramisu",
        category: "Desserts",
        price: 285,
        prepMinutes: 3,
        description: "Chikmagalur dark roast decoction soaked sponge, airy mascarpone whip, cocoa dusting and salted jaggery caramel.",
        dietary: ["Signature Dessert"],
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
      }
    ]
  }
];

export const INITIAL_ORDERS = [
  {
    orderId: "TR-IND-5410",
    restaurantId: "dawat-e-khaas",
    restaurantName: "Dawat-e-Khaas",
    tableId: "T2",
    tableNumber: 2,
    tableName: "Shahi Baithak Booth 2",
    guestName: "Rahul Sharma",
    partySize: 4,
    timeSlot: "8:00 PM",
    bookingDeposit: 500, // ₹500
    status: "in_transit",
    etaMinutes: 8,
    trafficDelayed: false,
    delayMinutes: 0,
    courseStage: "starters_cooking",
    servingPreference: "starters_on_arrival",
    items: [
      { id: "dw-s1", name: "Melt-in-Mouth Galouti Kebabs", quantity: 2, price: 495, course: "Starters", status: "firing", orderedBy: "Rahul (Host)" },
      { id: "dw-m1", name: "Nawabi Murgh Dum Biryani", quantity: 2, price: 545, course: "Mains", status: "prep_queued", orderedBy: "Priya S." },
      { id: "dw-m2", name: "Dal Dawat-e-Khaas (24-Hr)", quantity: 1, price: 395, course: "Mains", status: "prep_queued", orderedBy: "Ananya K." },
      { id: "dw-m3", name: "Tandoori Garlic Naan Basket", quantity: 2, price: 195, course: "Mains", status: "prep_queued", orderedBy: "Kunal M." },
      { id: "dw-b1", name: "Kesariya Saffron Lassi", quantity: 3, price: 185, course: "Drinks", status: "ready", orderedBy: "Rahul (Host)" }
    ],
    members: [
      { id: "m1", name: "Rahul (Host)", share: 680 },
      { id: "m2", name: "Priya S.", share: 545 },
      { id: "m3", name: "Ananya K.", share: 395 },
      { id: "m4", name: "Kunal M.", share: 380 }
    ],
    notes: "Family anniversary dinner. Keep spice level medium; please serve fresh hot naans with biryani.",
    createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString()
  }
];
