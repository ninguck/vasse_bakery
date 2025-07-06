// FAQ Database Types
export interface FAQ {
    id: string;
    question: string;
    answer: string;
    createdAt: Date;
    updatedAt: Date;
}

// FAQ Request Types
export interface CreateFAQRequest {
    question: string;
    answer: string;
}

export interface UpdateFAQRequest extends Partial<CreateFAQRequest> {
    question?: string;
    answer?: string;
}

// FAQ Response Types
export interface FAQResponse {
    success: boolean;
    data?: FAQ | FAQ[];
    error?: string;
    message?: string;
}

export interface FAQsListResponse {
    success: boolean;
    data: FAQ[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// FAQ Service Types
export interface FAQServiceInterface {
    getAll(): Promise<FAQ[]>;
    getById(id: string): Promise<FAQ | null>;
    create(data: CreateFAQRequest): Promise<FAQ>;
    update(id: string, data: UpdateFAQRequest): Promise<FAQ>;
    delete(id: string): Promise<void>;
}

// FAQ Validation Types
export interface FAQValidationError {
    field: string;
    message: string;
}

export interface FAQValidationResult {
    isValid: boolean;
    errors: FAQValidationError[];
}

// FAQ API Types
export interface FAQApiResponse {
    success: boolean;
    data?: FAQ | FAQ[];
    error?: string;
    message?: string;
    status: number;
}

// FAQ Query Types
export interface FAQQueryParams {
    page?: number;
    limit?: number;
    sortBy?: keyof FAQ;
    sortOrder?: 'asc' | 'desc';
    search?: string;
}

// FAQ Filter Types
export interface FAQFilters {
    search?: string;
    createdAfter?: Date;
    createdBefore?: Date;
}

// FAQ Statistics Types
export interface FAQStats {
    total: number;
    averageQuestionLength: number;
    averageAnswerLength: number;
    recentFAQs: number;
} 