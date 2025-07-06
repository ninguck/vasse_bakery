// Category Database Types
export interface Category {
    id: string;
    name: string;
    products: ProductBasic[];
    menuItems: MenuItemBasic[];
}

// Basic interfaces for database queries (no circular references)
export interface ProductBasic {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    badgeText: string | null;
    badgeColor: string | null;
    badgeIcon: string | null;
    categoryId: string | null;
    createdAt: Date;
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
export interface Product {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    badgeText: string | null;
    badgeColor: string | null;
    badgeIcon: string | null;
    categoryId: string | null;
    createdAt: Date;
    category: Category | null;
    menuItems: MenuItem[];
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

// Category Request Types
export interface CreateCategoryRequest {
    name: string;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
    name?: string;
}

// Category Response Types
export interface CategoryResponse {
    success: boolean;
    data?: Category | Category[];
    error?: string;
    message?: string;
}

export interface CategoriesListResponse {
    success: boolean;
    data: Category[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Category Service Types
export interface CategoryServiceInterface {
    getAll(): Promise<Category[]>;
    getById(id: string): Promise<Category | null>;
    create(name: string): Promise<Category>;
    update(id: string, name: string): Promise<Category>;
    delete(id: string): Promise<void>;
    findByName(name: string): Promise<Category | null>;
    findDuplicateByName(name: string, excludeId: string): Promise<Category | null>;
}

// Category Validation Types
export interface CategoryValidationError {
    field: string;
    message: string;
}

export interface CategoryValidationResult {
    isValid: boolean;
    errors: CategoryValidationError[];
}

// Category API Types
export interface CategoryApiResponse {
    success: boolean;
    data?: Category | Category[];
    error?: string;
    message?: string;
    status: number;
}

// Category Query Types
export interface CategoryQueryParams {
    page?: number;
    limit?: number;
    sortBy?: keyof Category;
    sortOrder?: 'asc' | 'desc';
    search?: string;
}

// Category Filter Types
export interface CategoryFilters {
    search?: string;
    hasProducts?: boolean;
    hasMenuItems?: boolean;
}

// Category Statistics Types
export interface CategoryStats {
    total: number;
    withProducts: number;
    withMenuItems: number;
    averageProductsPerCategory: number;
    averageMenuItemsPerCategory: number;
} 