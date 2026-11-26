export interface Recipe {
  id: string;
  title: string;
  category: "Recipes";
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: "Easy" | "Medium";
  featuredSeed: string;
  summary: string;
  ingredients: string[];
  steps: string[];
  nutritionCallout: string;
  image: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: "Upcoming Events";
  date: string;
  time: string;
  location: string;
  city: string;
  badge: string;
  summary: string;
  highlights: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  category: "Brand News";
  date: string;
  readTime: string;
  author: string;
  summary: string;
  content: string[];
}

export type FeedItem =
  | ({ type: "recipe" } & Recipe)
  | ({ type: "event" } & EventItem)
  | ({ type: "news" } & NewsItem);

export const RECIPES: Recipe[] = [
  {
    id: "overnight-berry-chia-pudding",
    title: "Overnight Berry Chia Seed Pudding",
    category: "Recipes",
    prepTime: "5 mins",
    cookTime: "Overnight soak",
    servings: "2 Servings",
    difficulty: "Easy",
    featuredSeed: "Chia Seeds (Raw & Natural)",
    summary:
      "A creamy, luscious, high-fibre breakfast pudding soaked overnight in plant milk and topped with fresh seasonal berries and pure raw honey.",
    ingredients: [
      "3 tablespoons Pureliva Raw Chia Seeds",
      "1 cup almond milk (or dairy milk / oat milk)",
      "1 teaspoon pure raw honey or date syrup",
      "1/2 teaspoon vanilla extract",
      "Fresh blueberries, strawberries, or pomegranate kernels",
      "1 tablespoon toasted sliced almonds for crunch",
    ],
    steps: [
      "In a mason jar or glass bowl, stir together Pureliva Chia Seeds, milk, honey, and vanilla extract.",
      "Whisk vigorously for 1 minute so the chia seeds distribute evenly without clumping.",
      "Let rest for 5 minutes, then give one final whisk before sealing tightly.",
      "Refrigerate overnight (or at least 3 hours) until thick and gelled like pudding.",
      "Top with fresh berries, sliced almonds, and a light drizzle of honey before serving chilled.",
    ],
    nutritionCallout: "Provides 12g Dietary Fibre & 8g Plant Protein per bowl.",
    image: "/images/products/chia-front.webp",
  },
  {
    id: "roasted-pumpkin-seed-salad",
    title: "Crunchy Roasted Pumpkin Seed & Green Salad",
    category: "Recipes",
    prepTime: "10 mins",
    cookTime: "Zero cook",
    servings: "2-3 Servings",
    difficulty: "Easy",
    featuredSeed: "Pumpkin Seeds (Dry Roasted & Salted)",
    summary:
      "A vibrant Mediterranean green salad tossed with crisp baby greens, crumbled feta cheese, and a generous crunch of salted roasted pumpkin seeds.",
    ingredients: [
      "4 tablespoons Pureliva Roasted & Salted Pumpkin Seeds",
      "3 cups mixed crisp salad greens (lettuce, spinach, rocket)",
      "1 cucumber, thinly sliced",
      "1/2 cup cherry tomatoes, halved",
      "50g crumbled goat cheese or fresh paneer cubes",
      "2 tablespoons extra virgin olive oil",
      "1 tablespoon fresh lemon juice",
      "Cracked black pepper to taste",
    ],
    steps: [
      "Wash and thoroughly pat dry the fresh salad greens.",
      "In a salad bowl, toss together greens, cucumber slices, and cherry tomatoes.",
      "Whisk olive oil, fresh lemon juice, and black pepper into a simple light dressing.",
      "Drizzle dressing over the greens and gently toss.",
      "Garnish top with crumbled cheese and a generous handful of crunchy Pureliva Pumpkin Seeds right before serving.",
    ],
    nutritionCallout: "Rich in zinc, magnesium, and wholesome unsaturated fats.",
    image: "/images/products/pumpkin-front.webp",
  },
  {
    id: "seedmix-energy-bites",
    title: "No-Bake 6-in-1 Seed Mix Energy Laddoos",
    category: "Recipes",
    prepTime: "15 mins",
    cookTime: "5 mins warm",
    servings: "10-12 Bites",
    difficulty: "Medium",
    featuredSeed: "Seed Mix 6-in-1 (Dry Roasted & Salted)",
    summary:
      "Wholesome, portable energy bites made by combining soft seeded dates with Pureliva 6-in-1 Seed Mix and a touch of fragrant green cardamom. Zero refined sugar.",
    ingredients: [
      "1 cup Pureliva 6-in-1 Seed Mix (Chia, Pumpkin, Sunflower, Flax, Sesame, Watermelon)",
      "1.5 cups soft Kimia / Medjool dates, pitted",
      "1 tablespoon warm pure cow ghee or virgin coconut oil",
      "1/2 teaspoon freshly ground green cardamom powder",
      "Pinch of cinnamon powder (optional)",
    ],
    steps: [
      "Add pitted dates into a food processor or mixer and pulse into a thick, sticky paste.",
      "Warm ghee in a wide non-stick pan over low heat; add the date paste and sauté for 2 minutes until soft and pliable.",
      "Add Pureliva Seed Mix and cardamom powder into the pan. Stir thoroughly until all seeds are coated evenly in the dates.",
      "Turn off flame and let cool for 5 minutes until comfortable to handle.",
      "Grease palms with a drop of ghee and roll mixture into firm 1-inch round bites. Store in an airtight jar for up to 3 weeks.",
    ],
    nutritionCallout: "Naturally sweetened energy with zero white sugar or preservatives.",
    image: "/images/products/seedmix-front.webp",
  },
  {
    id: "flaxseed-digestive-chaas",
    title: "Digestive Flaxseed Roasted Cumin Buttermilk (Chaas)",
    category: "Recipes",
    prepTime: "5 mins",
    cookTime: "Zero cook",
    servings: "2 Glasses",
    difficulty: "Easy",
    featuredSeed: "Flax Seeds (Dry Roasted & Salted)",
    summary:
      "Traditional Indian spiced buttermilk blended with freshly crushed roasted flax seeds, black salt, and fragrant mint for refreshing post-meal gut digestion.",
    ingredients: [
      "2 tablespoons Pureliva Roasted & Salted Flax Seeds, coarsely ground",
      "1.5 cups fresh whole curd / dahi",
      "1 cup chilled water",
      "1/2 teaspoon roasted cumin powder (bhuna jeera)",
      "1/4 teaspoon black salt (kala namak)",
      "Fresh mint and coriander leaves, finely chopped",
    ],
    steps: [
      "In a traditional churner or blender, blend fresh curd and chilled water until light and frothy.",
      "Add roasted cumin powder, black salt, and freshly ground Pureliva Roasted Flax Seeds.",
      "Churn for 10 seconds to combine smoothly.",
      "Pour into clay kulhads or glasses, garnish with mint and a pinch of whole roasted flax seeds on top, and serve immediately.",
    ],
    nutritionCallout: "Combines active probiotic cultures with gut-friendly prebiotic fibre and Omega-3s.",
    image: "/images/products/flax-front.webp",
  },
  {
    id: "sunflower-seed-granola",
    title: "Golden Sunflower Seed & Rolled Oat Granola",
    category: "Recipes",
    prepTime: "10 mins",
    cookTime: "20 mins bake",
    servings: "6 Servings",
    difficulty: "Medium",
    featuredSeed: "Sunflower Seeds (Dry Roasted & Salted)",
    summary:
      "Crunchy golden homemade breakfast granola baked with whole rolled oats, roasted sunflower kernels, cinnamon, and raw honey.",
    ingredients: [
      "3/4 cup Pureliva Roasted & Salted Sunflower Seeds",
      "2 cups whole rolled oats",
      "1/4 cup raw honey or pure maple syrup",
      "2 tablespoons melted coconut oil or ghee",
      "1 teaspoon ground cinnamon",
      "1/2 cup black raisins or dried cranberries",
    ],
    steps: [
      "Preheat oven to 160°C (320°F) and line a baking tray with parchment paper.",
      "In a large bowl, mix oats, honey, melted oil, and cinnamon until well coated.",
      "Spread evenly onto the baking tray and bake for 15 minutes, stirring once midway.",
      "Fold in Pureliva Sunflower Seeds and dried berries; bake for an additional 5 minutes until golden and fragrant.",
      "Let cool completely to achieve maximum crunch, then store in an airtight container.",
    ],
    nutritionCallout: "Rich in Vitamin E, plant protein, and slow-burning complex carbs.",
    image: "/images/products/sunflower-front.webp",
  },
];

