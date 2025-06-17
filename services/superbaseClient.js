import { createClient } from '@supabase/supabase-js'


// Create a single supabase client for interacting with your database

const superbaseUrl = process.env.NEXT_PUBLIC_SUPERBASE_KEY;
const superbaseAnonKey = process.env.NEXT_PUBLIC_SUPERBASE_ANON_KEY;
export const supabase = createClient(superbaseUrl, superbaseAnonKey);