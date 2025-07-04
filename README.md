# Vasse Bakery

A modern bakery website with comprehensive admin panel built with Next.js, TypeScript, and Prisma. Features a clean separation between frontend, backend, and database layers.

## 🏗️ Architecture

This project follows a clean layered architecture:

```
Vasse_Bakery/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Main frontend home page
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles
│   │   └── api/                      # Backend API routes
│   │       ├── products/
│   │       ├── categories/
│   │       ├── menu-items/
│   │       └── faqs/
│   ├── backend/                      # Backend business logic
│   │   ├── products/
│   │   │   ├── product.controller.ts # Request/response handling
│   │   │   └── product.service.ts    # Business logic
│   │   ├── categories/
│   │   ├── menu-items/
│   │   └── faqs/
│   ├── components/                   # Frontend components
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── modals/
│   │   └── ui/
│   ├── lib/                          # Utilities and database
│   │   ├── db.ts                     # Prisma database connection
│   │   ├── api.ts                    # API utilities
│   │   ├── utils.ts                  # General utilities
│   │   └── animations.ts             # Animation utilities
│   └── __tests__/                    # Comprehensive test suite
│       ├── api/                      # API endpoint tests
│       └── setup/                    # Test configuration
├── prisma/                           # Database schema
│   └── schema.prisma
└── public/                           # Static assets
```

## 🚀 Features

### Frontend
- Modern, responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Interactive product showcase with carousel
- Dynamic FAQ section with accordion
- Location and contact information
- Call-to-action sections

### Backend
- **Clean Architecture**: Separated business logic, controllers, and services
- **RESTful API**: Complete CRUD operations for all entities
- **Type Safety**: Full TypeScript implementation
- **Database**: PostgreSQL with Prisma ORM
- **Testing**: Comprehensive test suite with 100% pass rate

### Database Models
- **Products**: Bakery products with categories and menu items
- **Categories**: Product categorization system
- **Menu Items**: Individual menu offerings with pricing
- **FAQs**: Frequently asked questions
- **Admin Users**: Authentication system (ready for implementation)

## ✅ Test Results

All backend functionality is thoroughly tested and verified:

| Entity | Tests | Status | Coverage |
|--------|-------|--------|----------|
| **Products** | 12 tests | ✅ PASS | CRUD + Relationships |
| **Menu Items** | 13 tests | ✅ PASS | CRUD + Relationships |
| **FAQs** | 15 tests | ✅ PASS | CRUD + Validation |
| **Categories** | 11 tests | ✅ PASS | CRUD + Relationships |

**Total: 51 tests passing** with comprehensive coverage of:
- ✅ Create, Read, Update, Delete operations
- ✅ Relationship handling (products ↔ categories, menu items)
- ✅ Error handling and validation
- ✅ Database operations and cleanup

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Node.js, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Testing**: Jest with comprehensive test suite
- **Deployment**: Vercel (optimized)

## 📦 Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd Vasse_Bakery
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
# Configure your database URL and other variables
```

4. **Set up the database:**
```bash
npx prisma db push
```

5. **Run the development server:**
```bash
npm run dev
```

## 🧪 Testing

The project includes a comprehensive test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific entity tests
npx jest src/__tests__/api/products.test.ts
npx jest src/__tests__/api/categories.test.ts
npx jest src/__tests__/api/menu-items.test.ts
npx jest src/__tests__/api/faqs.test.ts
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run db:push:prod` - Push database schema to production
- `npm run db:push:test` - Push database schema to test database

## 🌐 URLs

- **Frontend**: `http://localhost:3000/`
- **API**: `http://localhost:3000/api/*`
- **Admin Panel**: Coming soon at `/admin`

## 🔧 Development

### Backend Architecture

The backend follows a clean separation pattern:

```typescript
// Route Handler (src/app/api/products/route.ts)
export async function GET() {
    return getAllProducts(); // Calls controller
}

// Controller (src/backend/products/product.controller.ts)
export async function getAllProducts() {
    try {
        const products = await ProductService.getAll();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

// Service (src/backend/products/product.service.ts)
export const ProductService = {
    async getAll() {
        return prisma.product.findMany({
            include: { category: true, menuItems: true },
            orderBy: { createdAt: "desc" },
        });
    },
    // ... other methods
};
```

### Adding New Features

1. **New Entity**: Create controller and service in `src/backend/[entity]/`
2. **API Routes**: Add route handlers in `src/app/api/[entity]/`
3. **Tests**: Add comprehensive tests in `src/__tests__/api/[entity].test.ts`
4. **Database**: Update schema in `prisma/schema.prisma`

### Database Changes

1. Update the Prisma schema in `prisma/schema.prisma`
2. Run `npx prisma db push` to apply changes
3. Update related services and tests
4. Run tests to ensure everything works

## 🚀 Deployment

The project is optimized for Vercel deployment:

1. Connect your repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

The single Next.js app structure ensures everything deploys together efficiently.

## 📊 Current Status

- ✅ **Backend**: Complete with 51 passing tests
- ✅ **Database**: Fully functional with all relationships
- ✅ **API**: RESTful endpoints for all entities
- 🔄 **Frontend**: Main site complete, admin panel in development
- 🔄 **Authentication**: Ready for implementation
- 🔄 **Admin Panel**: Structure ready, implementation in progress

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
