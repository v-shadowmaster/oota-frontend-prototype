export const recommenedListData = [
  {
    id: 1,
    name: 'Burger King',
    imageUrl: require('@assets/tabicons/burger.jpg'),
    time: '30-35 min',
    distance: '1.2 km',
    discount: '40% OFF',
    discountAmount: 'UPTO ₹80',
    rating: 4.2,
    cuisine: 'American, Fast Food',
    isBookmarked: false,
  },
  {
    id: 2,
    name: 'Paradise Paratha',
    imageUrl: require('@assets/tabicons/paratha.jpg'),
    time: '25-30 min',
    distance: '0.8 km',
    discount: '50% OFF',
    discountAmount: 'UPTO ₹100',
    rating: 4.5,
    cuisine: 'North Indian',
    isBookmarked: true,
  },
  {
    id: 3,
    name: 'Pizza Hut',
    imageUrl: require('@assets/tabicons/pizza.jpg'),
    time: '35-40 min',
    distance: '2.1 km',
    discount: '30% OFF',
    discountAmount: 'UPTO ₹120',
    rating: 4.0,
    cuisine: 'Italian, Fast Food',
    isBookmarked: false,
  },
  {
    id: 4,
    name: 'South Indian Delight',
    imageUrl: require('@assets/tabicons/rice_curry.jpg'),
    time: '20-25 min',
    distance: '1.5 km',
    discount: '25% OFF',
    discountAmount: 'UPTO ₹75',
    rating: 4.3,
    cuisine: 'South Indian',
    isBookmarked: false,
  },
  {
    id: 5,
    name: 'Fresh & Healthy',
    imageUrl: require('@assets/tabicons/salad.jpeg'),
    time: '15-20 min',
    distance: '0.5 km',
    discount: '20% OFF',
    discountAmount: 'UPTO ₹60',
    rating: 4.6,
    cuisine: 'Healthy Food, Salads',
    isBookmarked: true,
  },
  {
    id: 6,
    name: 'Samosa Corner',
    imageUrl: require('@assets/tabicons/samosa.jpg'),
    time: '15-20 min',
    distance: '0.3 km',
    discount: '35% OFF',
    discountAmount: 'UPTO ₹50',
    rating: 4.4,
    cuisine: 'Street Food, Snacks',
    isBookmarked: false,
  },
];

export const regularFoodData = [
  {
    id: 1,
    name: 'Biryani',
    imageUrl: require('@assets/images/regular-food/biryani.jpg'),
  },
  {
    id: 2,
    name: 'Burger',
    imageUrl: require('@assets/images/regular-food/burger.jpg'),
  },
  {
    id: 3,
    name: 'Cake',
    imageUrl: require('@assets/images/regular-food/cake.jpeg'),
  },
  {
    id: 4,
    name: 'Chicken',
    imageUrl: require('@assets/images/regular-food/chicken.jpg'),
  },
  {
    id: 5,
    name: 'Dosa',
    imageUrl: require('@assets/images/regular-food/dosa.jpg'),
  },
  {
    id: 6,
    name: 'Momos',
    imageUrl: require('@assets/images/regular-food/momos.jpg'),
  },
  {
    id: 7,
    name: 'North Indian',
    imageUrl: require('@assets/images/regular-food/north_indian.jpg'),
  },
  {
    id: 8,
    name: 'Paneer',
    imageUrl: require('@assets/images/regular-food/paneer.jpg'),
  },
  {
    id: 9,
    name: 'Pizza',
    imageUrl: require('@assets/images/regular-food/pizza.jpg'),
  },
  {
    id: 10,
    name: 'Rolls',
    imageUrl: require('@assets/images/regular-food/rolls.jpg'),
  },

  {
    id: 11,
    name: 'Thali',
    imageUrl: require('@assets/images/regular-food/thali.jpg'),
  },
];

export const filtersOption = [
  'Nearest',
  'Great Offers',
  'Rating 4.0',
  'Pure Veg',
  'Price',
];

export const restaurantFilterOptions = [
  'veg',
  'non-veg',
  'rating',
  'Bestseller',
  'spicy',
  'hot',
];

