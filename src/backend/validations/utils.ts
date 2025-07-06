import { NextResponse } from 'next/server';
import { z } from 'zod';

export function validateRequest<T>(schema: z.ZodSchema<T>, data: any): { success: true; data: T } | { success: false; error: NextResponse } {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  const errors = result.error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message
  }));
  
  return {
    success: false,
    error: NextResponse.json({
      error: "Validation failed",
      details: errors
    }, { status: 400 })
  };
}

export function createValidationError(errors: z.ZodError['errors']): NextResponse {
  const formattedErrors = errors.map(err => ({
    field: err.path.join('.'),
    message: err.message
  }));
  
  return NextResponse.json({
    error: "Validation failed",
    details: formattedErrors
  }, { status: 400 });
} 