// Menu Item Database Types
export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    productId?: string;
    categoryId?: string;
    createdAt: Date;
    updatedAt: Date;
    product?: Product;
    category?: Category;
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

export interface Category {
    id: string;
    name: string;
    products?: Product[];
    menuItems?: MenuItem[];
}

// Menu Item Request Types
export interface CreateMenuItemRequest {
    name: string;
    description: string;
    price: number;
    productId?: string;
    categoryId?: string;
}

export interface UpdateMenuItemRequest extends Partial<CreateMenuItemRequest> {
    name?: string;
    description?: string;
    price?: number;
    productId?: string;
    categoryId?: string;
}

// Menu Item Response Types
export interface MenuItemResponse {
    success: boolean;
    data?: MenuItem | MenuItem[];
    error?: string;
    message?: string;
}

export interface MenuItemsListResponse {
    success: boolean;
    data: MenuItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Menu Item Service Types
export interface MenuItemServiceInterface {
    getAll(): Promise<MenuItem[]>;
    getById(id: string): Promise<MenuItem | null>;
    create(data: CreateMenuItemRequest): Promise<MenuItem>;
    update(id: string, data: UpdateMenuItemRequest): Promise<MenuItem>;
    delete(id: string): Promise<void>;
}

// Menu Item Validation Types
export interface MenuItemValidationError {
    field: string;
    message: string;
}

export interface MenuItemValidationResult {
    isValid: boolean;
    errors: MenuItemValidationError[];
}

// Menu Item API Types
export interface MenuItemApiResponse {
    success: boolean;
    data?: MenuItem | MenuItem[];
    error?: string;
    message?: string;
    status: number;
}

// Menu Item Query Types
export interface MenuItemQueryParams {
    page?: number;
    limit?: number;
    sortBy?: keyof MenuItem;
    sortOrder?: 'asc' | 'desc';
    productId?: string;
    categoryId?: string;
    search?: string;
}

// Menu Item Filter Types
export interface MenuItemFilters {
    productId?: string;
    categoryId?: string;
    priceMin?: number;
    priceMax?: number;
    createdAfter?: Date;
    createdBefore?: Date;
}

// Menu Item Statistics Types
export interface MenuItemStats {
    total: number;
    withProduct: number;
    withCategory: number;
    averagePrice?: number;
} 