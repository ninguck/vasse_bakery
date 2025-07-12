import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLIC_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const bucketName = process.env.SUPABASE_BUCKET_NAME || 'product-images'

// Check if environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Image upload functionality will be disabled.')
  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Anon Key:', supabaseAnonKey ? 'Set' : 'Not set')
} else {
  console.log('Supabase environment variables are configured')
  console.log('Supabase URL:', supabaseUrl)
  console.log('Bucket name:', bucketName)
}

// Check service role key
if (!supabaseServiceKey) {
  console.warn('Supabase service role key not set. Uploads will fail.')
} else {
  console.log('Supabase service role key is configured')
}

// Create Supabase client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Create admin client with service role key for uploads
export const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export interface UploadResult {
  url: string
  path: string
  error?: string
}

export const uploadImage = async (file: File, folder: string = 'products'): Promise<UploadResult> => {
  try {
    console.log('Starting upload for file:', file.name)
    
    const formData = new FormData()
    formData.append('file', file)
    
    console.log('Uploading via API endpoint...')
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Upload API error:', errorData)
      return { url: '', path: '', error: errorData.error || 'Upload failed' }
    }

    const result = await response.json()
    console.log('Upload successful:', result)

    return {
      url: result.url,
      path: result.path
    }
  } catch (error) {
    console.error('Upload failed with exception:', error)
    return { url: '', path: '', error: error instanceof Error ? error.message : 'Upload failed' }
  }
}

export const deleteImage = async (path: string): Promise<boolean> => {
  if (!supabase) {
    console.error('Supabase not configured')
    return false
  }

  try {
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([path])

    if (error) {
      console.error('Delete error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete failed:', error)
    return false
  }
}

export const getImageUrl = (path: string): string => {
  if (!supabase) {
    return ''
  }

  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(path)
  
  return data.publicUrl
}

// Test function to check Supabase connection and bucket access
export const testSupabaseConnection = async (): Promise<{ success: boolean; error?: string }> => {
  if (!supabase) {
    return { success: false, error: 'Supabase not configured' }
  }

  try {
    // Test bucket access by listing files (empty list is fine)
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list('', { limit: 1 })

    if (error) {
      console.error('Bucket access test failed:', error)
      return { success: false, error: error.message }
    }

    console.log('Supabase connection test successful')
    return { success: true }
  } catch (error) {
    console.error('Supabase connection test failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Connection failed' }
  }
} 