export const restaurantItemData = [
  {
    id: '1',
    name: 'Thali',
    imageUrl: require('@assets/images/regular-food/thali.jpg'),
    price: 120,
    description: 'A traditional Indian meal with rice, dal, and vegetables.',
    isVeg: true,
    isCustomizable: false,
    quantity: 3,
    customization: [],
  },
  {
    id: '2',
    name: 'Paneer Butter Masala',
    imageUrl: require('@assets/images/regular-food/paneer.jpg'),
    price: 180,
    description: 'Creamy paneer in a rich tomato and butter gravy.',
    isVeg: true,
    isCustomizable: false,
    quantity: 3,
    customization: [],
  },
  {
    id: '3',
    name: 'Chicken Biryani',
    imageUrl: require('@assets/images/regular-food/biryani.jpg'),
    price: 220,
    description: 'Spiced basmati rice with tender chicken pieces.',
    isVeg: false,
    isCustomizable: false,
    quantity: 3,
    customization: [],
  },
  {
    id: '4',
    name: 'Custom Burger',
    imageUrl: require('@assets/images/regular-food/burger.jpg'),
    price: 150,
    description: 'Burger with customizable toppings and sauces.',
    isVeg: false,
    isCustomizable: true,
    quantity: 3,
    customization: [
      {
        id: 'c1',
        quantity: 1,
        price: 20,
        customizationOptions: [
          {type: 'Cheese', selectedOption: 'Extra Cheese'},
          {type: 'Sauce', selectedOption: 'Spicy Mayo'},
        ],
      },
      {
        id: 'c2',
        quantity: 1,
        price: 30,
        customizationOptions: [{type: 'Bun', selectedOption: 'Whole Grain'}],
      },
    ],
  },
  {
    id: '5',
    name: 'Veg Pizza',
    imageUrl: require('@assets/images/regular-food/pizza.jpg'),
    price: 200,
    description: 'Pizza topped with fresh bell peppers, olives, and tomatoes.',
    isVeg: true,
    isCustomizable: false,
    quantity: 3,
    customization: [],
  },
  {
    id: '6',
    name: 'Custom Pasta',
    imageUrl: require('@assets/images/regular-food/pasta.jpg'),
    price: 190,
    description: 'Pasta with a choice of sauces and extra toppings.',
    isVeg: true,
    isCustomizable: true,
    quantity: 3,
    customization: [
      {
        id: 'c3',
        quantity: 1,
        price: 15,
        customizationOptions: [
          {type: 'Sauce', selectedOption: 'Pesto'},
          {type: 'Cheese', selectedOption: 'Parmesan'},
        ],
      },
    ],
  },
  {
    id: '7',
    name: 'Momos',
    imageUrl: require('@assets/images/regular-food/momos.jpg'),
    price: 80,
    description: 'Steamed dumplings served with tangy sauce.',
    isVeg: true,
    isCustomizable: false,
    quantity: 3,
    customization: [],
  },
  {
    id: '8',
    name: 'Custom Sandwich',
    imageUrl: require('@assets/images/regular-food/sandwich.jpg'),
    price: 90,
    description: 'Sandwich with customizable fillings and spreads.',
    isVeg: true,
    isCustomizable: true,
    quantity: 3,
    customization: [
      {
        id: 'c4',
        quantity: 1,
        price: 10,
        customizationOptions: [
          {type: 'Bread', selectedOption: 'Multigrain'},
          {type: 'Filling', selectedOption: 'Extra Veggies'},
        ],
      },
    ],
  },
  {
    id: '9',
    name: 'Samosa',
    imageUrl: require('@assets/images/regular-food/samosa.jpg'),
    price: 40,
    description: 'Crispy pastry with a spiced potato filling.',
    isVeg: true,
    isCustomizable: false,
    quantity: 3,
    customization: [],
  },
  {
    id: '10',
    name: 'Custom Salad',
    imageUrl: require('@assets/images/regular-food/salad.jpg'),
    price: 130,
    description: 'Fresh salad with options for dressings and toppings.',
    isVeg: true,
    isCustomizable: true,
    quantity: 3,
    customization: [
      {
        id: 'c5',
        quantity: 1,
        price: 25,
        customizationOptions: [
          {type: 'Dressing', selectedOption: 'Olive Oil'},
          {type: 'Toppings', selectedOption: 'Nuts'},
        ],
      },
    ],
  },
  {
    id: '11',
    name: 'Fish Curry',
    imageUrl: require('@assets/images/regular-food/fish.jpg'),
    price: 240,
    description: 'A spicy and tangy fish curry.',
    isVeg: false,
    isCustomizable: false,
    quantity: 3,
    customization: [],
  },
  {
    id: '12',
    name: 'Custom Wrap',
    imageUrl: require('@assets/images/regular-food/wrap.jpg'),
    price: 110,
    description: 'Wrap with customizable fillings and sauces.',
    isVeg: true,
    isCustomizable: true,
    quantity: 3,
    customization: [
      {
        id: 'c6',
        quantity: 1,
        price: 20,
        customizationOptions: [
          {type: 'Wrap Type', selectedOption: 'Whole Wheat'},
          {type: 'Sauce', selectedOption: 'Garlic Mayo'},
        ],
      },
    ],
  },
  {
    id: '13',
    name: 'Dosa',
    imageUrl: require('@assets/images/regular-food/dosa.jpg'),
    price: 100,
    description: 'Crispy South Indian crepe served with chutney.',
    isVeg: true,
    isCustomizable: false,
    quantity: 3,
    customization: [],
  },
  {
    id: '14',
    name: 'Custom Noodles',
    imageUrl: require('@assets/images/regular-food/noodles.jpg'),
    price: 160,
    description: 'Noodles with choice of protein and spice level.',
    isVeg: false,
    isCustomizable: true,
    quantity: 3,
    customization: [
      {
        id: 'c7',
        quantity: 1,
        price: 20,
        customizationOptions: [
          {type: 'Protein', selectedOption: 'Chicken'},
          {type: 'Spice Level', selectedOption: 'Medium'},
        ],
      },
    ],
  },
  {
    id: '15',
    name: 'Ice Cream',
    imageUrl: require('@assets/images/regular-food/icecream.jpg'),
    price: 60,
    description: 'Classic vanilla ice cream scoop.',
    isVeg: true,
    isCustomizable: false,
    quantity: 3,
    customization: [],
  },
];
