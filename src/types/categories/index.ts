// Category Database Types
export interface Category {
    id: string;
    name: string;
    products?: Product[];
    menuItems?: MenuItem[];
}

export interface Product {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    badgeText?: string;
    badgeColor?: string;
    badgeIcon?: string;
    categoryId?: string;
    createdAt: Date;
    updatedAt: Date;
    category?: Category;
    menuItems?: MenuItem[];
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    productId?: string;
    categoryId?: string;
    product?: Product;
    category?: Category;
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