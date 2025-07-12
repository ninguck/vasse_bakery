// Product Database Types
export interface Product {
    id: string;
    title: string;
    description: string;
    mainImageUrl: string;
    galleryImageUrls: string[];
    badgeText: string | null;
    badgeColor: string | null;
    badgeIcon: string | null;
    categoryId: string | null;
    createdAt: Date;
    category: CategoryBasic | null;
    menuItems: MenuItemBasic[];
}

// Basic interfaces for database queries (no circular references)
export interface CategoryBasic {
    id: string;
    name: string;
}

export interface MenuItemBasic {
    id: string;
    name: string;
    description: string;
    price: number;
    productId: string | null;
    categoryId: string | null;
}

// Full interfaces for API responses (with circular references)
export interface Category {
    id: string;
    name: string;
    products?: Product[];
    menuItems?: MenuItem[];
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    productId: string | null;
    categoryId: string | null;
    product: Product | null;
    category: Category | null;
}

// Product Request Types
export interface CreateProductRequest {
    title: string;
    description: string;
    mainImageUrl: string;
    galleryImageUrls?: string[];
    badgeText?: string;
    badgeColor?: string;
    badgeIcon?: string;
    categoryId?: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
    title?: string;
    description?: string;
    mainImageUrl?: string;
    galleryImageUrls?: string[];
    badgeText?: string;
    badgeColor?: string;
    badgeIcon?: string;
    categoryId?: string;
}

// Product Response Types
export interface ProductResponse {
    success: boolean;
    data?: Product | Product[];
    error?: string;
    message?: string;
}

export interface ProductsListResponse {
    success: boolean;
    data: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Product Service Types
export interface ProductServiceInterface {
    getAll(): Promise<Product[]>;
    getById(id: string): Promise<Product | null>;
    create(data: CreateProductRequest): Promise<Product>;
    update(id: string, data: UpdateProductRequest): Promise<Product>;
    delete(id: string): Promise<void>;
}

// Product Validation Types
export interface ProductValidationError {
    field: string;
    message: string;
}

export interface ProductValidationResult {
    isValid: boolean;
    errors: ProductValidationError[];
}

// Product API Types
export interface ProductApiResponse {
    success: boolean;
    data?: Product | Product[];
    error?: string;
    message?: string;
    status: number;
}

// Product Query Types
export interface ProductQueryParams {
    page?: number;
    limit?: number;
    sortBy?: keyof Product;
    sortOrder?: 'asc' | 'desc';
    categoryId?: string;
    search?: string;
}

// Product Filter Types
export interface ProductFilters {
    categoryId?: string;
    hasBadge?: boolean;
    createdAfter?: Date;
    createdBefore?: Date;
}

// Product Statistics Types
export interface ProductStats {
    total: number;
    withCategory: number;
    withBadge: number;
    averagePrice?: number;
}

 