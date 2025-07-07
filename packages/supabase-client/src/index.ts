import { createClient } from '@supabase/supabase-js';

declare global {
  interface ImportMeta {
    env: {
      RR_SUPABASE_URL: string;
      RR_SUPABASE_KEY: string;
    };
  }
}

export const supabaseClient = createClient(
  import.meta.env.RR_SUPABASE_URL,
  import.meta.env.RR_SUPABASE_KEY
);