export const EVENTS: EventItem[] = [
  {
    id: "national-organic-expo-2026",
    title: "National Organic & Wholesome Food Expo 2026",
    category: "Upcoming Events",
    date: "December 18–20, 2026",
    time: "10:00 AM – 7:00 PM IST",
    location: "Hall 7, Pragati Maidan Exhibition Centre",
    city: "New Delhi",
    badge: "Exhibition Stall",
    summary:
      "Visit the official Pureliva Pavilion to experience live seed tastings, learn about our Khandwa farming heritage, and sample our upcoming naturally sweet treats.",
    highlights: [
      "Live seed tasting and nutrient comparison kiosk",
      "Exclusive event-only custom seed box discounts",
      "Meet our agricultural team from Khandwa, Madhya Pradesh",
      "First public preview of Dates Delight & Nut Bites",
    ],
  },
  {
    id: "khandwa-farmer-producer-meet",
    title: "Khandwa Sustainable Agriculture & Farmer Meet",
    category: "Upcoming Events",
    date: "January 14, 2027",
    time: "9:30 AM – 3:30 PM IST",
    location: "Patidar Agro Hub, Vaikunth Nagar",
    city: "Khandwa (M.P.)",
    badge: "Community Meet",
    summary:
      "An annual gathering bringing together regional seed farmers, agricultural scientists, and sustainable growers to celebrate soil health and ethical crop procurement.",
    highlights: [
      "Non-GMO and pesticide-free cultivation practices",
      "Fair pricing agreements for upcoming seed harvest",
      "Soil enrichment techniques for chia and pumpkin crops",
    ],
  },
  {
    id: "indore-health-wellness-fair",
    title: "Central India Health & Mindful Nutrition Fair",
    category: "Upcoming Events",
    date: "February 6–8, 2027",
    time: "11:00 AM – 8:00 PM IST",
    location: "Brilliant Convention Centre, Vijay Nagar",
    city: "Indore (M.P.)",
    badge: "Consumer Expo",
    summary:
      "Interactive wellness workshops on incorporating raw and roasted seeds into modern Indian diets for diabetes management, heart health, and digestive vitality.",
    highlights: [
      "Nutritionist-led smoothie and breakfast bowl masterclass",
      "Free dietary fibre and protein consultation",
      "Direct retail ordering and spot delivery vouchers",
    ],
  },
];

