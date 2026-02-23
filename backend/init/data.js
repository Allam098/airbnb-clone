const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60" },
    price: 1500,
    location: "Malibu",
    country: "United States",
    category: "Trending"
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60" },
    price: 1200,
    location: "New York City",
    country: "United States",
    category: "Top Rated"
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60" },
    price: 1000,
    location: "Aspen",
    country: "United States",
    category: "Mountain"
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60" },
    price: 2500,
    location: "Florence",
    country: "Italy",
    category: "Luxury"
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60" },
    price: 800,
    location: "Portland",
    country: "United States",
    category: "Nature"
  },
  {
    title: "Beachfront Paradise",
    description: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60" },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    category: "Trending"
  },
  {
    title: "Rustic Cabin by the Lake",
    description: "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60" },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    category: "Nature"
  },
  {
    title: "Luxury Penthouse with City Views",
    description: "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60" },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    category: "Top Rated"
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description: "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=60" },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    category: "Mountain"
  },
  {
    title: "Safari Lodge in the Serengeti",
    description: "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60" },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    category: "Nature"
  },
  {
    title: "Historic Canal House",
    description: "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=60" },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    category: "City"
  },
  {
    title: "Private Island Retreat",
    description: "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?auto=format&fit=crop&w=800&q=60" },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    category: "Luxury"
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description: "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?auto=format&fit=crop&w=800&q=60" },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
    category: "Nature"
  },
  {
    title: "Historic Brownstone in Boston",
    description: "Step back in time in this elegant historic brownstone located in the heart of Boston.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?auto=format&fit=crop&w=800&q=60" },
    price: 2200,
    location: "Boston",
    country: "United States",
    category: "City"
  },
  {
    title: "Beachfront Bungalow in Bali",
    description: "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1602391833977-358a52198938?auto=format&fit=crop&w=800&q=60" },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    category: "Top Rated"
  },
  {
    title: "Mountain View Cabin in Banff",
    description: "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=800&q=60" },
    price: 1500,
    location: "Banff",
    country: "Canada",
    category: "Mountain"
  },
  {
    title: "Tropical Villa in Phuket",
    description: "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?auto=format&fit=crop&w=800&q=60" },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
    category: "Beach"
  },
  {
    title: "Historic Castle in Scotland",
    description: "Live like royalty in this historic castle in the Scottish Highlands.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=800&q=60" },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
    category: "Luxury"
  },
  {
    title: "Desert Oasis in Dubai",
    description: "Experience luxury in the middle of the desert in this opulent oasis in Dubai.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60" },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "Luxury"
  },
  {
    title: "Santorini Cliffside Villa",
    description: "Wake up to stunning caldera views in this iconic white-washed villa perched on the cliffs of Santorini.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=60" },
    price: 3500,
    location: "Santorini",
    country: "Greece",
    category: "Trending"
  },
  {
    title: "Tokyo Modern Apartment",
    description: "Experience the vibrant energy of Tokyo from this sleek, modern apartment in Shibuya district.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=60" },
    price: 1400,
    location: "Tokyo",
    country: "Japan",
    category: "New"
  },
  {
    title: "Patagonia Wilderness Lodge",
    description: "Immerse yourself in the raw beauty of Patagonia with glacier views and hiking trails at your doorstep.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60" },
    price: 2200,
    location: "El Calafate",
    country: "Argentina",
    category: "Mountain"
  },
  {
    title: "Maldives Overwater Bungalow",
    description: "Float above crystal-clear turquoise waters in this luxurious overwater bungalow with direct ocean access.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=60" },
    price: 6000,
    location: "Malé",
    country: "Maldives",
    category: "Top Rated"
  },
  {
    title: "Parisian Apartment with Eiffel View",
    description: "Live the Parisian dream in this elegant apartment with stunning views of the Eiffel Tower.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=60" },
    price: 2800,
    location: "Paris",
    country: "France",
    category: "Trending"
  },
  {
    title: "Norwegian Fjord Cabin",
    description: "Experience the magic of Norway's fjords from this cozy cabin with panoramic mountain and water views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60" },
    price: 1700,
    location: "Bergen",
    country: "Norway",
    category: "Nature"
  },
  {
    title: "Moroccan Riad in Marrakech",
    description: "Step into an Arabian Nights fantasy in this beautifully restored traditional riad with a central courtyard.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=800&q=60" },
    price: 1300,
    location: "Marrakech",
    country: "Morocco",
    category: "New"
  },
  {
    title: "New Zealand Lake House",
    description: "Surrounded by snow-capped mountains and pristine lakes, this modern house is a nature lover's dream.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60" },
    price: 1900,
    location: "Queenstown",
    country: "New Zealand",
    category: "Nature"
  },
  {
    title: "Barcelona Beach Loft",
    description: "Enjoy Mediterranean vibes in this stylish loft just steps from Barcelona's famous beaches.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?auto=format&fit=crop&w=800&q=60" },
    price: 1600,
    location: "Barcelona",
    country: "Spain",
    category: "Beach"
  },
  {
    title: "Iceland Northern Lights Retreat",
    description: "Chase the Northern Lights from this remote glass-roofed cabin in the Icelandic wilderness.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=800&q=60" },
    price: 2500,
    location: "Reykjavik",
    country: "Iceland",
    category: "Top Rated"
  },
  {
    title: "Singapore Sky Garden Penthouse",
    description: "Live in the clouds in this ultra-modern penthouse with a private rooftop garden and infinity pool.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800&q=60" },
    price: 4500,
    location: "Singapore",
    country: "Singapore",
    category: "Luxury"
  },
  {
    title: "Costa Rica Jungle Treehouse",
    description: "Sleep in the rainforest canopy in this eco-friendly treehouse surrounded by exotic wildlife.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=60" },
    price: 1100,
    location: "Manuel Antonio",
    country: "Costa Rica",
    category: "New"
  },
  {
    title: "Sydney Harbour View Apartment",
    description: "Wake up to views of the Sydney Opera House and Harbour Bridge from this premium waterfront apartment.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=60" },
    price: 3200,
    location: "Sydney",
    country: "Australia",
    category: "City"
  },
  {
    title: "Swiss Alpine Chalet",
    description: "Experience authentic Swiss mountain living in this charming wooden chalet with stunning Alpine views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60" },
    price: 2600,
    location: "Zermatt",
    country: "Switzerland",
    category: "Mountain"
  },
  {
    title: "Tuscan Countryside Villa",
    description: "Immerse yourself in the beauty of rural Tuscany. This traditional stone villa offers peace, vineyards, and authentic Italian charm.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=60" },
    price: 2200,
    location: "Siena",
    country: "Italy",
    category: "Countryside"
  },
  {
    title: "French Countryside Farmhouse",
    description: "Escape to the rolling hills of Provence in this beautifully restored farmhouse surrounded by lavender fields.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=800&q=60" },
    price: 1900,
    location: "Provence",
    country: "France",
    category: "Countryside"
  },
  {
    title: "English Countryside Cottage",
    description: "Charming thatched-roof cottage in the heart of the Cotswolds. Perfect for a peaceful countryside retreat.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=60" },
    price: 1600,
    location: "Cotswolds",
    country: "United Kingdom",
    category: "Countryside"
  },
  {
    title: "Spanish Countryside Estate",
    description: "Luxurious estate in rural Andalusia with olive groves, mountain views, and traditional Spanish architecture.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60" },
    price: 2400,
    location: "Andalusia",
    country: "Spain",
    category: "Countryside"
  },
  {
    title: "Bali Infinity Pool Villa",
    description: "Stunning modern villa with private infinity pool overlooking rice terraces. Ultimate tropical luxury.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=60" },
    price: 2800,
    location: "Ubud",
    country: "Indonesia",
    category: "Pool"
  },
  {
    title: "Greek Island Pool House",
    description: "Whitewashed villa with spectacular pool and panoramic Aegean Sea views. Pure Mediterranean bliss.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=60" },
    price: 3200,
    location: "Santorini",
    country: "Greece",
    category: "Pool"
  },
  {
    title: "Miami Modern Pool Mansion",
    description: "Contemporary luxury mansion with resort-style pool, spa, and entertainment area. Perfect for groups.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=60" },
    price: 4500,
    location: "Miami",
    country: "United States",
    category: "Pool"
  },
  {
    title: "Desert Oasis Pool Villa",
    description: "Private desert retreat with stunning pool oasis. Modern architecture meets natural beauty in Palm Springs.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=60" },
    price: 3500,
    location: "Palm Springs",
    country: "United States",
    category: "Pool"
  },
  {
    title: "Rainforest Eco Lodge",
    description: "Sustainable eco-lodge deep in the Costa Rican rainforest. Wake up to howler monkeys and exotic birds.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=60" },
    price: 1400,
    location: "Monteverde",
    country: "Costa Rica",
    category: "Nature"
  },
  {
    title: "Norwegian Fjord Cabin",
    description: "Remote cabin on the edge of a pristine fjord. Experience Norway's dramatic natural beauty in solitude.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60" },
    price: 1800,
    location: "Bergen",
    country: "Norway",
    category: "Nature"
  },
  {
    title: "Amazon Jungle Retreat",
    description: "Immersive jungle experience in the heart of the Amazon. Guided nature tours and wildlife spotting included.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=60" },
    price: 1100,
    location: "Manaus",
    country: "Brazil",
    category: "Nature"
  },
  {
    title: "New Zealand Nature Lodge",
    description: "Eco-friendly lodge surrounded by native bush and mountain streams. Perfect base for hiking and nature photography.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60" },
    price: 1600,
    location: "Queenstown",
    country: "New Zealand",
    category: "Nature"
  },
  {
    title: "Canadian Wilderness Cabin",
    description: "Off-grid log cabin in the Canadian Rockies. Experience true wilderness with modern comforts.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60" },
    price: 1300,
    location: "Banff",
    country: "Canada",
    category: "Nature"
  }
];

module.exports = { data: sampleListings };
