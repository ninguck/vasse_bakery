// Test fixtures with sample data
export const fixtures = {
  // Sample product data
  products: {
    valid: {
      title: 'Chocolate Cake',
      description: 'Delicious chocolate cake with rich frosting',
      mainImageUrl: 'https://example.com/chocolate-cake.jpg',
    },
    invalid: {
      title: '', // Missing required field
      description: 'Invalid product',
    },
    update: {
      title: 'Updated Chocolate Cake',
      description: 'Updated description',
      mainImageUrl: 'https://example.com/updated-cake.jpg',
    },
  },

  // Sample category data
  categories: {
    valid: {
      name: 'Cakes',
    },
    invalid: {
      name: '', // Missing required field
    },
    update: {
      name: 'Updated Cakes',
    },
  },

  // Sample menu item data
  menuItems: {
    valid: {
      name: 'Chocolate Cake Slice',
      description: 'A slice of our famous chocolate cake',
      price: 5.99,
    },
    invalid: {
      name: '', // Missing required field
      price: -1, // Invalid price
    },
    update: {
      name: 'Updated Chocolate Cake Slice',
      description: 'Updated description',
      price: 6.99,
    },
  },

  // Sample FAQ data
  faqs: {
    valid: {
      question: 'What are your opening hours?',
      answer: 'We are open Monday to Friday, 8 AM to 6 PM.',
    },
    invalid: {
      question: '', // Missing required field
      answer: 'Invalid FAQ',
    },
    update: {
      question: 'Updated: What are your opening hours?',
      answer: 'Updated: We are open Monday to Friday, 8 AM to 6 PM.',
    },
  },

  // Multiple test data for bulk operations
  multiple: {
    products: [
      {
        title: 'Vanilla Cake',
        description: 'Classic vanilla cake',
        mainImageUrl: 'https://example.com/vanilla-cake.jpg',
      },
      {
        title: 'Strawberry Cake',
        description: 'Fresh strawberry cake',
        mainImageUrl: 'https://example.com/strawberry-cake.jpg',
      },
      {
        title: 'Carrot Cake',
        description: 'Healthy carrot cake',
        mainImageUrl: 'https://example.com/carrot-cake.jpg',
      },
    ],
    categories: [
      { name: 'Cakes' },
      { name: 'Breads' },
      { name: 'Pastries' },
    ],
    menuItems: [
      {
        name: 'Vanilla Cake Slice',
        description: 'A slice of vanilla cake',
        price: 4.99,
      },
      {
        name: 'Strawberry Cake Slice',
        description: 'A slice of strawberry cake',
        price: 5.99,
      },
      {
        name: 'Carrot Cake Slice',
        description: 'A slice of carrot cake',
        price: 4.49,
      },
    ],
    faqs: [
      {
        question: 'Do you offer gluten-free options?',
        answer: 'Yes, we have several gluten-free options available.',
      },
      {
        question: 'Can I place a custom order?',
        answer: 'Yes, custom orders can be placed with 48 hours notice.',
      },
      {
        question: 'Do you deliver?',
        answer: 'We offer delivery within a 10-mile radius.',
      },
    ],
  },
} 