export const NEWS: NewsItem[] = [
  {
    id: "pureliva-resealable-zipper-launch",
    title: "Pureliva Introduces Premium Resealable Zipper Packaging for All Seed Varieties",
    category: "Brand News",
    date: "November 2026",
    readTime: "3 min read",
    author: "Pureliva Editorial Desk",
    summary:
      "To ensure maximum crispness and barrier protection against humidity, Pureliva has officially transitioned its entire 100g product line to multi-layer airtight zipper pouches.",
    content: [
      "Freshness in natural seeds is directly tied to moisture barrier control. Traditional packaging often requires decanting into external jars, exposing fragile natural oils to oxidation.",
      "Our new 100g zipper pouches feature a puncture-resistant high-barrier foil layer with a precision seal that clicks shut easily after every spoonful, preserving crunch from day one to the last seed.",
      "All packs also feature legible back-of-pack nutritional breakdowns based on ICMR 2020 RDA guidelines for transparent consumer awareness.",
    ],
  },
  {
    id: "fssai-accreditation-milestone",
    title: "Patidar Enterprises Receives Clean Food Hygiene Certification and FSSAI License Renewal",
    category: "Brand News",
    date: "October 2026",
    readTime: "2 min read",
    author: "Quality & Compliance",
    summary:
      "Our central processing and packaging unit in Khandwa, Madhya Pradesh has successfully completed comprehensive microbiological and optical sorting audits under FSSAI license 21426950001159.",
    content: [
      "Quality assurance is never negotiable at Pureliva. Our multi-stage cleaning facility employs precision optical colour sorters to remove debris, broken fragments, and dust without using water wash chemicals.",
      "Every batch undergoes lab analysis for protein integrity, moisture percentage (maintained below 6% for roasted seeds), and absence of heavy metals.",
    ],
  },
  {
    id: "sneak-peek-healthy-sweets",
    title: "Sneak Peek: Pureliva Developing Natural Sweets & Desserts Without Refined Sugar",
    category: "Brand News",
    date: "September 2026",
    readTime: "4 min read",
    author: "Product Innovation Team",
    summary:
      "In line with our founding vision that no one should have to choose between taste and health, Pureliva is expanding beyond roasted seeds into naturally sweetened sweets and snacks.",
    content: [
      "Many modern sweets are loaded with refined white sugar, artificial colourings, and chemical stabilizers. Pureliva is formulating pure treats sweetened solely by dates, figs (anjeer), dry fruits, and raw honey.",
      "Upcoming treats will include Dates Nut Bites, Anjeer Delight, and Amaranth Nutritional Ladoos — bringing traditional Indian sweetness to modern mindful tables without compromise.",
    ],
  },
];
